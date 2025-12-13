import importlib


def load_module():
    # Import the packaged module directly
    return importlib.import_module('refurrm.pricing_engine')


def test_find_best_match_exact():
    mod = load_module()
    assert mod._find_best_match('Vintage iPod Classic (5th Gen)') == 'Vintage iPod Classic (5th Gen)'


def test_find_best_match_normalized():
    mod = load_module()
    assert mod._find_best_match('vintage ipod classic') == 'Vintage iPod Classic (5th Gen)'


def test_find_best_match_substring():
    mod = load_module()
    assert mod._find_best_match('KitchenAid mixer') == 'KitchenAid Stand Mixer (Used)'


def test_get_realistic_selling_price_found():
    mod = load_module()
    res = mod.get_realistic_selling_price('vintage ipod classic')
    assert res is not None
    assert res['item_name'] == 'Vintage iPod Classic (5th Gen)'
    assert res['min_price'] == round(95.00 * 0.75, 2)


def test_get_realistic_selling_price_not_found():
    mod = load_module()
    assert mod.get_realistic_selling_price('Unknown Gadget 123') is None


def test_find_best_match_typo():
    """Small-typo should still resolve via fuzzy matching."""
    mod = load_module()
    # deliberate small typo: 'classic' -> 'clasik'
    assert mod._find_best_match('Vintage iPod Clasik') == 'Vintage iPod Classic (5th Gen)'


def test_find_best_match_punctuation():
    """Punctuation and extra characters should be tolerated."""
    mod = load_module()
    assert mod._find_best_match('Vintage iPod! Classic (5th Gen)') == 'Vintage iPod Classic (5th Gen)'


def test_find_best_match_whitespace():
    """Leading/trailing whitespace and casing should not affect matching."""
    mod = load_module()
    assert mod._find_best_match('  VINTAGE iPod Classic  ') == 'Vintage iPod Classic (5th Gen)'


def test_find_best_match_performance():
    """Simple performance smoke-test: ensure matching runs quickly under load."""
    import time
    mod = load_module()
    queries = [
        'vintage ipod classic',
        'Vintage iPod Clasik',
        'KitchenAid mixer',
        'Old T-Shirt (Generic)',
        'Unknown Gadget 123',
    ]
    iterations = 2000
    start = time.perf_counter()
    for i in range(iterations):
        q = queries[i % len(queries)]
        _ = mod._find_best_match(q)
    total = time.perf_counter() - start
    # Expect it to complete quickly; allow a generous bound for CI/dev machines
    assert total < 1.0, f"Performance regression: {_:.3f}s for {iterations} calls"


if __name__ == '__main__':
    # Simple runner so tests can be executed without pytest installed.
    for fn in [
        test_find_best_match_exact,
        test_find_best_match_normalized,
        test_find_best_match_substring,
        test_get_realistic_selling_price_found,
        test_get_realistic_selling_price_not_found,
        # edge-case tests
        test_find_best_match_typo,
        test_find_best_match_punctuation,
        test_find_best_match_whitespace,
        test_find_best_match_performance,
    ]:
        print(f'Running {fn.__name__}...')
        fn()
    print('All tests passed')


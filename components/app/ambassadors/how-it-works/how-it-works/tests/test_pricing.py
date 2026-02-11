import importlib.util
import os

MODULE_PATH = os.path.expanduser('/Users/momsmacbook/ReFurrm_App')

def load_module():
    spec = importlib.util.spec_from_file_location('refurrm', MODULE_PATH)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


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

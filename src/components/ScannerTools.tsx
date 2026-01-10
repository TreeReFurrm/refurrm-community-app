import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Camera, Package, TrendingUp, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription } from './ui/alert';

interface EbayResult {
  item: string;
  avgPrice?: number;
  minPrice?: number;
  maxPrice?: number;
  sampleSize?: number;
  error?: string;
}

const ScannerTools = () => {
  const { currentUser } = useAppContext();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const isPro = currentUser?.subscription === 'pro';


  const handleScan = async (type: 'unit' | 'item') => {
    if (!isPro) return;
    
    setScanning(true);
    setError(null);
    setResult(null);

    try {
      // Simulate image upload/analysis - in production, this would use AI vision
      const mockItems = type === 'unit' 
        ? ['vintage furniture', 'electronics lot', 'tools set', 'home decor']
        : ['vintage radio'];

      const { data, error: functionError } = await supabase.functions.invoke('ebay-market-lookup', {
        body: { 
          items: mockItems,
          userId: currentUser?.id || 'anonymous'
        }
      });

      if (functionError) throw functionError;

      const results: EbayResult[] = data.results;
      const validResults = results.filter(r => !r.error && r.avgPrice);
      
      if (validResults.length === 0) {
        throw new Error('No market data found for scanned items');
      }

      const totalValue = validResults.reduce((sum, r) => sum + (r.avgPrice || 0), 0);
      const avgConfidence = validResults.length > 0 ? 85 : 0;

      setResult({
        type,
        estimatedValue: Math.round(totalValue),
        minValue: Math.round(Math.min(...validResults.map(r => r.minPrice || 0))),
        maxValue: Math.round(Math.max(...validResults.map(r => r.maxPrice || 0))),
        confidence: avgConfidence,
        itemsAnalyzed: validResults.length,
        comparables: validResults.map(r => ({
          item: r.item,
          avgPrice: r.avgPrice,
          range: `$${r.minPrice} - $${r.maxPrice}`,
          sampleSize: r.sampleSize
        }))
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch market data. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  return (
    <section className="py-20 bg-white" id="scanner">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1C2E25] mb-4">AI Scanner Tools</h2>
          <p className="text-lg text-[#315E47]">Real-time market value powered by eBay data</p>
          {!isPro && (
            <Badge className="mt-4 bg-[#50E3E3] text-white">Pro Feature - Subscribe to Unlock</Badge>
          )}
        </div>

        {error && (
          <Alert className="mb-6 max-w-2xl mx-auto border-red-500">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className={!isPro ? 'opacity-50' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-6 h-6 text-[#315E47]" />
                Unit Scanner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Upload photos of entire storage units for estimated value</p>
              <Button onClick={() => handleScan('unit')} disabled={!isPro || scanning} className="w-full">
                {scanning ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing...</> :
                 isPro ? <><Camera className="w-4 h-4 mr-2" />Scan Unit</> : 
                 <><Lock className="w-4 h-4 mr-2" />Locked</>}
              </Button>
            </CardContent>
          </Card>

          <Card className={!isPro ? 'opacity-50' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-6 h-6 text-[#315E47]" />
                Item Scanner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Scan individual items for real market value</p>
              <Button onClick={() => handleScan('item')} disabled={!isPro || scanning} className="w-full">
                {scanning ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing...</> :
                 isPro ? <><Camera className="w-4 h-4 mr-2" />Scan Item</> : 
                 <><Lock className="w-4 h-4 mr-2" />Locked</>}
              </Button>
            </CardContent>
          </Card>
        </div>

        {result && (
          <Card className="mt-8 max-w-2xl mx-auto border-[#315E47]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#50E3E3]" />
                Market Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Value:</span>
                  <span className="text-2xl font-bold text-[#315E47]">${result.estimatedValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Value Range:</span>
                  <span className="font-medium">${result.minValue} - ${result.maxValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Items Analyzed:</span>
                  <Badge>{result.itemsAnalyzed}</Badge>
                </div>
                <div className="mt-4 p-4 bg-[#F6F4EE] rounded">
                  <h4 className="font-semibold mb-2">Market Comparables:</h4>
                  {result.comparables.map((comp: any, idx: number) => (
                    <div key={idx} className="text-sm py-1 flex justify-between">
                      <span className="capitalize">{comp.item}</span>
                      <span className="text-[#315E47] font-medium">${comp.avgPrice} ({comp.sampleSize} sold)</span>
                    </div>
                  ))}
                </div>
                <Badge className="bg-[#315E47] text-white">Ethical Buyer Badge Earned</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ScannerTools;

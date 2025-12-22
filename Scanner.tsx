import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, TrendingUp, MapPin, Calendar, DollarSign, Lock, Loader2, Eye } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { supabase } from '@/lib/supabase';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

interface AuctionListing {
  id: string;
  source: string;
  listing_url: string;
  facility_name: string;
  facility_location: string;
  unit_number: string;
  auction_date: string;
  current_bid: number;
  bid_count: number;
  thumbnail_url: string;
  market_potential_score?: number;
  analyzed: boolean;
  ai_summary?: string;
}

const Scanner = () => {
  const { currentUser } = useAppContext();
  const [listings, setListings] = useState<AuctionListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [selectedListing, setSelectedListing] = useState<AuctionListing | null>(null);
  const isPro = currentUser?.subscription === 'pro';

  const loadListings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('auction_listings')
        .select('*')
        .order('market_potential_score', { ascending: false, nullsFirst: false });
      
      if (error) throw error;
      setListings(data || []);
    } catch (err) {
      console.error('Error loading listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const filteredListings = listings.filter(listing => {
    if (searchLocation && !listing.facility_location?.toLowerCase().includes(searchLocation.toLowerCase())) {
      return false;
    }
    if (scoreFilter === 'high' && (listing.market_potential_score || 0) < 70) return false;
    if (scoreFilter === 'medium' && ((listing.market_potential_score || 0) < 40 || (listing.market_potential_score || 0) >= 70)) return false;
    if (scoreFilter === 'low' && (listing.market_potential_score || 0) >= 40) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F6F4EE]">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1C2E25] mb-4">ReFURRM Scanner</h1>
          <p className="text-lg text-[#315E47]">AI-powered auction analysis to maximize rescue potential</p>
          <p className="text-sm text-gray-500 italic mt-2 max-w-3xl mx-auto">
            ReFURRM Scanner analyzes publicly available storage auction listings to assess resale potential. 
            The tool does not access private data, interfere with sales, or identify individuals.
          </p>
          {!isPro && (
            <Badge className="mt-4 bg-[#50E3E3] text-white">Pro Feature - Upgrade to Access</Badge>
          )}
        </div>


        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search by location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full"
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <Select value={scoreFilter} onValueChange={setScoreFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scores</SelectItem>
              <SelectItem value="high">High (70-100)</SelectItem>
              <SelectItem value="medium">Medium (40-69)</SelectItem>
              <SelectItem value="low">Low (0-39)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#315E47]" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className={!isPro ? 'opacity-50 blur-sm' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{listing.facility_name}</CardTitle>
                    {listing.market_potential_score && (
                      <Badge className={
                        listing.market_potential_score >= 70 ? 'bg-green-500' :
                        listing.market_potential_score >= 40 ? 'bg-yellow-500' : 'bg-gray-500'
                      }>
                        {listing.market_potential_score}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <img src={listing.thumbnail_url} alt="Unit" className="w-full h-48 object-cover rounded mb-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#315E47]" />
                      <span>{listing.facility_location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#315E47]" />
                      <span>{new Date(listing.auction_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#315E47]" />
                      <span>Current Bid: ${listing.current_bid}</span>
                    </div>
                  </div>
                  {listing.ai_summary && (
                    <p className="text-sm text-gray-600 mt-3">{listing.ai_summary}</p>
                  )}
                  <Button className="w-full mt-4" disabled={!isPro}>
                    {isPro ? <><Eye className="w-4 h-4 mr-2" />View Details</> : <><Lock className="w-4 h-4 mr-2" />Locked</>}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isPro && (
          <Card className="mt-8 border-[#50E3E3]">
            <CardContent className="text-center py-8">
              <Lock className="w-12 h-12 mx-auto text-[#50E3E3] mb-4" />
              <h3 className="text-2xl font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-gray-600 mb-4">Access AI-powered auction analysis and maximize your rescue potential</p>
              <Button size="lg" className="bg-[#50E3E3] hover:bg-[#315E47]">Upgrade Now</Button>
              <Link to="/community" className={buttonVariants({ variant: "default", size: "lg", className: "bg-[#50E3E3] hover:bg-[#315E47]" })}>Upgrade Now</Link>
            </CardContent>

          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Scanner;

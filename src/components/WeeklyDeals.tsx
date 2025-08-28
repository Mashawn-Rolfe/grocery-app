import { useState, useEffect } from 'react';
import { Clock, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ProductGrid } from './ProductGrid';
import { useProducts } from '../contexts/ProductContext';
import type { Product } from '../contexts/ProductContext';


interface WeeklyDealsProps {
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

export function WeeklyDeals({ onProductClick, onBack }: WeeklyDealsProps) {
  const { getWeeklyDeals } = useProducts();
  const [timeLeft, setTimeLeft] = useState('');
  
  const weeklyDeals = getWeeklyDeals();

  // Calculate time until deal ends (mock - ends on Sunday)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + (7 - now.getDay()));
      nextSunday.setHours(23, 59, 59, 999);
      
      const difference = nextSunday.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${days}d ${hours}h ${minutes}m`;
      }
      
      return 'Expired';
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full mb-4">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Weekly Deals - Ends in {timeLeft}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              🔥 This Week's <span className="text-primary">Hot Deals</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss these incredible savings! Limited time offers on your favorite products.
            </p>
          </div>
        </div>

        {/* Deal Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">
                {weeklyDeals.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Products on Sale</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-green-600">
                Up to 30%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Maximum Savings</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-orange-500">
                {timeLeft}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Time Remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Deal Banner */}
        {weeklyDeals.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-orange-500/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Deal of the Week</h3>
                    <p className="text-muted-foreground">
                      {weeklyDeals[0].name} - Save {
                        Math.round(((weeklyDeals[0].originalPrice! - weeklyDeals[0].price) / weeklyDeals[0].originalPrice!) * 100)
                      }%!
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => onProductClick(weeklyDeals[0])}
                  className="bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90"
                >
                  Shop Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Deals Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Weekly Deals</h2>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              Limited Time Only
            </Badge>
          </div>
          
          {weeklyDeals.length > 0 ? (
            <ProductGrid 
              products={weeklyDeals} 
              onProductClick={onProductClick}
              viewMode="grid"
            />
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No deals available</h3>
              <p className="text-muted-foreground">
                Check back next week for exciting new deals!
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Never Miss a Deal!</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter and be the first to know about our weekly deals.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
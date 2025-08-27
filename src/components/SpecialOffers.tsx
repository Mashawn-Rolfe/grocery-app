import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, Truck, Shield } from "lucide-react";

export function SpecialOffers() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekend Sale */}
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="p-6">
              <Badge className="bg-destructive text-destructive-foreground mb-4">
                Limited Time
              </Badge>
              <h3 className="text-2xl font-bold mb-2">Weekend Sale</h3>
              <p className="text-primary-foreground/90 mb-4">
                Save up to 40% on all fresh produce this weekend only!
              </p>
              <Button variant="secondary" size="sm">
                Shop Sale Items
              </Button>
            </CardContent>
          </Card>

          {/* Free Delivery */}
          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground border-0">
            <CardContent className="p-6">
              <Truck className="size-12 mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Free Delivery</h3>
              <p className="text-secondary-foreground/80 mb-4">
                Get free same-day delivery on orders over $50. No minimum for members!
              </p>
              <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Learn More
              </Button>
            </CardContent>
          </Card>

          {/* Freshness Guarantee */}
          <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground border-0">
            <CardContent className="p-6">
              <Shield className="size-12 mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">100% Fresh</h3>
              <p className="text-accent-foreground/80 mb-4">
                Not satisfied with freshness? We'll replace it or give you a full refund.
              </p>
              <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Our Guarantee
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick delivery promise */}
        <div className="mt-12 bg-muted rounded-lg p-8 text-center">
          <Clock className="size-16 mx-auto mb-4 text-primary" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Order by 2 PM for Same-Day Delivery</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Fresh groceries delivered to your door in as little as 1 hour. Available 7 days a week within our delivery zones.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Check Delivery Area
          </Button>
        </div>
      </div>
    </section>
  );
}
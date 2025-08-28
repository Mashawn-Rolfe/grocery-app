import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/5 to-accent/20 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
                50% OFF
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Fresh Groceries
                <br />
                <span className="text-primary">Delivered Daily</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-md">
              Get the freshest produce, premium quality meats, and all your grocery essentials delivered right to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
              size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Shop Now
              </Button>
              <Button variant="outline" size="lg">
                View Weekly Deals
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="font-bold text-xl text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl text-foreground">1hr</div>
                <div className="text-sm text-muted-foreground">Delivery Time</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Customer Support</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560096142-792fc2baab4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc2hvcHBpbmclMjBiYW5uZXJ8ZW58MXx8fHwxNzU1OTU3NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Fresh grocery shopping"
              className="rounded-lg shadow-2xl w-full h-96 object-cover"
            />
            {/* Floating offer card */}
            <div className="absolute top-4 right-4 bg-background border border-border rounded-lg p-4 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">FREE</div>
                <div className="text-sm text-foreground">Delivery</div>
                <div className="text-xs text-muted-foreground">Orders over $50</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
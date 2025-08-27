import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const featuredProducts = [
  {
    id: 1,
    name: "Organic Red Apples",
    price: 4.99,
    originalPrice: 6.99,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1683688684067-b87a189c7503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYXBwbGVzJTIwZnJlc2h8ZW58MXx8fHwxNzU2MDIwNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "30% OFF",
    unit: "per lb",
  },
  {
    id: 2,
    name: "Fresh Atlantic Salmon",
    price: 12.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1563612116828-a62f45c706e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbG1vbiUyMGZpc2h8ZW58MXx8fHwxNzU1OTcyNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "FRESH",
    unit: "per lb",
  },
  {
    id: 3,
    name: "Organic Whole Milk",
    price: 3.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwbWlsayUyMGJvdHRsZXxlbnwxfHx8fDE3NTYwMjA0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "ORGANIC",
    unit: "1 gallon",
  },
  {
    id: 4,
    name: "Ripe Avocados",
    price: 2.49,
    originalPrice: 3.49,
    rating: 4.6,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1741515042473-7664f850f7dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwZnJlc2glMjBncmVlbnxlbnwxfHx8fDE3NTYwMjA0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "SALE",
    unit: "pack of 4",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Our most popular and freshest items</p>
          </div>
          <Button variant="outline">View All Products</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border border-border">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                    {product.badge}
                  </Badge>
                  <Button
                    size="sm"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-8 p-0"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
                
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-foreground">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{product.unit}</span>
                  </div>

                  <Button className="w-full" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
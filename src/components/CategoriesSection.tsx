import { Carrot, Apple, Beef, Milk } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const categories = [
  {
    id: 'vegetables',
    name: 'Fresh Vegetables',
    description: 'Farm-fresh, organic vegetables',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    icon: Carrot,
    itemCount: '150+ items'
  },
  {
    id: 'fruits',
    name: 'Fresh Fruits',
    description: 'Sweet, ripe, seasonal fruits',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80',
    icon: Apple,
    itemCount: '120+ items'
  },
  {
    id: 'meat',
    name: 'Premium Meat',
    description: 'High-quality, fresh meat cuts',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80',
    icon: Beef,
    itemCount: '80+ items'
  },
  {
    id: 'dairy',
    name: 'Dairy Products',
    description: 'Fresh milk, cheese, and more',
    image: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=400&q=80',
    icon: Milk,
    itemCount: '90+ items'
  },
];

interface CategoriesSectionProps {
  onCategoryClick?: (categoryId: string) => void;
}

export function CategoriesSection({ onCategoryClick }: CategoriesSectionProps) {
  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of fresh, high-quality products organized by category for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button variant="secondary" size="sm">
                        Browse {category.name}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {category.description}
                    </p>
                    <span className="text-xs text-primary font-medium">
                      {category.itemCount}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
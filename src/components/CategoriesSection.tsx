import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const categories = [
  {
    id: 1,
    name: "Fresh Produce",
    image: "https://images.unsplash.com/photo-1670680901600-8b2b1856ce3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBncm9jZXJ5fGVufDF8fHx8MTc1NjAwMDQyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "200+ items",
  },
  {
    id: 2,
    name: "Fresh Fruits",
    image: "https://images.unsplash.com/photo-1556011284-54aa6466d402?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdHMlMjBtYXJrZXQlMjBmcmVzaHxlbnwxfHx8fDE3NTYwMjAzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "150+ items",
  },
  {
    id: 3,
    name: "Fresh Bakery",
    image: "https://images.unsplash.com/photo-1679673987713-54f809ce417d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMGZyZXNofGVufDF8fHx8MTc1NjAwMDc2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "80+ items",
  },
  {
    id: 4,
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTYwMTY1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "60+ items",
  },
  {
    id: 5,
    name: "Meat & Seafood",
    image: "https://images.unsplash.com/photo-1632154023554-c2975e9be348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwYnV0Y2hlciUyMHNob3B8ZW58MXx8fHwxNzU1OTY0NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: "100+ items",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-muted-foreground">Explore our wide selection of fresh and quality products</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-border">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.itemCount}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState } from 'react';
import { ArrowLeft, Plus, Minus, Star, Heart, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  weight?: string;
  origin?: string;
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
    setQuantity(1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {!product.inStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.weight && (
                <p className="text-sm text-muted-foreground">
                  Price per {product.weight}
                </p>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {product.origin && (
              <div>
                <h3 className="font-medium mb-1">Origin</h3>
                <p className="text-sm text-muted-foreground">{product.origin}</p>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to Cart - {formatPrice(product.price * quantity)}
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                {product.origin && (
                  <div className="mt-4">
                    <h4>Origin & Quality</h4>
                    <p>Sourced from {product.origin}, ensuring the highest quality and freshness.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition" className="mt-6">
              {product.nutritionalInfo ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {product.nutritionalInfo.calories}
                    </div>
                    <div className="text-sm text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {product.nutritionalInfo.protein}
                    </div>
                    <div className="text-sm text-muted-foreground">Protein</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {product.nutritionalInfo.carbs}
                    </div>
                    <div className="text-sm text-muted-foreground">Carbs</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {product.nutritionalInfo.fat}
                    </div>
                    <div className="text-sm text-muted-foreground">Fat</div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Nutritional information not available for this product.
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{product.rating}</div>
                    <div className="flex items-center justify-center">
                      {renderStars(product.rating)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {product.reviewCount} reviews
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Sample reviews */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(5)}</div>
                      <span className="font-medium">John D.</span>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm">
                      Excellent quality and very fresh. Delivery was quick and packaging was perfect.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">{renderStars(4)}</div>
                      <span className="font-medium">Sarah M.</span>
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-sm">
                      Good product, exactly as described. Would buy again.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from '../contexts/ProductContext';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export function ProductGrid({ products, onProductClick, viewMode = 'grid' }: ProductGridProps) {
  const { addItem } = useCart();

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search criteria or browse our categories
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="cursor-pointer transition-all duration-200 hover:shadow-lg"
            onClick={() => onProductClick(product)}
          >
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <div className="relative">
                  <div className="w-24 h-24 overflow-hidden rounded">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.originalPrice && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -left-1 text-xs px-1"
                    >
                      Sale
                    </Badge>
                  )}
                  {product.isWeeklyDeal && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 text-xs px-1"
                    >
                      Deal
                    </Badge>
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        {!product.inStock && (
                          <Badge variant="destructive" className="text-xs">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      {product.weight && (
                        <p className="text-xs text-muted-foreground">
                          per {product.weight}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-2">
                      {product.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onProductClick(product);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm"
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className="group cursor-pointer transition-all duration-200 hover:shadow-lg"
          onClick={() => onProductClick(product)}
        >
          <CardContent className="p-0">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              {product.originalPrice && (
                <Badge 
                  variant="destructive" 
                  className="absolute top-2 left-2"
                >
                  Sale
                </Badge>
              )}
              {product.isWeeklyDeal && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 right-2"
                >
                  Weekly Deal
                </Badge>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onProductClick(product);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <Button 
                  size="sm"
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              
              {!product.inStock && (
                <Badge variant="secondary" className="w-full mt-2 justify-center">
                  Out of Stock
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
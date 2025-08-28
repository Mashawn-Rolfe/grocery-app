import { ProductGrid } from './ProductGrid';
import { useProducts } from '../contexts/ProductContext';
import type { Product } from '../contexts/ProductContext';


interface FeaturedProductsProps {
  onProductClick: (product: Product) => void;
}

export function FeaturedProducts({ onProductClick }: FeaturedProductsProps) {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved products, carefully selected for quality and freshness.
          </p>
        </div>

        <ProductGrid 
          products={featuredProducts} 
          onProductClick={onProductClick}
          viewMode="grid"
        />
      </div>
    </section>
  );
}
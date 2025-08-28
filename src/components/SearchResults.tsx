import { useState } from 'react';
import { Filter, Grid, List, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ProductGrid } from './ProductGrid';
import { useProducts } from '../contexts/ProductContext';
import type { SearchFilters, Product } from '../contexts/ProductContext';

interface SearchResultsProps {
  initialQuery?: string;
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

export function SearchResults({ initialQuery = '', onProductClick, onBack }: SearchResultsProps) {
  const { searchProducts, categories } = useProducts();
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    category: 'All',
    minPrice: 0,
    maxPrice: 50,
    minRating: 0,
    inStockOnly: false,
    onSaleOnly: false,
    weeklyDealsOnly: false,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating' | 'name'>('relevance');

  const filteredProducts = searchProducts(filters);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0; // relevance - keep original order
    }
  });

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      query: initialQuery,
      category: 'All',
      minPrice: 0,
      maxPrice: 50,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
      weeklyDealsOnly: false,
    });
  };

  const activeFiltersCount = [
    filters.category !== 'All',
    filters.minPrice > 0,
    filters.maxPrice < 50,
    filters.minRating > 0,
    filters.inStockOnly,
    filters.onSaleOnly,
    filters.weeklyDealsOnly,
  ].filter(Boolean).length;

  const FilterSidebar = () => (
    <div className="w-80 space-y-6 p-6 border-r bg-background">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        )}
      </div>

      {/* Search Query */}
      <div className="space-y-2">
        <Label>Search</Label>
        <Input
          value={filters.query}
          onChange={(e) => updateFilters({ query: e.target.value })}
          placeholder="Search products..."
        />
      </div>

      <Separator />

      {/* Category Filter */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={filters.category} onValueChange={(value) => updateFilters({ category: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <Label>Price Range</Label>
        <div className="px-2">
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) => updateFilters({ minPrice: min, maxPrice: max })}
            max={50}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.minPrice.toFixed(2)}</span>
          <span>${filters.maxPrice.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      {/* Rating Filter */}
      <div className="space-y-4">
        <Label>Minimum Rating</Label>
        <div className="px-2">
          <Slider
            value={[filters.minRating]}
            onValueChange={([rating]) => updateFilters({ minRating: rating })}
            max={5}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Any</span>
          <span>{filters.minRating}+ stars</span>
        </div>
      </div>

      <Separator />

      {/* Additional Filters */}
      <div className="space-y-4">
        <Label>Additional Filters</Label>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">In Stock Only</span>
          <Switch
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => updateFilters({ inStockOnly: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">On Sale Only</span>
          <Switch
            checked={filters.onSaleOnly}
            onCheckedChange={(checked) => updateFilters({ onSaleOnly: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Weekly Deals Only</span>
          <Switch
            checked={filters.weeklyDealsOnly}
            onCheckedChange={(checked) => updateFilters({ weeklyDealsOnly: checked })}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              ← Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {filters.query ? `Search Results for "${filters.query}"` : 'All Products'}
              </h1>
              <p className="text-muted-foreground">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-6 pb-0">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <FilterSidebar />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.category !== 'All' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {filters.category}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilters({ category: 'All' })}
                />
              </Badge>
            )}
            {filters.minPrice > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Min: ${filters.minPrice}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilters({ minPrice: 0 })}
                />
              </Badge>
            )}
            {filters.maxPrice < 50 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Max: ${filters.maxPrice}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => updateFilters({ maxPrice: 50 })}
                />
              </Badge>
            )}
          </div>
        )}

        <div className="flex">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Results */}
          <div className="flex-1 lg:ml-6">
            <ProductGrid 
              products={sortedProducts} 
              onProductClick={onProductClick}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from 'react';
import { Search, User, Menu, Percent } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';
import { Cart } from './Cart';
import { useProducts } from '../contexts/ProductContext';

interface HeaderProps {
  onLogoClick?: () => void;
  onSearch?: (query: string) => void;
  onWeeklyDealsClick?: () => void;
  onCategoryClick?: (category: string) => void;
}

export function Header({ onLogoClick, onSearch, onWeeklyDealsClick, onCategoryClick }: HeaderProps) {

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { searchProducts, getWeeklyDeals, categories } = useProducts();
  const searchInputRef = useRef<HTMLInputElement>(null);
// Get search suggestions
  const suggestions = searchQuery.length > 1 
    ? searchProducts({ query: searchQuery }).slice(0, 5)
    : [];

  // Get weekly deals count for badge
  const weeklyDealsCount = getWeeklyDeals().length;

  const handleSearch = (query: string) => {
    setSearchQuery('');
    setShowSuggestions(false);
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSuggestionClick = (productName: string) => {
    handleSearch(productName);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={onLogoClick}
          >
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold hidden sm:block">FreshMart</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onCategoryClick && onCategoryClick('All')}
              className="text-foreground hover:text-primary transition-colors"
            >
              All Products
            </button>
            {categories.slice(0, 4).map(category => (
              <button
                key={category}
                onClick={() => onCategoryClick && onCategoryClick(category)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {category}
              </button>
            ))}
            <button
              onClick={onWeeklyDealsClick}
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
            >
              <Percent className="h-4 w-4" />
              <span>Weekly Deals</span>
              {weeklyDealsCount > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 text-xs">
                  {weeklyDealsCount}
                </Badge>
              )}
            </button>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 relative" ref={searchInputRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 1);
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 1)}
                />
              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50">
                <Command>
                  <CommandList>
                    <CommandGroup heading="Products">
                      {suggestions.map((product) => (
                        <CommandItem
                          key={product.id}
                          onSelect={() => handleSuggestionClick(product.name)}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <div className="w-8 h-8 bg-muted rounded overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.category} • ${product.price.toFixed(2)}
                            </p>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => handleSearch(searchQuery)}
                        className="text-primary cursor-pointer"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Search for "{searchQuery}"
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            
            <Cart />

            {/* Mobile Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => onCategoryClick && onCategoryClick('All')}
                  >
                    All Products
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => onCategoryClick && onCategoryClick(category)}
                    >
                      {category}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={onWeeklyDealsClick}
                  >
                    <Percent className="h-4 w-4 mr-2" />
                    Weekly Deals
                    {weeklyDealsCount > 0 && (
                      <Badge variant="destructive" className="ml-auto h-5 text-xs">
                        {weeklyDealsCount}
                      </Badge>
                    )}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}
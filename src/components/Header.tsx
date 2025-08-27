import { Search, ShoppingCart, MapPin, Phone, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export function Header() {
  return (
    <header className="bg-background border-b border-border">
      {/* Top banner with contact info */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span className="text-sm">(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span className="text-sm">Free delivery within 5 miles</span>
            </div>
          </div>
          <div className="text-sm">Open 7 days a week: 7AM - 10PM</div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Farmer's Mart</h1>
            <Badge variant="secondary" className="ml-2">Grocery</Badge>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                type="text"
                placeholder="Search for products, brands, and more..."
                className="pl-10 pr-4 py-2 w-full bg-input-background"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <User className="size-4" />
              <span className="hidden sm:inline">Account</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 relative">
              <ShoppingCart className="size-4" />
              <span className="hidden sm:inline">Cart</span>
              <Badge className="absolute -top-2 -right-2 size-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground">
                3
              </Badge>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex items-center gap-8 overflow-x-auto">
          <Button variant="ghost" size="sm" className="whitespace-nowrap">Fresh Produce</Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">Dairy & Eggs</Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">Meat & Seafood</Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">Bakery</Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">Pantry</Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">Frozen</Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">Beverages</Button>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">Health & Beauty</Button>
        </nav>
      </div>
    </header>
  );
}
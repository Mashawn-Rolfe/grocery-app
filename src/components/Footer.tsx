import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground">Farmer's Mart</h3>
            <p className="text-muted-foreground text-sm">
              Your neighborhood grocery store delivering fresh, quality products right to your doorstep since 2020.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                <span>123 Market Street, Fresh Valley, CA 90210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4" />
                <span>hello@farmersmart.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a></div>
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Store Locator</a></div>
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Weekly Ads</a></div>
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></div>
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></div>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Customer Service</h4>
            <div className="space-y-2">
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</a></div>
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Return Policy</a></div>
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Delivery Info</a></div>
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></div>
              <div><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to get special offers and weekly deals!
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-input-background"
              />
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <Facebook className="size-4" />
              </Button>
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <Instagram className="size-4" />
              </Button>
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <Twitter className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Farmer's Mart. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
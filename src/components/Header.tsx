import { useState } from "react";
import { Search, ShoppingCart, Menu, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount?: number;
}

const Header = ({ cartItemsCount = 0 }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b shadow-soft">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-border/50">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>Delivering to: <span className="text-foreground font-medium">Delhi, India</span></span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>🚚 Free delivery on orders above ₹500</span>
            <span>📞 Support: 1800-123-4567</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold">
              <span className="gradient-text">IndiVeg</span>
              <span className="text-accent">Hub</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for vegetables, spices, herbs..."
                className="pl-10 pr-4 py-2 h-12 bg-muted/50 border-border focus:bg-background"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* User */}
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Account</span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vegetables..."
              className="pl-10 pr-4 py-2 bg-muted/50 border-border"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border/50 pt-4">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                My Account
              </Button>
              <Button variant="ghost" className="justify-start">
                📞 Support
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
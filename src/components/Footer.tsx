import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail,
  Truck,
  Shield,
  RefreshCw,
  CreditCard
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">
                <span className="gradient-text">IndiVeg</span>
                <span className="text-accent">Hub</span>
              </div>
            </div>
            <p className="text-muted-foreground">
              Your trusted partner for fresh Indian vegetables, authentic spices, 
              and organic herbs. Farm to table, with love from India.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Fresh Vegetables</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Leafy Greens</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Spices & Herbs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Organic Products</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Seasonal Offers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bulk Orders</a></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Customer Service</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">My Account</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Delhi, Mumbai, Bangalore, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">support@indiveghub.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get weekly updates on fresh arrivals and special offers.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email"
                  className="flex-1"
                />
                <Button className="btn-primary">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Trust indicators */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Truck className="h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Free Delivery</div>
              <div className="text-sm">On orders above ₹500</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Shield className="h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Quality Guarantee</div>
              <div className="text-sm">Fresh or money back</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <RefreshCw className="h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Easy Returns</div>
              <div className="text-sm">Hassle-free process</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <CreditCard className="h-5 w-5 text-primary" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Secure Payment</div>
              <div className="text-sm">100% safe & secure</div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Copyright */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2024 IndiVeg Hub. All rights reserved. Made with ❤️ for India.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
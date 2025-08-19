import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Truck, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-vegetables.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-primary-foreground">Fresh </span>
                <span className="gradient-text">Indian Vegetables</span>
                <br />
                <span className="text-primary-foreground">Delivered Fresh</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 leading-relaxed">
                Get farm-fresh vegetables, authentic Indian spices, and organic herbs 
                delivered right to your doorstep. Quality guaranteed, prices you'll love.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-secondary group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 text-primary-foreground border-white/20 hover:bg-white/20">
                View Categories
              </Button>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3 text-primary-foreground/90">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Free Delivery</div>
                  <div className="text-sm opacity-80">Above ₹500</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/90">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Quality Assured</div>
                  <div className="text-sm opacity-80">Fresh guarantee</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/90">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Quick Delivery</div>
                  <div className="text-sm opacity-80">Same day delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Fresh Indian Vegetables"
                className="w-full h-[500px] object-cover rounded-2xl shadow-strong animate-float"
              />
              
              {/* Floating cards */}
              <Card className="absolute -top-4 -left-4 p-4 bg-white shadow-medium animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">₹25</div>
                  <div className="text-sm text-muted-foreground">Fresh Spinach</div>
                </div>
              </Card>
              
              <Card className="absolute -bottom-4 -right-4 p-4 bg-white shadow-medium animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">50%</div>
                  <div className="text-sm text-muted-foreground">Off Spices</div>
                </div>
              </Card>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl transform rotate-6 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
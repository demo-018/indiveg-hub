import { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeaturedProducts = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const { toast } = useToast();
  const featuredProducts = getFeaturedProducts();

  const handleAddToCart = (productId: string, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: quantity
    }));

    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Added to cart!",
        description: `${product.name} (${quantity}) added to your cart.`,
      });
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              <span className="gradient-text">Featured</span> Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Handpicked fresh vegetables and spices at unbeatable prices
            </p>
          </div>
          <Button variant="outline" className="group hidden md:flex">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" className="group">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Special offers */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-warm text-white p-8 rounded-2xl shadow-strong">
            <h3 className="text-2xl font-bold mb-4">🌶️ Spice Up Your Kitchen!</h3>
            <p className="text-white/90 mb-6">
              Get authentic Indian spices at 30% off. Limited time offer on all spice varieties.
            </p>
            <Button variant="secondary" className="bg-white text-accent hover:bg-white/90">
              Shop Spices Now
            </Button>
          </div>
          
          <div className="bg-gradient-primary text-primary-foreground p-8 rounded-2xl shadow-strong">
            <h3 className="text-2xl font-bold mb-4">🥬 Fresh Greens Daily</h3>
            <p className="text-primary-foreground/90 mb-6">
              Subscribe to our daily fresh greens delivery and never run out of healthy vegetables.
            </p>
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
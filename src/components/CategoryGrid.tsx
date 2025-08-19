import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";
import { ArrowRight } from "lucide-react";

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Shop by <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of fresh vegetables, authentic spices, and organic herbs
            handpicked for quality and freshness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group cursor-pointer card-hover bg-card/50 backdrop-blur border-border/50"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.hindiName}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button variant="ghost" className="group/btn p-0 h-auto font-semibold text-primary hover:text-primary-glow">
                    Browse {category.name}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-accent text-accent-foreground p-8 max-w-2xl mx-auto shadow-strong">
            <h3 className="text-2xl font-bold mb-4">🌿 Fresh from Farm to Your Table</h3>
            <p className="text-accent-foreground/90 mb-6">
              All our vegetables are sourced directly from local farmers across India, 
              ensuring maximum freshness and supporting our farming communities.
            </p>
            <Button variant="secondary" size="lg" className="bg-white text-accent hover:bg-white/90">
              Learn More About Our Sourcing
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
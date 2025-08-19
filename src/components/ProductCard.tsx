import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string, quantity: number) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
    }
    onAddToCart?.(product.id, quantity + 1);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart?.(product.id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart?.(product.id, newQuantity);
    }
  };

  return (
    <Card className="group cursor-pointer card-hover bg-card border-border/50 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Discount badge */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground font-bold">
              {discountPercentage}% OFF
            </Badge>
          )}
          
          {/* Stock status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.hindiName}</p>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-sm text-muted-foreground">{product.unit}</span>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.benefits.slice(0, 2).map((benefit, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          {/* Add to cart controls */}
          <div className="flex items-center justify-between">
            {quantity === 0 ? (
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="btn-primary w-full"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecrement}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="flex-1 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleIncrement}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
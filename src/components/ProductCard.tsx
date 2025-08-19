import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string, quantity: number) => void;
  isInCart?: boolean;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, onAddToCart, isInCart = false, viewMode = 'grid' }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  
  // Calculate if there's a significant discount
  const hasDiscount = product.maxPrice > product.minPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.maxPrice - product.minPrice) / product.maxPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isInCart) {
      // Remove from cart
      onAddToCart?.(product.id, 0);
    } else {
      // Add to cart with default quantity
      const defaultQuantity = product.quantityType === 'pieces' ? 1 : 0.5;
      onAddToCart?.(product.id, defaultQuantity);
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="group cursor-pointer card-hover bg-card border-border/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex">
            {/* Image */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Link to={`/vegetable/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{product.hindiName}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    ₹{product.minPrice}-{product.maxPrice}/{product.unit}
                  </div>
                  {hasDiscount && (
                    <Badge variant="secondary" className="text-xs">
                      Save up to {discountPercentage}%
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {product.benefits.slice(0, 3).map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  variant={isInCart ? "destructive" : "default"}
                  className={isInCart ? "" : "btn-primary"}
                  size="sm"
                >
                  {isInCart ? (
                    "Remove from Cart"
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group cursor-pointer card-hover bg-card border-border/50 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <Link to={`/vegetable/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          
          {/* Discount badge */}
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground font-bold">
              Best Price
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
            <Link to={`/vegetable/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{product.hindiName}</p>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                ₹{product.minPrice}-{product.maxPrice}
              </span>
              <span className="text-sm text-muted-foreground">per {product.unit}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {product.stockQuantity} {product.unit} left
            </Badge>
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
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            variant={isInCart ? "destructive" : "default"}
            className={`w-full ${isInCart ? "" : "btn-primary"}`}
            size="sm"
          >
            {isInCart ? (
              "Remove from Cart"
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
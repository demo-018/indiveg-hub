import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Star, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProductByName, getRelatedProducts, getProductReviews } from '@/data/demoData';
import { useCart } from '@/contexts/CartContext';
import { ProductCard } from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const { addToCart, getTotalItems, getCartItemsWithProducts } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductByName(productName || '');
  const reviews = product ? getProductReviews(product.id) : [];
  const relatedProducts = product ? getRelatedProducts(product.id, product.category) : [];
  const cartItems = getCartItemsWithProducts();
  const isInCart = cartItems.some(item => item.productId === product?.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={getTotalItems()} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/vegetables')}>
            Browse Vegetables
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setQuantity(1);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={getTotalItems()} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/vegetables')}
            className="p-0 h-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Vegetables
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-muted">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold">{product.name}</h1>
              <p className="text-xl text-muted-foreground">{product.hindiName}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">
                ₹{product.minPrice}-{product.maxPrice}
                <span className="text-base font-normal text-muted-foreground">/{product.unit}</span>
              </div>
              {!product.inStock && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(averageRating) ? 'fill-secondary text-secondary' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
            )}

            <p className="text-muted-foreground">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-16 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 btn-primary"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isInCart ? 'Add More' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About this product</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.detailedDescription}</p>
            </CardContent>
          </Card>

          {/* Nutrition */}
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Calories</span>
                <span>{product.nutrition.calories} per 100g</span>
              </div>
              <div className="flex justify-between">
                <span>Protein</span>
                <span>{product.nutrition.protein}g</span>
              </div>
              <div className="flex justify-between">
                <span>Carbohydrates</span>
                <span>{product.nutrition.carbs}g</span>
              </div>
              <div className="flex justify-between">
                <span>Fiber</span>
                <span>{product.nutrition.fiber}g</span>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Rich in Vitamins:</h4>
                <div className="flex flex-wrap gap-1">
                  {product.nutrition.vitamins.map((vitamin, index) => (
                    <Badge key={index} variant="outline">{vitamin}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Health Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-3">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Reviews */}
        {reviews.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-secondary text-secondary' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium">{review.userName}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={(productId, quantity) => addToCart(productId, quantity)}
                  isInCart={cartItems.some(item => item.productId === relatedProduct.id)}
                  viewMode="grid"
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
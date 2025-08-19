import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  children: React.ReactNode;
}

export const CartSidebar = ({ children }: CartSidebarProps) => {
  const [open, setOpen] = useState(false);
  const { getCartItemsWithProducts, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();
  
  const cartItems = getCartItemsWithProducts();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    setOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {getTotalItems() > 0 && (
              <Badge variant="secondary">{getTotalItems()}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some vegetables to get started</p>
                <Button onClick={() => setOpen(false)} className="btn-primary">
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {cartItems.map(item => (
                  <div key={item.productId} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.product.hindiName}</p>
                      <p className="text-sm font-medium">
                        ₹{item.product.minPrice}-{item.product.maxPrice}/{item.product.unit}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromCart(item.productId)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      
                      <div className="flex items-center border rounded">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-2 text-sm min-w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Items ({getTotalItems()})</span>
                    <span>₹{totalPrice.min.toFixed(2)} - ₹{totalPrice.max.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Delivery fee</span>
                    <span>₹40</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total (estimated)</span>
                    <span>₹{(totalPrice.min + 40).toFixed(2)} - ₹{(totalPrice.max + 40).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  className="w-full btn-primary"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
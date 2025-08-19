import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays, isToday, isTomorrow } from 'date-fns';
import { CalendarIcon, MapPin, Phone, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

const checkoutSchema = z.object({
  deliveryDate: z.string().min(1, 'Please select a delivery date'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  street: z.string().min(5, 'Street address is required'),
  area: z.string().min(2, 'Area is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { getCartItemsWithProducts, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { createNewOrder } = useOrders();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const cartItems = getCartItemsWithProducts();
  const totalPrice = getTotalPrice();
  const deliveryFee = 40;

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      mobile: user?.mobile || '',
      street: user?.addresses[0]?.street || '',
      area: user?.addresses[0]?.area || '',
      city: user?.addresses[0]?.city || '',
      state: user?.addresses[0]?.state || '',
      pincode: user?.addresses[0]?.pincode || '',
      deliveryDate: '',
    },
  });

  // Generate delivery date options (next 4 days)
  const deliveryDates = Array.from({ length: 4 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    return {
      value: date.toISOString().split('T')[0],
      label: isToday(date) ? 'Today' : isTomorrow(date) ? 'Tomorrow' : format(date, 'EEE, MMM d'),
      date
    };
  });

  const onSubmit = async (data: CheckoutForm) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const address = {
        id: 'checkout-address',
        street: data.street,
        area: data.area,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        isDefault: false
      };

      const order = await createNewOrder(
        cartItems,
        address,
        data.deliveryDate,
        data.mobile
      );

      if (order) {
        clearCart();
        navigate(`/order/${order.id}`);
      }
    } catch (error) {
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header cartItemsCount={0} />
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Add some vegetables to proceed with checkout</p>
            <Button onClick={() => navigate('/vegetables')} className="btn-primary">
              Start Shopping
            </Button>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={cartItems.length} />
        
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Delivery Date */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Select Delivery Date
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="deliveryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {deliveryDates.map(option => (
                                  <div key={option.value} className="relative">
                                    <input
                                      type="radio"
                                      id={option.value}
                                      value={option.value}
                                      checked={field.value === option.value}
                                      onChange={field.onChange}
                                      className="peer sr-only"
                                    />
                                    <label
                                      htmlFor={option.value}
                                      className={cn(
                                        "flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all",
                                        "peer-checked:border-primary peer-checked:bg-primary/5",
                                        "hover:border-primary/50"
                                      )}
                                    >
                                      <span className="font-medium">{option.label}</span>
                                      <span className="text-sm text-muted-foreground">
                                        {format(option.date, 'MMM d')}
                                      </span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="h-5 w-5" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                              <Input placeholder="10-digit mobile number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Delivery Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Delivery Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="House/Flat no, Building, Street" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Area/Locality</FormLabel>
                              <FormControl>
                                <Input placeholder="Area, Locality" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pincode</FormLabel>
                              <FormControl>
                                <Input placeholder="6-digit pincode" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full btn-primary py-6 text-lg"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : `Place Order - ₹${(totalPrice.max + deliveryFee).toFixed(2)}`}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cartItems.map(item => (
                      <div key={item.productId} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <Badge variant="outline">{item.quantity}</Badge>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal (estimated)</span>
                      <span>₹{totalPrice.min.toFixed(2)} - ₹{totalPrice.max.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery fee</span>
                      <span>₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total (estimated)</span>
                      <span>₹{(totalPrice.min + deliveryFee).toFixed(2)} - ₹{(totalPrice.max + deliveryFee).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    * Final price will be calculated based on actual weight during packing
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;
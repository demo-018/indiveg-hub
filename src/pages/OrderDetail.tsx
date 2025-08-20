import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, MapPin, Phone, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { OrderStatus } from '@/types';
import { getProductById } from '@/data/demoData';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const statusColors = {
  placed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  accepted: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  packed: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  delivered: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

const statusSteps = ['placed', 'accepted', 'packed', 'delivered'];

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, cancelOrder } = useOrders();
  const { user } = useAuth();
  const { getTotalItems } = useCart();

  if (!user) {
    navigate('/login');
    return null;
  }

  const order = getOrderById(orderId || '');

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={getTotalItems()} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button onClick={() => navigate('/orders')}>
            Back to Orders
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const canCancelOrder = (status: OrderStatus) => {
    return status === 'placed' || status === 'accepted';
  };

  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(order.id);
      navigate('/orders');
    }
  };

  const getStatusProgress = (status: OrderStatus) => {
    if (status === 'cancelled' || status === 'rejected') return 0;
    const stepIndex = statusSteps.indexOf(status);
    return stepIndex >= 0 ? ((stepIndex + 1) / statusSteps.length) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={getTotalItems()} />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/orders')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      Order #{order.id.slice(-6)}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Placed on {format(new Date(order.orderDate), 'PPP p')}
                    </p>
                  </div>
                  <Badge className={statusColors[order.status]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Status Progress */}
                {order.status !== 'cancelled' && order.status !== 'rejected' && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Order Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(getStatusProgress(order.status))}%
                      </span>
                    </div>
                    <Progress value={getStatusProgress(order.status)} className="h-2" />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      {statusSteps.map(step => (
                        <span key={step} className={statusSteps.indexOf(order.status) >= statusSteps.indexOf(step) ? 'text-primary font-medium' : ''}>
                          {step.charAt(0).toUpperCase() + step.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Delivery Address</h4>
                      <p className="text-sm text-muted-foreground">
                        {order.deliveryAddress.street}<br />
                        {order.deliveryAddress.area}<br />
                        {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Contact Number</h4>
                      <p className="text-sm text-muted-foreground">{order.mobile}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Expected Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.deliveryDate), 'PPP')}
                    </p>
                  </div>
                  
                  {canCancelOrder(order.status) && (
                    <Button 
                      variant="outline" 
                      onClick={handleCancelOrder}
                      className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items ({order.items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.hindiName}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} {product.unit}
                          </p>
                        </div>

                        <div className="text-right">
                          {item.priceAtOrder ? (
                            <p className="font-medium">₹{(item.priceAtOrder * item.quantity).toFixed(2)}</p>
                          ) : (
                            <div>
                              <p className="font-medium">
                                ₹{(product.minPrice * item.quantity).toFixed(2)} - 
                                ₹{(product.maxPrice * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-xs text-muted-foreground">Estimated</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{order.deliveryFee.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>

                {order.status === 'delivered' && (
                  <>
                    <Separator />
                    <Button className="w-full btn-secondary">
                      <Star className="h-4 w-4 mr-2" />
                      Rate & Review
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetail;
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const { toast } = useToast();

  const handleTrackOrder = () => {
    if (!orderId.trim()) {
      toast({
        title: "Order ID Required",
        description: "Please enter a valid order ID to track your order.",
        variant: "destructive"
      });
      return;
    }

    // Mock tracking result
    const mockResult = {
      orderId: orderId,
      status: 'packed',
      estimatedDelivery: 'Today, 6:00 PM',
      currentLocation: 'Local Delivery Hub, Delhi',
      timeline: [
        { status: 'placed', label: 'Order Placed', time: '10:30 AM', completed: true },
        { status: 'accepted', label: 'Order Confirmed', time: '10:45 AM', completed: true },
        { status: 'packed', label: 'Order Packed', time: '2:30 PM', completed: true, current: true },
        { status: 'shipped', label: 'Out for Delivery', time: 'Expected 5:00 PM', completed: false },
        { status: 'delivered', label: 'Delivered', time: 'Expected 6:00 PM', completed: false }
      ]
    };

    setTrackingResult(mockResult);
  };

  const getStatusIcon = (status, completed, current) => {
    if (completed) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (current) {
      return <Clock className="h-5 w-5 text-primary animate-pulse" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-muted" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed': return 'bg-blue-500';
      case 'accepted': return 'bg-yellow-500';
      case 'packed': return 'bg-orange-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Track Your Order</h1>
            <p className="text-xl text-muted-foreground">
              Enter your order ID to get real-time updates on your delivery
            </p>
          </div>

          {/* Search Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Order Tracking
              </CardTitle>
              <CardDescription>
                Enter your order ID to track the status and location of your vegetables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    placeholder="e.g., IVH12345"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleTrackOrder} className="mt-6">
                  <Search className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Result */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Order Status Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Order #{trackingResult.orderId}</CardTitle>
                      <CardDescription>Track your fresh vegetables delivery</CardDescription>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {trackingResult.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">Estimated Delivery</p>
                        <p className="text-sm text-muted-foreground">{trackingResult.estimatedDelivery}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-semibold">Current Location</p>
                        <p className="text-sm text-muted-foreground">{trackingResult.currentLocation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Timeline
                  </CardTitle>
                  <CardDescription>Track the progress of your order step by step</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingResult.timeline.map((step, index) => (
                      <div key={index} className="flex items-center gap-4">
                        {getStatusIcon(step.status, step.completed, step.current)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`font-semibold ${step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.label}
                            </p>
                            <p className={`text-sm ${step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.time}
                            </p>
                          </div>
                          {step.current && (
                            <p className="text-sm text-primary mt-1">Currently in progress</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Help Section */}
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold">Need Help with Your Order?</h3>
                    <p className="text-sm text-muted-foreground">
                      If you have any questions about your delivery, our customer service team is here to help.
                    </p>
                    <div className="flex gap-2 justify-center mt-4">
                      <Button variant="outline" asChild>
                        <a href="/customer-service">Contact Support</a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="/faq">View FAQ</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Other helpful options for managing your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                  <a href="/orders">
                    <Package className="h-4 w-4 mr-2" />
                    View All Orders
                  </a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="/">
                    <Search className="h-4 w-4 mr-2" />
                    Shop Again
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTracking;
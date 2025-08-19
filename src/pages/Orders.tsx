import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Eye, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { OrderStatus } from '@/types';
import Header from '@/components/Header';
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

const Orders = () => {
  const { orders, cancelOrder } = useOrders();
  const { user } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  if (!user) {
    navigate('/login');
    return null;
  }

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  );

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  const canCancelOrder = (status: OrderStatus) => {
    return status === 'placed' || status === 'accepted';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={getTotalItems()} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your orders</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="placed">Placed</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="packed">Packed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-6">
                {statusFilter === 'all' 
                  ? "You haven't placed any orders yet." 
                  : `No orders with status "${statusFilter}".`}
              </p>
              <Button onClick={() => navigate('/vegetables')} className="btn-primary">
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <Card key={order.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id.slice(-6)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {format(new Date(order.orderDate), 'PPP')}
                      </p>
                    </div>
                    <Badge className={statusColors[order.status]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="md:col-span-2 space-y-3">
                      <h4 className="font-medium">Items ({order.items.length})</h4>
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                          <div className="w-12 h-12 bg-muted rounded-lg"></div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">Item {index + 1}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <p className="text-sm text-muted-foreground">
                          +{order.items.length - 3} more items
                        </p>
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Delivery Details</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.deliveryDate), 'PPP')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.deliveryAddress.area}, {order.deliveryAddress.city}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Total Amount</h4>
                        <p className="text-lg font-bold">₹{order.total.toFixed(2)}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/order/${order.id}`)}
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {canCancelOrder(order.status) && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancelOrder(order.id)}
                            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
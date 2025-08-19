import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, Address } from '@/types';
import { getOrdersByUserId, createOrder, updateOrderStatus } from '@/data/demoData';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface OrderContextType {
  orders: Order[];
  createNewOrder: (items: any[], deliveryAddress: Address, deliveryDate: string, mobile: string) => Promise<Order | null>;
  cancelOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  refreshOrders: () => void;
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const refreshOrders = () => {
    if (user) {
      const userOrders = getOrdersByUserId(user.id);
      setOrders(userOrders);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, [user]);

  const createNewOrder = async (items: any[], deliveryAddress: Address, deliveryDate: string, mobile: string): Promise<Order | null> => {
    if (!user) return null;

    setLoading(true);
    try {
      const order = createOrder(user.id, items, deliveryAddress, deliveryDate, mobile);
      setOrders(prev => [order, ...prev]);
      
      toast({
        title: "Order placed successfully!",
        description: `Order #${order.id.slice(-6)} has been placed. You'll receive updates on delivery.`,
      });

      setLoading(false);
      return order;
    } catch (error) {
      setLoading(false);
      toast({
        title: "Order failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled' as OrderStatus }
        : order
    ));

    toast({
      title: "Order cancelled",
      description: "Your order has been cancelled successfully.",
    });
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const value = {
    orders,
    createNewOrder,
    cancelOrder,
    getOrderById,
    refreshOrders,
    loading
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
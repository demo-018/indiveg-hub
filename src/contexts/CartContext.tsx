import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { getProductById } from '@/data/demoData';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => { min: number; max: number };
  getCartItemsWithProducts: () => (CartItem & { product: Product })[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: string, quantity: number) => {
    const product = getProductById(productId);
    if (!product) return;

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.productId === productId);
      
      if (existingItem) {
        // Update quantity if item already exists
        return currentItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...currentItems, {
          productId,
          quantity,
          addedAt: new Date().toISOString()
        }];
      }
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} (${quantity} ${product.unit}) added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    const product = getProductById(productId);
    setItems(currentItems => currentItems.filter(item => item.productId !== productId));
    
    if (product) {
      toast({
        title: "Removed from cart",
        description: `${product.name} removed from your cart.`,
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items removed from your cart.",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => {
        const product = getProductById(item.productId);
        if (product) {
          return {
            min: total.min + (product.minPrice * item.quantity),
            max: total.max + (product.maxPrice * item.quantity)
          };
        }
        return total;
      },
      { min: 0, max: 0 }
    );
  };

  const getCartItemsWithProducts = () => {
    return items.map(item => {
      const product = getProductById(item.productId);
      return { ...item, product: product! };
    }).filter(item => item.product);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getCartItemsWithProducts
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
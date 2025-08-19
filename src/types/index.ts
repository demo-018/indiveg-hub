// Enhanced types for the vegetable e-commerce app

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
  detailedDescription: string;
  benefits: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
    vitamins: string[];
  };
  tags: string[];
  quantityType: 'weight' | 'pieces'; // For dynamic quantity input
  stockQuantity: number;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  addresses: Address[];
  defaultAddressId?: string;
  joinedAt: string;
}

export interface Address {
  id: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  deliveryDate: string;
  deliveryAddress: Address;
  mobile: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderDate: string;
  estimatedTotal?: {
    min: number;
    max: number;
  };
  actualTotal?: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtOrder: number; // Fixed price after order is packed
  estimatedPrice?: {
    min: number;
    max: number;
  };
}

export type OrderStatus = 'placed' | 'accepted' | 'rejected' | 'packed' | 'delivered' | 'cancelled';

export interface Review {
  id: string;
  userId: string;
  productId: string;
  orderId?: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
}

export interface Category {
  id: string;
  name: string;
  hindiName: string;
  image: string;
  description: string;
}

// Authentication types
export interface LoginCredentials {
  mobile: string;
  password?: string;
  otp?: string;
}

export interface RegisterData {
  name: string;
  mobile: string;
  password: string;
  address: Omit<Address, 'id' | 'isDefault'>;
  pincode: string;
}

// API response types for demo data
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
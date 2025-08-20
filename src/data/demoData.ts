// Demo data for the vegetable e-commerce app
import { Product, User, Order, Review, Category, Address, OrderItem, OrderStatus } from '@/types';

export const categories: Category[] = [
  {
    id: "leafy-greens",
    name: "Leafy Greens",
    hindiName: "हरी पत्तेदार सब्जियां",
    image: "/src/assets/leafy-greens.jpg",
    description: "Fresh and nutritious leafy vegetables"
  },
  {
    id: "fresh-vegetables",
    name: "Fresh Vegetables",
    hindiName: "ताजी सब्जियां",
    image: "/src/assets/fresh-vegetables.jpg",
    description: "Daily fresh vegetables for your kitchen"
  },
  {
    id: "spices-herbs",
    name: "Spices & Herbs",
    hindiName: "मसाले और जड़ी-बूटियां",
    image: "/src/assets/spices-herbs.jpg",
    description: "Authentic Indian spices and herbs"
  }
];

export const products: Product[] = [
  // Leafy Greens
  {
    id: "spinach",
    name: "Fresh Spinach",
    hindiName: "पालक",
    minPrice: 20,
    maxPrice: 25,
    unit: "kg",
    image: "/src/assets/leafy-greens.jpg",
    category: "leafy-greens",
    inStock: true,
    description: "Fresh organic spinach leaves, rich in iron and vitamins",
    detailedDescription: "Our premium quality spinach is sourced directly from local organic farms. Rich in iron, folate, and vitamins A, C, and K. Perfect for making delicious palak paneer, dal palak, or healthy smoothies. Each bunch is carefully handpicked to ensure maximum freshness and nutritional value.",
    benefits: ["High in Iron", "Rich in Vitamins A, C, K", "Good for Eyes", "Boosts Immunity", "Supports Bone Health"],
    nutrition: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fiber: 2.2,
      vitamins: ["Vitamin A", "Vitamin C", "Vitamin K", "Folate", "Iron"]
    },
    tags: ["organic", "fresh", "iron-rich", "healthy"],
    quantityType: 'weight',
    stockQuantity: 50
  },
  {
    id: "coriander",
    name: "Fresh Coriander",
    hindiName: "धनिया",
    minPrice: 30,
    maxPrice: 40,
    unit: "kg",
    image: "/src/assets/leafy-greens.jpg",
    category: "leafy-greens",
    inStock: true,
    description: "Fresh coriander leaves for garnishing and cooking",
    detailedDescription: "Fresh, aromatic coriander leaves perfect for garnishing curries, making chutneys, and adding that distinctive flavor to your dishes. Our coriander is grown in clean, pesticide-free farms and delivered fresh to maintain its vibrant green color and intense aroma.",
    benefits: ["Aids Digestion", "Rich in Antioxidants", "Anti-inflammatory", "Freshens Breath"],
    nutrition: {
      calories: 23,
      protein: 2.1,
      carbs: 3.7,
      fiber: 2.8,
      vitamins: ["Vitamin A", "Vitamin C", "Vitamin K"]
    },
    tags: ["fresh", "aromatic", "garnish", "herbs"],
    quantityType: 'weight',
    stockQuantity: 30
  },
  {
    id: "tomato",
    name: "Fresh Tomatoes",
    hindiName: "टमाटर",
    minPrice: 30,
    maxPrice: 40,
    unit: "kg",
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh red tomatoes, perfect for cooking and salads",
    detailedDescription: "Juicy, vine-ripened tomatoes with perfect balance of sweetness and acidity. Ideal for making curries, salads, sauces, and soups. Our tomatoes are carefully selected for their firmness, color, and flavor. Rich in lycopene, an antioxidant that may help protect against heart disease and cancer.",
    benefits: ["Rich in Lycopene", "High in Vitamin C", "Good for Heart", "Cancer Prevention", "Skin Health"],
    nutrition: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fiber: 1.2,
      vitamins: ["Vitamin C", "Lycopene", "Potassium", "Folate"]
    },
    tags: ["fresh", "juicy", "vitamin-c", "antioxidant"],
    quantityType: 'weight',
    stockQuantity: 100
  },
  {
    id: "onion",
    name: "Red Onions",
    hindiName: "प्याज",
    minPrice: 25,
    maxPrice: 35,
    unit: "kg",
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh red onions, essential for Indian cooking",
    detailedDescription: "Premium quality red onions with strong flavor and excellent storage life. These onions are perfect for all types of Indian cooking - from tempering to main dishes. Known for their sharp taste and beautiful purple-red color, they add depth and flavor to any dish.",
    benefits: ["Rich in Antioxidants", "Anti-inflammatory", "Heart Healthy", "Immunity Booster"],
    nutrition: {
      calories: 40,
      protein: 1.1,
      carbs: 9.3,
      fiber: 1.7,
      vitamins: ["Vitamin C", "Folate", "Potassium"]
    },
    tags: ["essential", "flavorful", "long-lasting", "cooking-base"],
    quantityType: 'weight',
    stockQuantity: 200
  },
  {
    id: "green-chili",
    name: "Green Chilies",
    hindiName: "हरी मिर्च",
    minPrice: 80,
    maxPrice: 120,
    unit: "kg",
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh green chilies for that perfect spice",
    detailedDescription: "Fresh, crisp green chilies with the perfect amount of heat. Essential for Indian cooking, these chilies add both flavor and spice to your dishes. Rich in vitamin C and capsaicin, which has numerous health benefits including boosting metabolism and providing natural pain relief.",
    benefits: ["Boosts Metabolism", "Rich in Vitamin C", "Natural Pain Relief", "Anti-inflammatory"],
    nutrition: {
      calories: 40,
      protein: 1.9,
      carbs: 7.3,
      fiber: 1.5,
      vitamins: ["Vitamin C", "Vitamin A", "Capsaicin"]
    },
    tags: ["spicy", "vitamin-c", "metabolism", "fresh"],
    quantityType: 'weight',
    stockQuantity: 25
  },
  {
    id: "potato",
    name: "Fresh Potatoes",
    hindiName: "आलू",
    minPrice: 20,
    maxPrice: 30,
    unit: "kg",
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh potatoes, versatile vegetable for all dishes",
    detailedDescription: "Premium quality potatoes perfect for all cooking methods - boiling, frying, baking, or making curries. These potatoes have excellent texture and taste, with thin skin and creamy flesh. Rich in potassium, vitamin C, and healthy carbohydrates.",
    benefits: ["High in Potassium", "Good Carbs", "Vitamin C", "Energy Source", "Versatile"],
    nutrition: {
      calories: 77,
      protein: 2.0,
      carbs: 17.6,
      fiber: 2.1,
      vitamins: ["Vitamin C", "Potassium", "Vitamin B6"]
    },
    tags: ["versatile", "staple", "energy", "comfort-food"],
    quantityType: 'weight',
    stockQuantity: 150
  }
];

// Demo users with login credentials
export const demoUsers: User[] = [
  {
    id: "user1",
    name: "Rajesh Kumar",
    mobile: "9876543210",
    email: "rajesh@email.com",
    addresses: [
      {
        id: "addr1",
        street: "123 MG Road",
        area: "Connaught Place",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110001",
        isDefault: true
      }
    ],
    defaultAddressId: "addr1",
    joinedAt: "2024-01-15"
  },
  {
    id: "user2",
    name: "Priya Sharma",
    mobile: "9876543211",
    email: "priya@email.com",
    addresses: [
      {
        id: "addr2",
        street: "456 Brigade Road",
        area: "Commercial Street",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        isDefault: true
      }
    ],
    defaultAddressId: "addr2",
    joinedAt: "2024-02-10"
  }
];

// Demo orders with different statuses
export const demoOrders: Order[] = [
  {
    id: "order1",
    userId: "user1",
    items: [
      {
        productId: "spinach",
        quantity: 2,
        priceAtOrder: 0,
        estimatedPrice: { min: 40, max: 50 }
      },
      {
        productId: "tomato",
        quantity: 1,
        priceAtOrder: 0,
        estimatedPrice: { min: 30, max: 40 }
      }
    ],
    status: 'placed',
    deliveryDate: "2024-08-21",
    deliveryAddress: demoUsers[0].addresses[0],
    mobile: "9876543210",
    subtotal: 0,
    deliveryFee: 20,
    total: 0,
    orderDate: "2024-08-19",
    estimatedTotal: { min: 90, max: 110 }
  },
  {
    id: "order2",
    userId: "user1",
    items: [
      {
        productId: "onion",
        quantity: 3,
        priceAtOrder: 30,
        estimatedPrice: { min: 75, max: 105 }
      }
    ],
    status: 'packed',
    deliveryDate: "2024-08-20",
    deliveryAddress: demoUsers[0].addresses[0],
    mobile: "9876543210",
    subtotal: 90,
    deliveryFee: 20,
    total: 110,
    orderDate: "2024-08-18",
    actualTotal: 110
  },
  {
    id: "order3",
    userId: "user1",
    items: [
      {
        productId: "green-chili",
        quantity: 0.5,
        priceAtOrder: 100,
        estimatedPrice: { min: 40, max: 60 }
      }
    ],
    status: 'delivered',
    deliveryDate: "2024-08-17",
    deliveryAddress: demoUsers[0].addresses[0],
    mobile: "9876543210",
    subtotal: 50,
    deliveryFee: 20,
    total: 70,
    orderDate: "2024-08-15",
    actualTotal: 70
  }
];

// Demo reviews
export const demoReviews: Review[] = [
  {
    id: "review1",
    userId: "user1",
    productId: "spinach",
    orderId: "order3",
    rating: 5,
    comment: "Excellent quality spinach! Very fresh and clean. Will order again.",
    createdAt: "2024-08-18",
    userName: "Rajesh K."
  },
  {
    id: "review2",
    userId: "user2",
    productId: "tomato",
    rating: 4,
    comment: "Good quality tomatoes, perfect for making curry. Fast delivery too!",
    createdAt: "2024-08-17",
    userName: "Priya S."
  },
  {
    id: "review3",
    userId: "user1",
    productId: "onion",
    orderId: "order2",
    rating: 4,
    comment: "Fresh onions with good shelf life. Pricing is reasonable.",
    createdAt: "2024-08-16",
    userName: "Rajesh K."
  }
];

// Use demo data arrays for orders - mutable copy for order management
let orders = [...demoOrders];

// Demo login credentials
export const DEMO_CREDENTIALS = {
  mobile: "9876543210",
  password: "demo123",
  otp: "123456"
};

// Helper functions
export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 6);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return demoUsers.find(user => user.id === id);
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId).sort((a, b) => 
    new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );
};

export const getOrderById = (id: string): Order | undefined => {
  return demoOrders.find(order => order.id === id);
};

export const getReviewsByProductId = (productId: string): Review[] => {
  return demoReviews.filter(review => review.productId === productId);
};

export const getProductByName = (name: string): Product | undefined => {
  const formattedName = name.toLowerCase().replace(/-/g, ' ');
  return products.find(product => 
    product.name.toLowerCase() === formattedName ||
    product.hindiName.toLowerCase() === formattedName
  );
};

export const getRelatedProducts = (productId: string, category: string, limit: number = 4): Product[] => {
  return products
    .filter(product => product.id !== productId && product.category === category)
    .slice(0, limit);
};

export const getProductReviews = (productId: string): Review[] => {
  return demoReviews.filter(review => review.productId === productId);
};

export const createOrder = (
  userId: string, 
  cartItems: any[], 
  deliveryAddress: Address, 
  deliveryDate: string, 
  mobile: string
): Order => {
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const orderItems: OrderItem[] = cartItems.map(item => ({
    productId: item.productId,
    quantity: item.quantity,
    priceAtOrder: 0, // Will be set when order is packed
    estimatedPrice: {
      min: item.product.minPrice * item.quantity,
      max: item.product.maxPrice * item.quantity
    }
  }));

  const subtotal = orderItems.reduce((total, item) => 
    total + (item.estimatedPrice?.max || 0), 0
  );
  
  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  const newOrder: Order = {
    id: orderId,
    userId,
    items: orderItems,
    status: 'placed',
    deliveryDate,
    deliveryAddress,
    mobile,
    subtotal,
    deliveryFee,
    total,
    orderDate: new Date().toISOString(),
    estimatedTotal: {
      min: subtotal + deliveryFee,
      max: total
    }
  };

  orders.unshift(newOrder);
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: OrderStatus): void => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
  }
};

export const authenticateUser = (mobile: string, password?: string, otp?: string): User | null => {
  if (mobile === DEMO_CREDENTIALS.mobile && 
      (password === DEMO_CREDENTIALS.password || otp === DEMO_CREDENTIALS.otp)) {
    return demoUsers[0];
  }
  return null;
};
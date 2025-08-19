// Indian vegetable marketplace data
export interface Product {
  id: string;
  name: string;
  hindiName: string;
  price: number;
  unit: string;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
  benefits: string[];
}

export interface Category {
  id: string;
  name: string;
  hindiName: string;
  image: string;
  description: string;
}

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
    price: 25,
    unit: "250g",
    originalPrice: 30,
    image: "/src/assets/leafy-greens.jpg",
    category: "leafy-greens",
    inStock: true,
    description: "Fresh organic spinach leaves, rich in iron and vitamins",
    benefits: ["High in Iron", "Rich in Vitamins", "Good for Eyes"]
  },
  {
    id: "coriander",
    name: "Fresh Coriander",
    hindiName: "धनिया",
    price: 15,
    unit: "100g",
    image: "/src/assets/leafy-greens.jpg",
    category: "leafy-greens",
    inStock: true,
    description: "Fresh coriander leaves for garnishing and cooking",
    benefits: ["Aids Digestion", "Rich in Antioxidants", "Anti-inflammatory"]
  },
  {
    id: "methi",
    name: "Fenugreek Leaves",
    hindiName: "मेथी",
    price: 20,
    unit: "200g",
    originalPrice: 25,
    image: "/src/assets/leafy-greens.jpg",
    category: "leafy-greens",
    inStock: true,
    description: "Fresh methi leaves, perfect for parathas and sabzi",
    benefits: ["Controls Blood Sugar", "Rich in Fiber", "Good for Hair"]
  },
  {
    id: "mint",
    name: "Mint Leaves",
    hindiName: "पुदीना",
    price: 18,
    unit: "50g",
    image: "/src/assets/leafy-greens.jpg",
    category: "leafy-greens",
    inStock: true,
    description: "Fresh mint leaves for chutneys and drinks",
    benefits: ["Aids Digestion", "Fresh Breath", "Cooling Effect"]
  },

  // Fresh Vegetables
  {
    id: "tomato",
    name: "Fresh Tomatoes",
    hindiName: "टमाटर",
    price: 35,
    unit: "1kg",
    originalPrice: 40,
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh red tomatoes, perfect for cooking and salads",
    benefits: ["Rich in Lycopene", "High in Vitamin C", "Good for Heart"]
  },
  {
    id: "onion",
    name: "Red Onions",
    hindiName: "प्याज",
    price: 28,
    unit: "1kg",
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh red onions, essential for Indian cooking",
    benefits: ["Rich in Antioxidants", "Anti-inflammatory", "Heart Healthy"]
  },
  {
    id: "potato",
    name: "Fresh Potatoes",
    hindiName: "आलू",
    price: 22,
    unit: "1kg",
    originalPrice: 25,
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh potatoes, versatile vegetable for all dishes",
    benefits: ["High in Potassium", "Good Carbs", "Vitamin C"]
  },
  {
    id: "green-chili",
    name: "Green Chilies",
    hindiName: "हरी मिर्च",
    price: 45,
    unit: "250g",
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh green chilies for that perfect spice",
    benefits: ["Boosts Metabolism", "Rich in Vitamin C", "Natural Pain Relief"]
  },
  {
    id: "okra",
    name: "Lady Finger (Okra)",
    hindiName: "भिंडी",
    price: 55,
    unit: "500g",
    originalPrice: 60,
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh okra, great for Indian curries",
    benefits: ["High in Fiber", "Controls Blood Sugar", "Rich in Folate"]
  },
  {
    id: "eggplant",
    name: "Eggplant",
    hindiName: "बैंगन",
    price: 42,
    unit: "500g",
    image: "/src/assets/fresh-vegetables.jpg",
    category: "fresh-vegetables",
    inStock: true,
    description: "Fresh purple eggplant for baingan bharta",
    benefits: ["Rich in Antioxidants", "Heart Healthy", "Low in Calories"]
  },

  // Spices & Herbs
  {
    id: "turmeric",
    name: "Turmeric Powder",
    hindiName: "हल्दी पाउडर",
    price: 85,
    unit: "200g",
    originalPrice: 95,
    image: "/src/assets/spices-herbs.jpg",
    category: "spices-herbs",
    inStock: true,
    description: "Pure turmeric powder, the golden spice of India",
    benefits: ["Anti-inflammatory", "Immunity Booster", "Antioxidant Rich"]
  },
  {
    id: "red-chili",
    name: "Red Chili Powder",
    hindiName: "लाल मिर्च पाउडर",
    price: 120,
    unit: "200g",
    image: "/src/assets/spices-herbs.jpg",
    category: "spices-herbs",
    inStock: true,
    description: "Premium red chili powder for authentic Indian taste",
    benefits: ["Boosts Metabolism", "Rich in Vitamin A", "Pain Relief"]
  },
  {
    id: "coriander-seeds",
    name: "Coriander Seeds",
    hindiName: "धनिया बीज",
    price: 65,
    unit: "200g",
    originalPrice: 70,
    image: "/src/assets/spices-herbs.jpg",
    category: "spices-herbs",
    inStock: true,
    description: "Whole coriander seeds for tempering and grinding",
    benefits: ["Aids Digestion", "Controls Cholesterol", "Rich in Fiber"]
  },
  {
    id: "cumin-seeds",
    name: "Cumin Seeds",
    hindiName: "जीरा",
    price: 180,
    unit: "200g",
    image: "/src/assets/spices-herbs.jpg",
    category: "spices-herbs",
    inStock: true,
    description: "Premium quality cumin seeds for Indian cooking",
    benefits: ["Aids Digestion", "Iron Rich", "Boosts Immunity"]
  }
];

export const getFeaturedProducts = () => {
  return products.filter(product => product.originalPrice).slice(0, 6);
};

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};
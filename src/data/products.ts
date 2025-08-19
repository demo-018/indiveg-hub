// Re-export enhanced types
export * from '@/types';

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

// Re-export demo data
export * from '@/data/demoData';
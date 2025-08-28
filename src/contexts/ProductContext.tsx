import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  weight?: string;
  origin?: string;
  isWeeklyDeal?: boolean;
  dealEndDate?: string;
  tags: string[];
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  weeklyDealsOnly: boolean;
}

// Comprehensive product database
const allProducts: Product[] = [
  // Fruits
  {
    id: '1',
    name: 'Organic Bananas',
    price: 2.99,
    originalPrice: 3.49,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80',
    category: 'Fruits',
    description: 'Fresh organic bananas, perfect for snacking or smoothies. Rich in potassium and natural sugars.',
    rating: 4.5,
    reviewCount: 127,
    inStock: true,
    weight: 'lb',
    origin: 'Ecuador',
    isWeeklyDeal: true,
    dealEndDate: '2024-01-15',
    tags: ['organic', 'potassium', 'healthy', 'snack'],
    nutritionalInfo: {
      calories: 105,
      protein: '1.3g',
      carbs: '27g',
      fat: '0.4g'
    }
  },
  {
    id: '5',
    name: 'Avocados',
    price: 1.99,
    originalPrice: 2.49,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80',
    category: 'Fruits',
    description: 'Ripe Hass avocados, perfect for guacamole, toast, or salads.',
    rating: 4.4,
    reviewCount: 94,
    inStock: true,
    weight: 'each',
    origin: 'Mexico',
    tags: ['healthy fats', 'creamy', 'versatile'],
    nutritionalInfo: {
      calories: 234,
      protein: '2.9g',
      carbs: '12g',
      fat: '21g'
    }
  },
  {
    id: '7',
    name: 'Fresh Strawberries',
    price: 4.99,
    originalPrice: 5.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80',
    category: 'Fruits',
    description: 'Sweet, juicy strawberries perfect for desserts or eating fresh.',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    weight: 'lb',
    origin: 'California',
    isWeeklyDeal: true,
    dealEndDate: '2024-01-15',
    tags: ['sweet', 'juicy', 'vitamin c', 'antioxidants'],
    nutritionalInfo: {
      calories: 32,
      protein: '0.7g',
      carbs: '7.7g',
      fat: '0.3g'
    }
  },
  {
    id: '8',
    name: 'Organic Apples',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&q=80',
    category: 'Fruits',
    description: 'Crisp, sweet organic apples. Great for snacking or baking.',
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    weight: 'lb',
    origin: 'Washington',
    tags: ['organic', 'crisp', 'sweet', 'fiber'],
    nutritionalInfo: {
      calories: 95,
      protein: '0.5g',
      carbs: '25g',
      fat: '0.3g'
    }
  },
  // Vegetables
  {
    id: '9',
    name: 'Fresh Spinach',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=400&q=80',
    category: 'Vegetables',
    description: 'Fresh baby spinach leaves, perfect for salads and cooking.',
    rating: 4.3,
    reviewCount: 87,
    inStock: true,
    weight: 'bunch',
    origin: 'Local Farm',
    tags: ['leafy green', 'iron', 'vitamins', 'healthy'],
    nutritionalInfo: {
      calories: 23,
      protein: '2.9g',
      carbs: '3.6g',
      fat: '0.4g'
    }
  },
  {
    id: '10',
    name: 'Organic Carrots',
    price: 1.99,
    originalPrice: 2.29,
    image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=400&q=80',
    category: 'Vegetables',
    description: 'Sweet, crunchy organic carrots rich in beta-carotene.',
    rating: 4.5,
    reviewCount: 112,
    inStock: true,
    weight: 'lb',
    origin: 'California',
    isWeeklyDeal: true,
    dealEndDate: '2024-01-15',
    tags: ['organic', 'beta-carotene', 'crunchy', 'sweet'],
    nutritionalInfo: {
      calories: 41,
      protein: '0.9g',
      carbs: '10g',
      fat: '0.2g'
    }
  },
  // Seafood
  {
    id: '2',
    name: 'Fresh Salmon Fillet',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=400&q=80',
    category: 'Seafood',
    description: 'Premium Atlantic salmon fillet, sustainably sourced. High in omega-3 fatty acids.',
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    weight: 'lb',
    origin: 'Atlantic Ocean',
    tags: ['omega-3', 'protein', 'premium', 'sustainable'],
    nutritionalInfo: {
      calories: 208,
      protein: '25.4g',
      carbs: '0g',
      fat: '12.4g'
    }
  },
  {
    id: '11',
    name: 'Fresh Shrimp',
    price: 9.99,
    originalPrice: 11.99,
    image: 'https://images.unsplash.com/photo-1548587468-971ebe4c8c3b?auto=format&fit=crop&w=400&q=80',
    category: 'Seafood',
    description: 'Large, fresh shrimp perfect for grilling or cooking.',
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    weight: 'lb',
    origin: 'Gulf Coast',
    tags: ['protein', 'low-fat', 'versatile'],
    nutritionalInfo: {
      calories: 84,
      protein: '18g',
      carbs: '0.2g',
      fat: '1.4g'
    }
  },
  // Bakery
  {
    id: '3',
    name: 'Sourdough Bread',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=400&q=80',
    category: 'Bakery',
    description: 'Artisan sourdough bread, freshly baked daily. Made with natural fermentation.',
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    weight: 'loaf',
    origin: 'Local Bakery',
    tags: ['artisan', 'fresh', 'fermented', 'crusty'],
  },
  {
    id: '12',
    name: 'Croissants',
    price: 6.99,
    originalPrice: 7.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
    category: 'Bakery',
    description: 'Buttery, flaky croissants baked fresh daily.',
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    weight: '6 pack',
    origin: 'Local Bakery',
    isWeeklyDeal: true,
    dealEndDate: '2024-01-15',
    tags: ['buttery', 'flaky', 'fresh', 'french'],
  },
  // Dairy
  {
    id: '4',
    name: 'Organic Milk',
    price: 3.79,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    category: 'Dairy',
    description: 'Fresh organic whole milk from grass-fed cows. Rich and creamy taste.',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    weight: 'gallon',
    origin: 'Local Farm',
    tags: ['organic', 'grass-fed', 'creamy', 'calcium'],
    nutritionalInfo: {
      calories: 150,
      protein: '8g',
      carbs: '12g',
      fat: '8g'
    }
  },
  {
    id: '6',
    name: 'Free Range Eggs',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=400&q=80',
    category: 'Dairy',
    description: 'Farm fresh free-range eggs from happy hens. Rich in protein and nutrients.',
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    weight: 'dozen',
    origin: 'Local Farm',
    tags: ['free-range', 'protein', 'fresh', 'farm'],
    nutritionalInfo: {
      calories: 70,
      protein: '6g',
      carbs: '0.4g',
      fat: '5g'
    }
  },
  {
    id: '13',
    name: 'Greek Yogurt',
    price: 4.99,
    originalPrice: 5.99,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
    category: 'Dairy',
    description: 'Thick, creamy Greek yogurt packed with protein and probiotics.',
    rating: 4.7,
    reviewCount: 234,
    inStock: true,
    weight: '32oz',
    origin: 'Greece',
    tags: ['protein', 'probiotics', 'thick', 'creamy'],
    nutritionalInfo: {
      calories: 100,
      protein: '17g',
      carbs: '6g',
      fat: '0g'
    }
  },
  // Meat
  {
    id: '14',
    name: 'Grass-Fed Beef',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=400&q=80',
    category: 'Meat',
    description: 'Premium grass-fed beef steaks, tender and flavorful.',
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    weight: 'lb',
    origin: 'Local Ranch',
    tags: ['grass-fed', 'premium', 'tender', 'protein'],
    nutritionalInfo: {
      calories: 250,
      protein: '26g',
      carbs: '0g',
      fat: '15g'
    }
  },
  {
    id: '15',
    name: 'Organic Chicken Breast',
    price: 8.99,
    originalPrice: 9.99,
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=400&q=80',
    category: 'Meat',
    description: 'Lean organic chicken breast, perfect for healthy meals.',
    rating: 4.5,
    reviewCount: 123,
    inStock: true,
    weight: 'lb',
    origin: 'Local Farm',
    isWeeklyDeal: true,
    dealEndDate: '2024-01-15',
    tags: ['organic', 'lean', 'protein', 'healthy'],
    nutritionalInfo: {
      calories: 165,
      protein: '31g',
      carbs: '0g',
      fat: '3.6g'
    }
  }
];

interface ProductContextType {
  allProducts: Product[];
  searchProducts: (filters: Partial<SearchFilters>) => Product[];
  getProductsByCategory: (category: string) => Product[];
  getWeeklyDeals: () => Product[];
  getFeaturedProducts: () => Product[];
  categories: string[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
    return uniqueCategories.sort();
  }, []);

  const searchProducts = (filters: Partial<SearchFilters>): Product[] => {
    return allProducts.filter(product => {
      // Query search
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesQuery = 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      // Category filter
      if (filters.category && filters.category !== 'All') {
        if (product.category !== filters.category) return false;
      }

      // Price range filter
      if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;

      // Rating filter
      if (filters.minRating !== undefined && product.rating < filters.minRating) return false;

      // Stock filter
      if (filters.inStockOnly && !product.inStock) return false;

      // Sale filter
      if (filters.onSaleOnly && !product.originalPrice) return false;

      // Weekly deals filter
      if (filters.weeklyDealsOnly && !product.isWeeklyDeal) return false;

      return true;
    });
  };

  const getProductsByCategory = (category: string): Product[] => {
    return allProducts.filter(product => product.category === category);
  };

  const getWeeklyDeals = (): Product[] => {
    return allProducts.filter(product => product.isWeeklyDeal);
  };

  const getFeaturedProducts = (): Product[] => {
    return allProducts.slice(0, 6); // First 6 products as featured
  };

  return (
    <ProductContext.Provider value={{
      allProducts,
      searchProducts,
      getProductsByCategory,
      getWeeklyDeals,
      getFeaturedProducts,
      categories
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
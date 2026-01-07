export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

/**
 * HELPER FUNCTION: getCategories
 * Use this in your Shop.tsx to get real-time counts from your API data
 */
export const getCategories = (products: Product[]) => {
  // 1. Initialize with "All" and its count
  const counts = products.reduce((acc: Record<string, number>, product) => {
    const cat = product.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // 2. Format it into the array the UI expects
  const categoryList = Object.entries(counts).map(([name, count]) => ({
    name,
    count
  }));

  // 3. Always include "All" at the top with total count
  return [
    { name: 'All', count: products.length },
    ...categoryList
  ];
};

// These are your fallback/local products
export const products: Product[] = [
  {
    id: "1",
    name: "Classic Oxford Leather eman",
    price: 189,
    originalPrice: 229,
    image: "/highheel.jpg",
    images: [
      "/highheel.jpg",
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    ],
    category: "Formal",
    brand: "Shoes Wear",
    colors: ["Black", "Brown", "Tan"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.8,
    reviews: 124,
    description: "Handcrafted from premium Italian leather, these classic Oxford shoes combine timeless elegance with modern comfort.",
    features: ["Genuine Italian Leather", "Cushioned Insole", "Anti-slip Sole"],
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Urban Runner Pro",
    price: 159,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop"],
    category: "Sports",
    brand: "Shoes Wear",
    colors: ["Red", "Black", "White"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    rating: 4.9,
    reviews: 287,
    description: "Engineered for performance, the Urban Runner Pro features responsive cushioning.",
    features: ["Responsive Cushioning", "Breathable Mesh"],
    isBestSeller: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Elegant Stiletto Heels",
    price: 145,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop"],
    category: "Heels",
    brand: "Shoes Wear",
    colors: ["Black", "Red", "Nude"],
    sizes: ["5", "6", "7", "8", "9"],
    rating: 4.7,
    reviews: 98,
    description: "Make a statement with these stunning stiletto heels.",
    features: ["Premium Material", "4-inch Heel"],
    isNew: true,
  },
  {
    id: "4",
    name: "Casual Canvas Sneakers",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop"],
    category: "Casual",
    brand: "Shoes Wear",
    colors: ["White", "Navy", "Gray"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    rating: 4.6,
    reviews: 203,
    description: "Versatile and comfortable canvas sneakers.",
    features: ["Canvas Upper", "Easy to Clean"],
  },
  {
    id: "5",
    name: "Hiking Trail Master",
    price: 219,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop"],
    category: "Outdoor",
    brand: "Shoes Wear",
    colors: ["Brown", "Green", "Black"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    rating: 4.9,
    reviews: 156,
    description: "Conquer any trail with these rugged hiking boots.",
    features: ["Waterproof", "Vibram Sole"],
    isBestSeller: true,
  },
  {
    id: "6",
    name: "Minimalist Loafers",
    price: 129,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=800&fit=crop"],
    category: "Casual",
    brand: "Shoes Wear",
    colors: ["Tan", "Black", "Navy"],
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.5,
    reviews: 89,
    description: "Effortless style meets comfort.",
    features: ["Suede Upper", "Flexible Sole"],
  },
  {
    id: "7",
    name: "Chunky Platform Boots",
    price: 175,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=800&fit=crop"],
    category: "Boots",
    brand: "Shoes Wear",
    colors: ["Black", "White"],
    sizes: ["5", "6", "7", "8", "9", "10"],
    rating: 4.7,
    reviews: 134,
    description: "Bold and edgy platform boots.",
    features: ["Platform Sole", "Side Zipper"],
    isNew: true,
  },
  {
    id: "8",
    name: "Ballet Flats Elegance",
    price: 89,
    image: "https://images.unsplash.com/photo-1590099033615-be195f8d575c?w=600&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1590099033615-be195f8d575c?w=800&h=800&fit=crop"],
    category: "Flats",
    brand: "Shoes Wear",
    colors: ["Black", "Pink", "Beige"],
    sizes: ["5", "6", "7", "8", "9"],
    rating: 4.6,
    reviews: 167,
    description: "Classic ballet flats with a modern twist.",
    features: ["Soft Lining", "Cushioned Insole"],
  },
];

// This is just a static export for the Home page or initial load
export const categories = getCategories(products);

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Fashion Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "The quality of Shoes Wear is exceptional. The comfort is unmatched!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marathon Runner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content: "The Urban Runner Pro exceeded all my expectations.",
    rating: 5,
  },
];
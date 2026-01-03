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

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Oxford Leather",
    price: 189,
    originalPrice: 229,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    ],
    category: "Formal",
    brand: "Shoes Wear",
    colors: ["Black", "Brown", "Tan"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    rating: 4.8,
    reviews: 124,
    description: "Handcrafted from premium Italian leather, these classic Oxford shoes combine timeless elegance with modern comfort. Perfect for formal occasions and business settings.",
    features: ["Genuine Italian Leather", "Cushioned Insole", "Anti-slip Sole", "Hand-stitched Details"],
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Urban Runner Pro",
    price: 159,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    ],
    category: "Sports",
    brand: "Shoes Wear",
    colors: ["Red", "Black", "White"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    rating: 4.9,
    reviews: 287,
    description: "Engineered for performance, the Urban Runner Pro features responsive cushioning and breathable mesh upper for ultimate comfort during your runs.",
    features: ["Responsive Cushioning", "Breathable Mesh", "Lightweight Design", "Durable Outsole"],
    isBestSeller: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Elegant Stiletto Heels",
    price: 145,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&h=800&fit=crop",
    ],
    category: "Heels",
    brand: "Shoes Wear",
    colors: ["Black", "Red", "Nude"],
    sizes: ["5", "6", "7", "8", "9"],
    rating: 4.7,
    reviews: 98,
    description: "Make a statement with these stunning stiletto heels. Crafted with attention to detail, they offer both style and comfort for your special occasions.",
    features: ["Premium Material", "Padded Footbed", "4-inch Heel", "Elegant Finish"],
    isNew: true,
  },
  {
    id: "4",
    name: "Casual Canvas Sneakers",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
    ],
    category: "Casual",
    brand: "Shoes Wear",
    colors: ["White", "Navy", "Gray"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    rating: 4.6,
    reviews: 203,
    description: "Versatile and comfortable, these canvas sneakers are perfect for everyday wear. The classic design pairs well with any casual outfit.",
    features: ["Canvas Upper", "Rubber Sole", "Classic Design", "Easy to Clean"],
  },
  {
    id: "5",
    name: "Hiking Trail Master",
    price: 219,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop",
    ],
    category: "Outdoor",
    brand: "Shoes Wear",
    colors: ["Brown", "Green", "Black"],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    rating: 4.9,
    reviews: 156,
    description: "Conquer any trail with these rugged hiking boots. Waterproof, durable, and designed for maximum traction on challenging terrain.",
    features: ["Waterproof", "Vibram Sole", "Ankle Support", "All-terrain Grip"],
    isBestSeller: true,
  },
  {
    id: "6",
    name: "Minimalist Loafers",
    price: 129,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=800&fit=crop",
    ],
    category: "Casual",
    brand: "Shoes Wear",
    colors: ["Tan", "Black", "Navy"],
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.5,
    reviews: 89,
    description: "Effortless style meets comfort in these minimalist loafers. Made from soft suede with a flexible sole for all-day wear.",
    features: ["Suede Upper", "Flexible Sole", "Slip-on Design", "Premium Comfort"],
  },
  {
    id: "7",
    name: "Chunky Platform Boots",
    price: 175,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=800&fit=crop",
    ],
    category: "Boots",
    brand: "Shoes Wear",
    colors: ["Black", "White"],
    sizes: ["5", "6", "7", "8", "9", "10"],
    rating: 4.7,
    reviews: 134,
    description: "Bold and edgy, these platform boots add height and attitude to any outfit. Features a chunky sole and side zipper for easy wear.",
    features: ["Platform Sole", "Side Zipper", "Faux Leather", "Treaded Outsole"],
    isNew: true,
  },
  {
    id: "8",
    name: "Ballet Flats Elegance",
    price: 89,
    image: "https://images.unsplash.com/photo-1590099033615-be195f8d575c?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590099033615-be195f8d575c?w=800&h=800&fit=crop",
    ],
    category: "Flats",
    brand: "Shoes Wear",
    colors: ["Black", "Pink", "Beige"],
    sizes: ["5", "6", "7", "8", "9"],
    rating: 4.6,
    reviews: 167,
    description: "Classic ballet flats with a modern twist. Super comfortable and versatile, perfect for work or weekend outings.",
    features: ["Soft Lining", "Cushioned Insole", "Bow Detail", "Flexible Fit"],
  },
];

export const categories = [
  { name: "All", count: products.length },
  { name: "Formal", count: products.filter(p => p.category === "Formal").length },
  { name: "Sports", count: products.filter(p => p.category === "Sports").length },
  { name: "Casual", count: products.filter(p => p.category === "Casual").length },
  { name: "Heels", count: products.filter(p => p.category === "Heels").length },
  { name: "Boots", count: products.filter(p => p.category === "Boots").length },
  { name: "Flats", count: products.filter(p => p.category === "Flats").length },
  { name: "Outdoor", count: products.filter(p => p.category === "Outdoor").length },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Fashion Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "The quality of Shoes Wear is exceptional. My Oxford Leathers have become my go-to for every formal event. The comfort is unmatched!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marathon Runner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content: "As a professional runner, I need shoes that perform. The Urban Runner Pro exceeded all my expectations. Best running shoes I've ever owned.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content: "I appreciate brands that combine style with substance. Shoes Wear delivers on both. Their attention to detail is remarkable.",
    rating: 5,
  },
];

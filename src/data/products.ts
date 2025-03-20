
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'clothing' | 'poster' | 'phonecase';
  images: string[];
  featured?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  customizable?: boolean;
  options?: {
    sizes?: string[];
    colors?: string[];
    styles?: string[];
  };
  details?: string[]; // Added the missing details property
}

export const products: Product[] = [
  {
    id: "cl-001",
    name: "MAFIA Classic Tee",
    price: 29.99,
    description: "Our signature MERCH MAFIA t-shirt featuring the iconic chess piece logo. Made from premium cotton for ultimate comfort and style.",
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000"
    ],
    featured: true,
    bestSeller: true,
    options: {
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Gold"],
    }
  },
  {
    id: "cl-002",
    name: "Chess Knight Hoodie",
    price: 59.99,
    description: "Stay warm and stylish with our premium chess knight hoodie. Features embroidered logo and ultra-soft interior.",
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
      "https://images.unsplash.com/photo-1565693413579-8a400532b773?q=80&w=1000"
    ],
    bestSeller: true,
    options: {
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Gray"],
    }
  },
  {
    id: "cl-003",
    name: "MAFIA Cap",
    price: 24.99,
    description: "Top off your look with our signature cap featuring the embroidered MERCH MAFIA logo.",
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000"
    ],
    options: {
      colors: ["Black", "Gold"],
    }
  },
  {
    id: "cl-004",
    name: "MAFIA Varsity Jacket",
    price: 89.99,
    description: "Premium varsity jacket with our signature chess piece embroidery. Limited edition release.",
    category: "clothing",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000"
    ],
    new: true,
    options: {
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black/Gold"],
    }
  },
  {
    id: "ps-001",
    name: "Chess Strategy Poster",
    price: 19.99,
    description: "Limited edition art print featuring classic chess strategies in our signature style.",
    category: "poster",
    images: [
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1000",
      "https://images.unsplash.com/photo-1614294267615-a69e14ff7075?q=80&w=1000"
    ],
    bestSeller: true,
    customizable: true,
    options: {
      sizes: ["12×18", "18×24", "24×36"],
    }
  },
  {
    id: "ps-002",
    name: "MAFIA Logo Poster",
    price: 24.99,
    description: "Our signature logo in a high-quality print, perfect for showing your MAFIA allegiance.",
    category: "poster",
    images: [
      "https://images.unsplash.com/photo-1601599561213-832382d2f262?q=80&w=1000",
      "https://images.unsplash.com/photo-1622396481608-de991f7727af?q=80&w=1000"
    ],
    featured: true,
    customizable: true,
    options: {
      sizes: ["12×18", "18×24", "24×36"],
    }
  },
  {
    id: "ps-003",
    name: "Custom Design Poster",
    price: 29.99,
    description: "Upload your own design or artwork for a custom MAFIA-style poster.",
    category: "poster",
    images: [
      "https://images.unsplash.com/photo-1578911373434-0cb395d2fe4d?q=80&w=1000",
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?q=80&w=1000"
    ],
    customizable: true,
    options: {
      sizes: ["12×18", "18×24", "24×36"],
    }
  },
  {
    id: "ph-001",
    name: "MAFIA Chess Phone Case",
    price: 24.99,
    description: "Premium protective phone case featuring our signature chess knight design.",
    category: "phonecase",
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000"
    ],
    featured: true,
    bestSeller: true,
    customizable: true,
    options: {
      styles: ["iPhone 13", "iPhone 14", "iPhone 15", "Samsung S22", "Samsung S23", "Google Pixel 7"],
    }
  },
  {
    id: "ph-002",
    name: "Custom Design Phone Case",
    price: 29.99,
    description: "Upload your own design for a custom phone case with the MAFIA quality guarantee.",
    category: "phonecase",
    images: [
      "https://images.unsplash.com/photo-1541735363-54a8c6dd824c?q=80&w=1000",
      "https://images.unsplash.com/photo-1533938225926-b91aa8bf5204?q=80&w=1000"
    ],
    new: true,
    customizable: true,
    options: {
      styles: ["iPhone 13", "iPhone 14", "iPhone 15", "Samsung S22", "Samsung S23", "Google Pixel 7"],
    }
  },
];

export const getFeaturedProducts = () => products.filter(product => product.featured);
export const getBestSellerProducts = () => products.filter(product => product.bestSeller);
export const getNewProducts = () => products.filter(product => product.new);
export const getProductsByCategory = (category: string) => 
  products.filter(product => product.category === category);
export const getProductById = (id: string) => 
  products.find(product => product.id === id);

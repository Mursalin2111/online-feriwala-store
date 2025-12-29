import { Product } from '@/context/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: "Handwoven Basket",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=400&h=400&fit=crop",
    category: "Crafts",
    description: "Beautiful handwoven basket made with natural materials"
  },
  {
    id: 2,
    name: "Organic Honey Jar",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
    category: "Food",
    description: "Pure organic honey from local beekeepers"
  },
  {
    id: 3,
    name: "Artisan Ceramic Vase",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop",
    category: "Crafts",
    description: "Handcrafted ceramic vase with unique patterns"
  },
  {
    id: 4,
    name: "Spice Collection Box",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
    category: "Food",
    description: "Curated collection of exotic spices"
  },
  {
    id: 5,
    name: "Leather Satchel Bag",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "Fashion",
    description: "Genuine leather handmade satchel bag"
  },
  {
    id: 6,
    name: "Embroidered Scarf",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=400&h=400&fit=crop",
    category: "Fashion",
    description: "Hand-embroidered silk scarf with traditional patterns"
  },
  {
    id: 7,
    name: "Fresh Olive Oil",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    category: "Food",
    description: "Extra virgin olive oil from Mediterranean farms"
  },
  {
    id: 8,
    name: "Wooden Chess Set",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400&h=400&fit=crop",
    category: "Crafts",
    description: "Hand-carved wooden chess set with storage box"
  }
];

export const categories = ["All", "Food", "Crafts", "Fashion"];

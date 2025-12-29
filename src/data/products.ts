import { Product } from '@/context/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: "Handwoven Basket",
    price: 450,
    image: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=400&h=400&fit=crop",
    category: "Crafts",
    description: "This beautiful handwoven basket is crafted by skilled artisans using 100% natural materials including jute, cane, and bamboo. Perfect for home decor, storage, or as a unique gift. Each piece is one-of-a-kind with slight variations that make it truly special. Dimensions: 12\" x 10\" x 8\". Eco-friendly and sustainably sourced."
  },
  {
    id: 2,
    name: "Organic Honey Jar",
    price: 350,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
    category: "Food",
    description: "Pure, raw organic honey collected from the Sundarbans region of Bangladesh. This golden nectar is unprocessed and unpasteurized, retaining all its natural enzymes, vitamins, and antioxidants. Great for immunity boosting, natural sweetening, and traditional remedies. Weight: 500g. No added preservatives or artificial colors."
  },
  {
    id: 3,
    name: "Artisan Ceramic Vase",
    price: 650,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop",
    category: "Crafts",
    description: "A stunning handcrafted ceramic vase featuring traditional Bengali motifs and patterns. Each vase is individually wheel-thrown and hand-painted by master potters. The elegant design makes it perfect for fresh flowers or as a standalone decorative piece. Height: 14\", glazed finish, dishwasher safe."
  },
  {
    id: 4,
    name: "Spice Collection Box",
    price: 299,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
    category: "Food",
    description: "A premium collection of 8 essential Bengali spices in a beautiful wooden gift box. Includes: turmeric, cumin, coriander, red chili, garam masala, mustard seeds, fenugreek, and bay leaves. All spices are freshly ground and sourced directly from local farmers. Perfect for authentic Bangladeshi cooking. Net weight: 400g total."
  },
  {
    id: 5,
    name: "Leather Satchel Bag",
    price: 1200,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    category: "Fashion",
    description: "Handcrafted genuine leather satchel bag made by skilled leather artisans. Features include: vintage brass buckles, adjustable shoulder strap, multiple interior pockets, and laptop compartment (fits up to 13\"). Made from premium full-grain leather that develops a beautiful patina over time. Dimensions: 15\" x 11\" x 4\"."
  },
  {
    id: 6,
    name: "Embroidered Scarf",
    price: 550,
    image: "https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=400&h=400&fit=crop",
    category: "Fashion",
    description: "Luxurious hand-embroidered silk scarf featuring traditional nakshi kantha patterns passed down through generations. Each scarf takes 15-20 hours to complete. Made from 100% pure silk with intricate floral and geometric designs. Size: 72\" x 24\". Available in multiple colors. A perfect accessory for any occasion."
  },
  {
    id: 7,
    name: "Fresh Olive Oil",
    price: 480,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    category: "Food",
    description: "Premium extra virgin olive oil imported from Mediterranean farms. Cold-pressed from handpicked olives within 24 hours of harvest to preserve maximum flavor and nutrients. Rich in antioxidants and healthy monounsaturated fats. Ideal for salad dressings, cooking, and dipping. Volume: 500ml. Acidity level: less than 0.3%."
  },
  {
    id: 8,
    name: "Wooden Chess Set",
    price: 850,
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=400&h=400&fit=crop",
    category: "Crafts",
    description: "Exquisite hand-carved wooden chess set made from premium rosewood and maple. Features 32 Staunton-style pieces with felt bases and a folding board that doubles as storage. Perfect for beginners and professionals alike. Board size: 15\" x 15\", King height: 3.5\". Comes with a velvet-lined interior and makes an excellent gift."
  }
];

export const categories = ["All", "Food", "Crafts", "Fashion"];

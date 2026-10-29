// Dummy data used across the app.
export const DEMO_OTP = "123456";

const img = (id, w = 600) => `https://images.unsplash.com/${id}?w=${w}&q=70`;

export const products = [
  {
    id: "pizza",
    name: "Pepperoni Pizza",
    price: 14,
    emoji: "🍕",
    src: img("photo-1513104890138-7c749659a591", 800),
    description:
      "Hand-stretched dough, rich tomato sauce, mozzarella and crispy pepperoni baked in a stone oven.",
  },
  {
    id: "sushi",
    name: "Salmon Sushi",
    price: 103,
    emoji: "🍣",
    src: img("photo-1579871494447-9811cf80d66c", 800),
    description: "Fresh salmon nigiri and rolls served with soy sauce, wasabi and pickled ginger.",
  },
  {
    id: "noodles",
    name: "Veg Noodles",
    price: 50,
    emoji: "🍜",
    src: img("photo-1569718212165-3a8278d5f624", 800),
    description: "Wok-tossed noodles with crunchy vegetables and a light garlic-soy glaze.",
  },
  {
    id: "salad",
    name: "Green Salad",
    price: 13,
    emoji: "🥗",
    src: img("photo-1512621776951-a57141f2eefd", 800),
    description: "Crisp seasonal greens, cherry tomatoes, cucumber and a lemon vinaigrette.",
  },
  {
    id: "cupcake",
    name: "Berry Cupcake",
    price: 8,
    emoji: "🧁",
    src: img("photo-1488477181946-6428a0291777", 800),
    description: "Soft vanilla sponge topped with whipped cream frosting and fresh berries.",
  },
  {
    id: "shake",
    name: "Strawberry Shake",
    price: 20,
    emoji: "🍓",
    src: img("photo-1572490122747-3968b75cc699", 800),
    description: "Thick, creamy shake blended with real strawberries and vanilla ice cream.",
  },
  {
    id: "burger",
    name: "Chicken Burger",
    price: 20,
    emoji: "🍔",
    src: img("photo-1568901346375-23c9450c58cd", 800),
    description: "Juicy grilled chicken patty, lettuce, cheese and house sauce in a toasted bun.",
  },
];

export const getProduct = (id) => products.find((p) => p.id === id);

export const bestSellerIds = ["sushi", "noodles", "salad", "cupcake"];

export const popularOrders = [
  { productId: "shake", date: "29 Nov, 01:20 pm", items: "2 items" },
  { productId: "burger", date: "17 Oct, 01:20 pm", items: "1 item" },
];

export const portions = [
  { label: "Personal (4 Slides)", extra: 0 },
  { label: "Medium (8 Slides)", extra: 3 },
  { label: "Familiar (10 Slides)", extra: 6 },
  { label: "Jumbo (12 Slides)", extra: 10 },
];

import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../lib/db";
import Product from "../models/product";
import mongoose from "mongoose";

const sampleCategories = [
  "Electronics",
  "Accessories",
  "Home & Kitchen",
  "Books",
  "Toys",
  "Fashion",
  "Health & Beauty",
  "Sports",
];

const sampleProductNames = [
  "Wireless Headphones",
  "Laptop Stand",
  "Bluetooth Speaker",
  "Smartphone Case",
  "Portable Charger",
  "Fitness Tracker",
  "Gaming Mouse",
  "LED Desk Lamp",
  "Smartwatch",
  "Air Purifier",
  "Coffee Maker",
  "Electric Toothbrush",
  "Vacuum Cleaner",
  "Gaming Chair",
  "Camera Tripod",
  "Earbuds",
  "Electric Kettle",
  "Smart Bulb",
  "Streaming Stick",
  "Kitchen Blender",
  "Projector",
  "Headphone Stand",
  "Keyboard",
  "Mouse Pad",
  "Monitor Stand",
  "Microwave Oven",
  "Electric Grill",
  "Cordless Drill",
  "Digital Scale",
  "Smart Door Lock",
  "Hair Dryer",
];

const sampleDescriptions = [
  "Premium noise-cancelling headphones",
  "Ergonomic aluminum stand",
  "High-quality portable bluetooth speaker",
  "Stylish and protective smartphone case",
  "Ultra-fast portable charger for on-the-go",
  "Wearable fitness tracker with heart rate monitor",
  "Ergonomic gaming mouse with customizable buttons",
  "Adjustable LED desk lamp with touch controls",
  "Sleek smartwatch with fitness tracking features",
  "Advanced air purifier with HEPA filter",
  "Fast-brewing coffee maker with programmable settings",
  "Advanced electric toothbrush with smart features",
  "High-power vacuum cleaner for home use",
  "Comfortable gaming chair with adjustable arms",
  "Sturdy camera tripod for stable shots",
  "Compact wireless earbuds with noise cancellation",
  "Convenient electric kettle with quick boil function",
  "Smart Wi-Fi enabled LED bulbs for home automation",
  "Compact streaming stick for easy TV streaming",
  "High-speed kitchen blender for smoothies and shakes",
  "Portable projector for on-the-go entertainment",
  "Durable headphone stand with cable management",
  "Mechanical keyboard with RGB lighting",
  "High-precision mouse pad for gamers",
  "Adjustable monitor stand with ergonomic design",
  "Compact microwave oven for quick meals",
  "Smokeless electric grill for indoor cooking",
  "Cordless drill with multiple speed settings",
  "Accurate digital scale for precise weight measurement",
  "Smart lock system for home security",
  "Fast-drying hair dryer with ionic technology",
];

function generateUniqueProduct() {
  const randomCategory =
    sampleCategories[Math.floor(Math.random() * sampleCategories.length)];
  const randomName =
    sampleProductNames[Math.floor(Math.random() * sampleProductNames.length)];
  const randomDescription =
    sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
  const randomPrice = parseFloat((Math.random() * (500 - 5) + 5).toFixed(2)); // Random price between $5 and $500
  const randomInventory = Math.floor(Math.random() * 100); // Random inventory count between 0 and 100
  const slug = randomName.toLowerCase().replace(/\s+/g, "-");

  return {
    id: crypto.randomUUID(),
    name: randomName,
    slug: slug,
    description: randomDescription,
    price: randomPrice,
    category: randomCategory,
    inventory: randomInventory,
  };
}

async function seed() {
  await connectDB();

  const products = [];
  const seenNames = new Set();

  // Generate 30 unique products
  while (products.length < 30) {
    const product = generateUniqueProduct();
    if (!seenNames.has(product.name)) {
      products.push(product);
      seenNames.add(product.name);
    }
  }

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} unique products`);

  await mongoose.disconnect();
}

seed().catch(console.error);

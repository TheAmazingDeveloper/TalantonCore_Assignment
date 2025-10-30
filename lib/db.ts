import mongoose from "mongoose";

let connection: typeof mongoose | null = null;

export async function connectDB() {
  // Reuse existing connection
  if (connection) return connection;

  if (!process.env.MONGODB_URI) {
    throw new Error("Add MONGODB_URI to .env");
  }

  // Connect & cache
  connection = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "ecommerce",
  });

  console.log("MongoDB connected");
  return connection;
}

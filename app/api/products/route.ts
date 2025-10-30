import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ name: 1 });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;
  const key = req.headers.get("x-admin-key");
  if (key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectDB();
  const product = await Product.create(body);
  return NextResponse.json(product);
}

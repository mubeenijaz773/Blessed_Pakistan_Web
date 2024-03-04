
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch products from the database
    const products = await Product.find().lean();

    // If no products found, return 404 Not Found
    if (!products || products.length === 0) {
      return NextResponse.json("No products found", { status: 404 });
    }

    // Return products with status 200 OK
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error fetching products:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

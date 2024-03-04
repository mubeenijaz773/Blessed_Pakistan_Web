

import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryParameters = url.searchParams;

    // Extract query parameters for filtering
    const purpose = queryParameters.get("purpose");
    const city = queryParameters.get("city");
    const subType = queryParameters.get("subType");
    const location = queryParameters.get("location");

    const conditions: any = {}; // Initialize filter conditions object

    if (purpose) {
      conditions.purpose = {
        $regex: new RegExp(purpose, "i"), // Perform a case-insensitive search
      };
    }

    if (city) {
      conditions.city = {
        $regex: new RegExp(city, "i"), // Perform a case-insensitive search
      };
    }

    if (subType) {
      conditions.subType = {
        $regex: new RegExp(subType, "i"), // Perform a case-insensitive search
      };
    }

    if (location) {
      conditions.location = {
        $regex: new RegExp(location, "i"), // Perform a case-insensitive search
      };
    }

    // Use the conditions object to find matching products
    const filteredProducts = await Product.find(conditions).lean();

    // If no products found, return 404 Not Found
    if (!filteredProducts || filteredProducts.length === 0) {
      return NextResponse.json("No products found", { status: 404 });
    }

    // Return filtered products with status 200 OK
    return NextResponse.json({ filteredProducts }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error fetching products:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

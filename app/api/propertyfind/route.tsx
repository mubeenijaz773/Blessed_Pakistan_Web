
import Product from "@/models/product";
import connectDB from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const queryParameters = url.searchParams;

    // Extract query parameters for filtering
    const purpose = queryParameters.get("purpose");
    const propertyType = queryParameters.get("propertyType");
    const subType = queryParameters.get("subType");
    const Area_size = queryParameters.get("Area_size");

    const conditions: any = {}; // Initialize filter conditions object

    // Check if purpose is provided and add it to conditions
    if (purpose) {
      conditions.purpose = purpose;
    }

    // Check if propertyType is provided and add it to conditions
    if (propertyType) {
      conditions.propertyType = propertyType;
    }

    // Check if subType is provided and add it to conditions
    if (subType) {
      conditions.subType = subType;
    }

    // Check if Area_size is provided and add it to conditions
    if (Area_size) {
      conditions.Area_size = {
        $regex: new RegExp(Area_size, "i"), // Perform a case-insensitive search
      };
    }

    await connectDB();
    // Use the conditions object to find matching products
    const filteredProducts = await Product.find(conditions).lean();

    // If no products found, return 404 Not Found
    if (!filteredProducts || filteredProducts.length === 0) {
      return NextResponse.json({filteredProducts : []}, { status: 404 });
    }

    // Return filtered products with status 200 OK
    return NextResponse.json({ filteredProducts }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error fetching products:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

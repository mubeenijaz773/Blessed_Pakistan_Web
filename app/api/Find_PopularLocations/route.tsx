
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
  

    const url = new URL(request.url);
    const queryParameters = url.searchParams;

    // Extract query parameters for filtering
    const purpose = queryParameters.get("purpose");
    const city = queryParameters.get("city")
    const subType = queryParameters.get("subType");
    const location = queryParameters.get("location");
    

    const conditions:any = {}; // Initialize filter conditions object

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

    // Area Size

    if (location) {
      conditions.location = {
        $regex: new RegExp(location, "i"), // Perform a case-insensitive search
      };
    }

    // Use the conditions object to find matching products
    const filteredProducts = await Product.find(conditions).lean();

    return NextResponse.json({ filteredProducts }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    // return NextResponse.json({ filteredProducts }, { status: 200 });
    // return NextResponse.error("Internal Server Error", { status: 500 });
  }
}

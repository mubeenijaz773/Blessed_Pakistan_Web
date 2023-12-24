import connectDB from "../../utils/dbconnect";
import Product from "../../models/product";
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
    

    const conditions = {}; // Initialize filter conditions object

    // if (propertyType) {
    //   conditions.propertyType = {
    //     $regex: new RegExp(propertyType, "i"), // Perform a case-insensitive search
    //   };
    // }

    // if (subType) {
    //   conditions.subType = {
    //     $regex: new RegExp(subType, "i"), // Perform a case-insensitive search
    //   };
    // }

    if (purpose) {
      conditions.purpose = purpose;
    }


    if (propertyType) {
      conditions.propertyType = propertyType;
    }

    if (subType) {
      conditions.subType = subType;
    }


    // Area Size

    if (Area_size) {
      conditions.Area_size = {
        $regex: new RegExp(Area_size, "i"), // Perform a case-insensitive search
      };
    }

    // Use the conditions object to find matching products
    const filteredProducts = await Product.find(conditions).lean();

    return NextResponse.json({ filteredProducts }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}

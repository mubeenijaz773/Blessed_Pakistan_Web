
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";




// Property Filters


export async function GET(request: NextRequest) {
  try {
    console.log('working Filters')
    const url = new URL(request.url);
    const queryParameters = url.searchParams;

    // Extract query parameters for filtering
    const city = queryParameters.get("city");
    let locationParam = queryParameters.get("location");
    const propertyType = queryParameters.get("propertyType");
    const subType = queryParameters.get("subType");
    const minPrice = queryParameters.get("minPrice");
    const maxPrice = queryParameters.get("maxPrice");
    const minAreaSize = queryParameters.get("minAreaSize");
    const maxAreaSize = queryParameters.get("maxAreaSize");
    const bedrooms = queryParameters.get("bedrooms");

    // Create a filter object for MongoDB
    const filter:any = {};


   // Add city filter if city is not empty or undefined
   if (city !== null && city !== undefined && city !== '') {
    filter['city'] = city;
  }

  // Add location filter (case-insensitive and partial match)
  if (locationParam !== null && locationParam !== undefined && locationParam !== '') {
    // Convert locationParam to a case-insensitive regular expression
    const location = new RegExp(locationParam, 'i');
    filter.location = { $regex: location };
  }

  // Add propertyType filter if propertyType is not empty or undefined
  if (propertyType !== null && propertyType !== undefined && propertyType !== '') {
    filter.propertyType = propertyType;
  }

  // Add subType filter if subType is not empty or undefined
  if (subType !== null && subType !== undefined && subType !== '') {
    filter.subType = subType;
  }

  // Add price range filter if both minPrice and maxPrice are not empty or undefined
  if (minPrice !== null && maxPrice !== null && minPrice !== undefined && maxPrice !== undefined) {
    filter.price = { $gte: minPrice, $lte: maxPrice };

  }
  
  // // Add Area Size range filter if both minAreaSize and maxAreaSize are not empty or undefined
  if (minAreaSize !== null && maxAreaSize !== null && minAreaSize !== undefined && maxAreaSize !== undefined) {
    filter.Area_size = { $gte: minAreaSize, $lte: maxAreaSize };
  }

  // Add bedrooms filter if bedrooms is not empty or undefined
  if (bedrooms !== null && bedrooms !== undefined && bedrooms !== '') {
    filter.bedrooms = {
      $regex: new RegExp(bedrooms, "i"), // Perform a case-insensitive search
    };
  }


    // Find products based on the filters
    const filteredPrperties = await Product.find(filter).lean();

    console.log(filteredPrperties.length , 'Values in Filters Length');

return NextResponse.json({ filteredPrperties });
  } catch (error) {
    console.error('Error filtering products:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}

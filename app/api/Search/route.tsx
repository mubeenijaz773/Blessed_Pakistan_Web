
import { NextResponse } from "next/server";
import Search from "@/models/recent_searches"
import connectDB from "@/utils/dbconnect";




export async function POST(request) {
    const { userid , city  ,propertyType ,min_price , max_price , min_area , max_area } = await request.json();
  
  const search = new Search({
     userid,
     city,
    propertyType,
      min_price,
      max_price,
      min_area,
      max_area
      
    
    });
    await connectDB();
    await search.save()

    return NextResponse.json(

      { status: 200 }
    );
  }
  




  
  
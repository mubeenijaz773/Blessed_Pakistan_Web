

import { NextResponse } from "next/server";
import Search from "@/models/recent_searches"
import connectDB from "@/utils/dbconnect";




export async function GET(request , content) {

    const userid = content.params.userid

    await connectDB();
  const searchdata = await Search.find({userid:userid}).lean();

  return NextResponse.json(
    {  searchdata},
    { status: 200 }
  );
}


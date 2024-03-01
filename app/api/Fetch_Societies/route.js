
import Society from "@/models/Society";
import { NextResponse } from "next/server";



export async function GET(request) {
const Productdata = await Society.find().lean();

  return NextResponse.json(
    {  Productdata},
    { status: 200 }
  );
}




import Product from "@/models/product";
import { NextResponse } from "next/server";



export async function GET() {
const Productdata = await Product.find().lean();

  return NextResponse.json(
    {  Productdata},
    { status: 200 }
  );
}




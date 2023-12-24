import connectDB  from "../../utils/dbconnect"
import Product from "../../models/product";
import { NextResponse } from "next/server";



export async function GET(request) {
const Productdata = await Product.find().lean();

  return NextResponse.json(
    {  Productdata},
    { status: 200 }
  );
}




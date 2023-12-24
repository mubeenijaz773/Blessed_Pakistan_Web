
import Agencies from "../../models/Agency";
import { NextResponse } from "next/server";



export async function GET() {
const Productdata = await Agencies.find().lean();

  return NextResponse.json(
    {  Productdata},
    { status: 200 }
  );
}




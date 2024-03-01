
import Project from "@/models/Project";
import { NextResponse } from "next/server";



export async function GET() {
const Projectdata = await Project.find().lean();

  return NextResponse.json(
    {  Projectdata},
    { status: 200 }
  );
}




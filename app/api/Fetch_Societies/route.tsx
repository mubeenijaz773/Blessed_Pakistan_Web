
import Society from "@/models/Society";
import connectDB from "@/utils/dbconnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    await connectDB();
    // Fetch societies from the database
    const societies = await Society.find().lean().maxTimeMS(30000);

    // If no societies found, return 404 Not Found
    if (!societies || societies.length === 0) {
      return NextResponse.json("No societies found", { status: 404 });
    }

    // Return societies with status 200 OK
    return NextResponse.json({ societies }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error fetching societies:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

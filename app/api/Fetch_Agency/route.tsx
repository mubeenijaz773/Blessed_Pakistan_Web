
import Agencies from "@/models/Agency";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch agencies from the database
    const agencies = await Agencies.find().lean();

    // If no agencies found, return 404 Not Found
    if (!agencies || agencies.length === 0) {
      return NextResponse.json("No agencies found", { status: 404 });
    }

    // Return agencies with status 200 OK
    return NextResponse.json({ agencies }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error fetching agencies:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch projects from the database
    const projects = await Project.find().lean();

    // If no projects found, return 404 Not Found
    if (!projects || projects.length === 0) {
      return NextResponse.json("No projects found", { status: 404 });
    }

    // Return projects with status 200 OK
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error fetching projects:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}


import Subscribe from "@/models/EmailNotify_subscribe";
import connectDB from "@/utils/dbconnect";
import { NextResponse } from "next/server";






export async function POST(request) {
  const { email } = await request.json();

  await connectDB();
  // Check if the email already exists in the database
  const existingUser = await Subscribe.findOne({ email }).lean();

  if (existingUser) {
    // If the email already exists, you can handle it as needed
    // For example, you can return an error response or a success response
    return NextResponse.json({ status: 409, message: "Email already exists" });
  } else {
    // If the email doesn't exist, save it to the database
    const user = await Subscribe.create({ email });
    console.log(user);

    return NextResponse.json({ status: 200, obj:user, message: "Email subscribed successfully" });
  }
}


import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/utils/dbconnect";
const saltRounds = 10;


export async function PUT(request) {
  try {
    // Parse the request body to get the email and new password
    const { email, password } = await request.json();

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await connectDB();
    // Find the user in the database by their email
    const user = await User.findOne({ email });

    // If the user is not found, return an error
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Update the user's password with the new hashed password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ error: "Password update failed" }, { status: 500 });
  }
}

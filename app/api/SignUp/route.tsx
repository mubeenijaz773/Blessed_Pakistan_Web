

import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import connectDB from "@/utils/dbconnect";
const saltRounds = 10;

export async function POST(request) {
  const { username, email, role , password } = await request.json();
  const hash = await bcrypt.hash(password, saltRounds);


  await connectDB();
  const user = await User.create({ username, email, role , password :hash   });

  return NextResponse.json(
    {
      msg: "User created Successfully",
      obj: user 
    },
    { status: 200 }
  );
}


export async function GET(request) {

  await connectDB();

const Users = await User.find();

  return NextResponse.json(
    {  Users},
    { status: 200 }
  );
}








import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function POST(request) {
  const { username, email, role , password } = await request.json();
  const hash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({ username, email, role , password :hash   });

  console.log(user)
  return NextResponse.json(
    {
      msg: "User created Successfully",
      obj: user 
    },
    { status: 200 }
  );
}


export async function GET(request) {
const Users = await User.find();
console.log(Users)
  return NextResponse.json(
    {  Users},
    { status: 200 }
  );
}







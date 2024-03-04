

import Subscribe from "@/models/EmailNotify_subscribe"
import connectDB from "@/utils/dbconnect";
import { NextResponse } from "next/server";




export async function GET(request , content) {

  const email = content.params.email
  await connectDB();
  var checkemail = await Subscribe.find({"email":email});

  // console.log(checkemail , 'email exist in subscribed collection')

  if(checkemail.length > 0){
    return NextResponse.json({ status: 200 });
  }else if(checkemail.length == 0){
    return NextResponse.json({ status: 400 });
  }else{
    return NextResponse.json({ status: 500 });
  }
  
  }


  
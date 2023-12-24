"use server"

import  Subscribe from "../models/EmailNotify_subscribe";





export async function SaveUserNotify(email) {

  
    // Check if the email already exists in the database
    const existingUser = await Subscribe.findOne({ email }).lean();
  
    if (existingUser) {
      // If the email already exists, you can handle it as needed
      // For example, you can return an error response or a success response
      return ({ status: 409, message: "Email already exists" });
    } else {
      // If the email doesn't exist, save it to the database
      const user = await Subscribe.create({ email });
      console.log(user);
  
      return ({ status: 200, obj:user, message: "Email subscribed successfully" });
    }
  }
  







export async function UserEmailNotify(email) {


  
    var checkemail = await Subscribe.find({email}).lean();
 
  
    if(checkemail.length > 0){
      return ({ status: 200 });
    }else if(checkemail.length == 0){
      return ({ status: 400 });
    }else{
      return ({ status: 500 });
    }
    
    }
  
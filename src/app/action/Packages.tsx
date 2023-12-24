"use server"

// import nodemailer from "nodemailer";
// import {  user, pass , feedbackuser , feedbackpass , complainuser, complainpass , reportuser , reportpass } from "../global";

import  Packages from "../models/Users_Package";



export async function SaveUserPackage(userid, package_type, package_price, adsPosted) {


   // Check if the user is already subscribed with the same package type
   const existingUserPackage = await Packages.findOne({ userid, package_type });

   if (existingUserPackage) {
     return ({ status: 300, message: "User is already subscribed to this package type" });
   }

    try {
      const newUser = new Packages({
        userid: userid,
        package_type: package_type,
        package_price: package_price,
        adsPosted: adsPosted,
      });
  
      const savedUserPackage = await newUser.save();
  
      return ({ status: 200, message: "User package saved successfully", data: savedUserPackage });
    } catch (error) {
      console.error("Error saving user package:", error.message);
      return ({ status: 400, error: error.message });
    }
  }
  







  
export async function checkSubscriptionStatus(userid, package_type) {



 
     try {
       // Check if the user is already subscribed with the same package type
       const existingUserPackage = await Packages.find({ userid, package_type  });
 
       if (existingUserPackage.length > 0) {
         return ({ status: 200, Fetch:existingUserPackage });
       }
   

     } catch (error) {
       console.error("Error to Get package:", error.message);
       return ({ status: 400, error: error.message });
     }
   }
   
 
"use server"
import Product from "@/models/product";
import connectDB from "@/utils/dbconnect";
import Subscribe from "@/models/EmailNotify_subscribe";
import { user, pass, DomainUrl } from "../global";
import nodemailer from 'nodemailer';





export async function GetProductById(_id){
    try{
      await connectDB();
    const getdata = await Product.find({_id}).lean();
    if(getdata){
    return({ status : 200 , message: "Product Get Sucessfully ",  Get:getdata })
    }else{
        return({ status : 400})
    }
}catch(error){
     return ({ error:error , message: "user not Found Error !" })
    }


}









export async function GetProductByPropertyid(property_id){
    try{
      await connectDB();
    const getdata = await Product.find({property_id}).lean();
    if(getdata){
    return({ status : 200 , message: "Product Get Sucessfully ",  Get:getdata })
    }else{
        return({ status : 400})
    }
}catch(error){
     return ({ error:error , message: "user not Found Error !" })
    }


}










export async function GetPropertyUserId(userid:any){
  try{
    await connectDB();
  const getdata = await Product.find({userid : userid}).lean();
  if(getdata){
  return({ status : 200 , message: "Product Get Sucessfully ",  Get:getdata })
  }else{
      return({ status : 400})
  }
}catch(error){
   return ({ error:error , message: "user not Found Error !" })
  }


}







export async function UpdatePropertyById(_id, updatedData) {
    try {
    
        await connectDB();
      const updatedProperty = await Product.findOneAndUpdate(
        { _id : _id },
        { $set: updatedData }, // Pass the object with the properties to update
        { new: true }
      ).lean();
  
      if (updatedProperty) {
        return {  status: 200, message: 'Property updated successfully', updatedProperty };
      } else {
        return { status: 404, message: "Property not found" };
      }
    } catch (error) {
      return { status: 500, message: "Error updating property", error };
    }
  }
  

  



  export async function DeletePropertyById(_id) {
    try {
      await connectDB();
      const deletedFavorite = await Product.deleteOne({_id}).lean();
  
      if (deletedFavorite) {
        return ({ status: 200, message: "Property deleted successfully" });
      } else {
        return ({ status: 404, message: "Property not found" });
      }
    } catch (error) {
      return ({ status: 500, message: "Internal server error", error: error });
    }
  }
  
  


  export async function GetAllProperties(){
    try{
      await connectDB();
    const getdata = await Product.find().lean();
    if(getdata){
    return({ status : 200 , message: "Product Get Sucessfully ",  Get:getdata })
    }else{
        return({ status : 400})
    }
}catch(error){
     return ({ error:error , message: "user not Found Error !" })
    }


}

  // Send an email
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });





export async function Add_Property(
  property_id, userid, purpose, propertyType, subType, city,
  location, Area_size, price, bedrooms, bathrooms, title,
  description, email, mobile, Latitude, Longitude, ImagesList,
  VideosList
) {
  try {
  
        await connectDB();

    var ImagesUrls = [];
    var VideosUrls = [];

    for (const image of ImagesList) {
      ImagesUrls.push({ name: image.name });
    }

    for (const video of VideosList) { // Corrected loop variable from VideosUrls to VideosList
      VideosUrls.push({ name: video.name });
    }

    // Save data
    await Product.create({
      property_id,
      userid,
      purpose,
      propertyType,
      subType,
      city,
      location,
      Area_size,
      price,
      bedrooms,
      bathrooms,
      title,
      description,
      email,
      mobile,
      Latitude,
      Longitude,
      images: ImagesUrls,
      videos: VideosUrls,
      Verified: 'Not Verified'
    });

      // // Send email notifications to subscribers
    const subscribers = await Subscribe.find({}, 'email');

    if (subscribers.length > 0) {
      const emailList = subscribers.map((subscriber:any) => subscriber.email);

      const mailOptions = {
        from: user,
        to: emailList.join(', '),
        subject: 'New Property Listing: Explore the Latest Property!',
        html: `
          <html>
            <head></head>
            <body>
              <h1>New Property Listing</h1>
              <p>Explore the latest property that just became available!</p>
              <p>Click the link below to view the property details:</p>
              <a href="${DomainUrl}">View Property</a>
            </body>
          </html>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email sending failed:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    // Return a success response with the created product
    return ({ status: 200, message: 'Property added successfully' });
  } catch (error) {
    // Return an error response if there's any issue
    return ({ status: 400, message: 'Failed to add property', error: error.message });
  }
}

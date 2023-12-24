import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../utils/dbconnect";
import Product from "../../models/product";
import { extname } from 'path'
import { readFile } from 'fs/promises'
import { unlink } from "fs/promises";
import fs from 'fs/promises';
import nodemailer from 'nodemailer';
import {DomainUrl  ,  user , pass } from "../../global"
import subscribe from "../../models/EmailNotify_subscribe";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library


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



export async function POST(request: NextRequest) {
  const data = await request.formData();
  const property_id = data.get("property_id");
  const userid = data.get("userid");
  const purpose = data.get("purpose");
    const propertyType = data.get("propertyType");
    const subType = data.get("subType");
   const city = data.get("city");
    const location = data.get("location");
    const Area_size = data.get("Area_size");
    const price = data.get("price");
    const bedrooms = data.get("bedrooms");
    const bathrooms = data.get("bathrooms");
    const title = data.get("title");
    const description = data.get("description");
    const email = data.get("email");
    const mobile = data.get("mobile");
    const Latitude = data.get("lat");
    const Longitude = data.get("lng");
  const image_files: File[] = data.getAll("imagefiles") as unknown as File[];
    const video_files: File[] = data.getAll("videofiles") as unknown as File[];
  
    if (!image_files && !video_files) {
      return NextResponse.json({ status:400 });
    }
  
  //  for images List 
  
  const uniqueId = uuidv4();
  
  // Define arrays to store the unique filenames for images and videos
  const uniqueImageFilenames = [];
  const uniqueVideoFilenames = [];
  
  // Loop through image files
  for (const image of image_files) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    // Generate a unique filename for the image
    const imageFilename = `${uniqueId}_${uuidv4()}_${image.name}`;
  
    // Add the filename to the uniqueImageFilenames array
    uniqueImageFilenames.push({ name: imageFilename });
  
    // Save the file to the server with the unique filename
    const path = `../data/propertyimages/${imageFilename}`;
    await writeFile(path, buffer);
  }
  
  // Loop through video files
  for (const video of video_files) {
    const bytes1 = await video.arrayBuffer();
    const buffer1 = Buffer.from(bytes1);
  
    // Generate a unique filename for the video
    const videoFilename = `${uniqueId}_${uuidv4()}_${video.name}`;
  
    // Add the filename to the uniqueVideoFilenames array
    uniqueVideoFilenames.push({ name: videoFilename });
  
    // Save the file to the server with the unique filename
    const path = `../data/propertyimages/${videoFilename}`;
    await writeFile(path, buffer1);
  }
  
  
  
  const property =   new Product({
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
      images: uniqueImageFilenames,
      videos: uniqueVideoFilenames,
      Verified: "Not Verified"
      });


      
   await property.save()

 // Send an email notification to subscribers
 const subscribers = await subscribe.find({}, 'email'); // Get all subscriber emails

 if (subscribers.length > 0) {
   const emailList = subscribers.map((subscriber) => subscriber.email);

   const mailOptions = {
     from: user, // Sender's email address
     to: emailList.join(', '), // List of subscriber email addresses
     subject: 'New Property Listing: Explore the Latest Property!', // Email subject
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
  `, 
   };

   transporter.sendMail(mailOptions, (error, info) => {
     if (error) {
       console.error('Email sending failed:', error);
     } else {
       console.log('Email sent:', info.response);
     }
   });
 }
return NextResponse.json( { status:200 });
}





//  Fetch image or video



export async function GET(request) {
  const url = new URL(request.url);
  const filename = url.searchParams.get('filename');

  if (!filename) {
    return new Response(null, { status: 400, statusText: 'Bad Request' });
  }

  // Assuming the uploaded files are stored in the "/public/tmp" directory
  const path = `../data/propertyimages/${filename}`;

  try {
    // Read the file from the filesystem
    const fileData = await readFile(path);
    
    // Get the file extension
    const extension = filename.split('.').pop().toLowerCase();

    // Set the appropriate content type based on the file extension
    let contentType = 'application/octet-stream'; // Default content type for unknown file types

    if (extension === 'png') {
      contentType = 'image/png';
    } else if (extension === 'jpg' || extension === 'jpeg') {
      contentType = 'image/jpeg';
    } else if (extension === 'mp4') {
      contentType = 'video/mp4';
    }
    // Add more conditions for other supported file types as needed

    // Set the appropriate headers for the image or video response
    const headers = {
      'Content-Type': contentType,
      'Content-Length': fileData.length.toString(),
    };

    // Return the file as the response
    return new Response(fileData, { headers });
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return new Response(null, { status: 404, statusText: 'Not Found' });
  }
}

// Delete API also delete from Folder




export async function DELETE(request) {
  
  const { filename } = await request.json();


  if (!filename) {
    return NextResponse.json({ success: false, message: "No filename provided" });
  }

  // Define the path to the file to be deleted
  const filePath = `../data/propertyimages/${filename}`;

  try {
    // Connect to MongoDB
    await connectDB();

    // Find the document associated with the file in MongoDB
    const fileDocument = await Product.findOne({ "images.name": filename });

    if (!fileDocument) {
      return NextResponse.json({ success: false, message: "File not found in database" });
    }

    // Delete the document from MongoDB
    await Product.deleteOne({ _id: fileDocument._id });

    // Attempt to delete the physical file
    await unlink(filePath);

    // File and document deleted successfully
    return NextResponse.json({ success: true, message: "File and document deleted successfully" });
  } catch (error) {
    console.error(`Error deleting file and document for ${filename}:`, error);
    return NextResponse.json({ success: false, message: "File and document deletion failed" });
  }
}


// Update property




export async function PUT(request: NextRequest) {
  try {
    const data = await request.formData();
    const productId = data.get('productId'); // Add productId to identify the property to update

    // Check if the provided productId is valid (you may need to validate it further)
    if (!productId) {
      return NextResponse.json({ status: 400, error: 'Invalid productId' });
    }

    // Fetch the existing property based on productId
    const existingProperty = await Product.findById(productId);

    // Check if the property with the given productId exists
    if (!existingProperty) {
      return NextResponse.json({ status: 404, error: 'Property not found' });
    }

    // Update the property data with the new values from the form

    // existingProperty.purpose = data.get('purpose');
    // existingProperty.propertyType = data.get('propertyType');
    // existingProperty.subType = data.get('subType');
    // existingProperty.city = data.get('city');
    // existingProperty.location = data.get('location');
    // existingProperty.Area_size = data.get('Area_size');
    // existingProperty.price = data.get('price');
    // existingProperty.bedrooms = data.get('bedrooms');
    // existingProperty.bathrooms = data.get('bathrooms');
    // existingProperty.title = data.get('title');
    // existingProperty.description = data.get('description');
    // existingProperty.email = data.get('email');
    // existingProperty.mobile = data.get('mobile');

    // Handle image updates if needed
    const newImageFiles: File[] = data.getAll('imagefiles') as unknown as File[];
    
    if (newImageFiles.length > 0) {
      // Remove existing images (if any)
      for (const image of existingProperty.images) {
        // Delete the old image file from the server folder
        const imagePath = `./public/tmp/${image.name}`;
        await fs.unlink(imagePath);
      }
      existingProperty.images = [];

      for (const image of newImageFiles) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        existingProperty.images.push({ name: image.name });

        // Save the new image file to the server
        const path = `./public/tmp/${image.name}`;
        await writeFile(path, buffer);
      }
    }


    // Handle video updates if needed
const newVideoFiles: File[] = data.getAll("videofiles") as unknown as File[];



    if (newVideoFiles.length > 0) {
      // Remove existing videos (if any)
      for (const video of existingProperty.videos) {
        // Delete the old video file from the server folder
        const videoPath = `./public/tmp/${video.name}`;
        await fs.unlink(videoPath);
      }
      existingProperty.videos = [];

      for (const video of newVideoFiles) {
        const bytes = await video.arrayBuffer();
        const buffer = Buffer.from(bytes);
        existingProperty.videos.push({ name: video.name });

        // Save the new video file to the server
        const path = `./public/tmp/${video.name}`;
        await writeFile(path, buffer);
      }
    }

   // Save the updated property
    await existingProperty.save();

  
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
}








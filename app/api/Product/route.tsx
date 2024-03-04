
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/dbconnect";
import Product from "@/models/product";
import path from 'path';
import { readFile } from 'fs/promises'
import { unlink } from "fs/promises";
import fs from 'fs/promises';
import nodemailer from 'nodemailer';
import {DomainUrl  ,  user , pass } from "@/app/global"
import subscribe from "@/models/EmailNotify_subscribe";
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
  try {
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
  
    if (!image_files.length && !video_files.length) {
      return NextResponse.json({ status: 400, body: { error: 'No image or video files provided.' } });
    }

  
  //  for images List 
  
  const uniqueId = uuidv4();
  
  // Define arrays to store the unique filenames for images and videos
  const uniqueImageFilenames = [];
  const uniqueVideoFilenames = [];
  
    // Specify the directory where you want to save the files
    const directory = '../data/propertyimages';

    try {
      // Check if the directory exists, if not, create it
      await fs.access(directory);
    } catch (error) {
      // Directory doesn't exist, create it
      await fs.mkdir(directory, { recursive: true });
    }


  // Loop through image files
  for (const image of image_files) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    // Generate a unique filename for the image
    const imageFilename = `${uniqueId}_${uuidv4()}_${image.name}`;
  
    // Add the filename to the uniqueImageFilenames array
    uniqueImageFilenames.push({ name: imageFilename });
  
    const filePath = path.join(directory, imageFilename);
    await fs.writeFile(filePath, buffer);
    // // Save the file to the server with the unique filename
    // const path = `../data/propertyimages/${imageFilename}`;
    // await writeFile(path, buffer);
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
    const filePath = path.join(directory, videoFilename);
    await fs.writeFile(filePath, buffer1);
  
    // // Save the file to the server with the unique filename
    // const path = `../data/propertyimages/${videoFilename}`;
    // await writeFile(path, buffer1);
  }
  
  
    // Create a new property document
    const property = new Product({
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
      Verified: 'Not Verified'
    });

    await connectDB();
    // Save the property document
    await property.save();

    // Send email notifications to subscribers
    const subscribers = await subscribe.find({}, 'email');

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

    return NextResponse.json({ status: 200 });
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json({ status: 500, body: { error: 'Internal server error.' } });
}
}





//  Fetch image or video



// export async function GET(request) {
//   const url = new URL(request.url);
//   const filename = url.searchParams.get('filename');

//   if (!filename) {
//     return new Response(null, { status: 400, statusText: 'Bad Request' });
//   }

//   // Assuming the uploaded files are stored in the "/public/tmp" directory
//   const path = `../data/propertyimages/${filename}`;

//   try {
//     // Read the file from the filesystem
//     const fileData = await readFile(path);
    
//     // Get the file extension
//     const extension = filename.split('.').pop().toLowerCase();

//     // Set the appropriate content type based on the file extension
//     let contentType = 'application/octet-stream'; // Default content type for unknown file types

//     if (extension === 'png') {
//       contentType = 'image/png';
//     } else if (extension === 'jpg' || extension === 'jpeg') {
//       contentType = 'image/jpeg';
//     } else if (extension === 'mp4') {
//       contentType = 'video/mp4';
//     }
//     // Add more conditions for other supported file types as needed

//     // Set the appropriate headers for the image or video response
//     const headers = {
//       'Content-Type': contentType,
//       'Content-Length': fileData.length.toString(),
//     };

//     // Return the file as the response
//     return new Response(fileData, { headers });
//   } catch (error) {
//     console.error(`Error reading file: ${error}`);
//     return new Response(null, { status: 404, statusText: 'Not Found' });
//   }
// }




export async function GET(request:any) {
  const url = new URL(request.url);
  const filename:any = url.searchParams.get('filename');

  if (!filename) {
    return new Response(null, { status: 400, statusText: 'Bad Request' });
  }

  // console.log(filename, "filename")

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
    } else if (extension === 'gif') {
      contentType = 'image/gif';
    } else if (extension === 'bmp') {
      contentType = 'image/bmp';
    } else if (extension === 'webp') {
      contentType = 'image/webp';
    } else if (extension === 'svg') {
      contentType = 'image/svg+xml'; // SVG format
    } else if (extension === 'mp4') {
      contentType = 'video/mp4';
    } else if (extension === 'webm') {
      contentType = 'video/webm';
    } else if (extension === 'avi') {
      contentType = 'video/x-msvideo';
    } else if (extension === 'mov') {
      contentType = 'video/quicktime';
    } else if (extension === 'mkv') {
      contentType = 'video/x-matroska';
    } else if (extension === 'mp4') {
      contentType = 'video/mp4';
    } else if (extension === 'pdf') {
      contentType = 'application/pdf'; // Set content type for PDF files
    } else if (extension === 'doc' || extension === 'docx') {
      contentType = 'application/msword'; // Set content type for Word files
    } else if (extension === 'txt') {
      contentType = 'text/plain'; // Set content type for text files
    }



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


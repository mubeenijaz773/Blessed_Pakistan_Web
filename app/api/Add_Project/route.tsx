// import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import path from 'path';

import fs from 'fs/promises';

import { readFile } from 'fs/promises'



export async function POST(request: NextRequest) {

const data = await request.formData();
const name = data.get("name");
const description = data.get("description");
  const location = data.get("location");
  const city = data.get("city");
  const Latitude = data.get("lat");
  const Longitude = data.get("lng");
const Societyimages: File[] = data.getAll("images") as unknown as File[];
const video_files: File[] = data.getAll("videofiles") as unknown as File[];
  


  if (!Societyimages) {
    return NextResponse.json({ status:400 });
  }

//  for images List 

const uniqueId = uuidv4();

// Define arrays to store the unique filenames for images and videos
const Societiesimages = [];
const uniqueVideoFilenames = [];
   // Specify the directory where you want to save the files
   const directory = '../data/projectimages';

   try {
     // Check if the directory exists, if not, create it
     await fs.access(directory);
   } catch (error) {
     // Directory doesn't exist, create it
     await fs.mkdir(directory, { recursive: true });
   }

// Loop through image files
for (const image of Societyimages) {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate a unique filename for the image
  const imageFilename = `${uniqueId}_${uuidv4()}_${image.name}`;

  // Add the filename to the uniqueImageFilenames array
  Societiesimages.push({ name: imageFilename });

  const filePath = path.join(directory, imageFilename);
  await fs.writeFile(filePath, buffer);
  // Save the file to the server with the unique filename
  // const path = `../data/projectimages/${imageFilename}`;
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
    const filePath = path.join(directory, videoFilename);
  await fs.writeFile(filePath, buffer1);
    // Save the file to the server with the unique filename
    // const path = `../data/projectimages/${videoFilename}`;
    // await writeFile(path, buffer1);
  }
  

const Projectdata = new Project({
    name,
    description,
    city,
    location,
    Latitude,
    Longitude,
images: Societiesimages,
videos: uniqueVideoFilenames,

    });

   await Projectdata.save()


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
  const path = `../data/projectimages/${filename}`;

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







import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import Agencies from "../../models/Agency";
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library


import { readFile } from 'fs/promises'



export async function POST(request: NextRequest) {

const data = await request.formData();
const Agencyname = data.get("Agencyname");
const CEO_Name = data.get("ceo");
  const address = data.get("address");
  const email = data.get("email");
  const Latitude = data.get("lat");
  const Longitude = data.get("lng");
    // Parse the members data as JSON
    const members = JSON.parse(data.get("members"));
const logoimages: File[] = data.getAll("logoimages") as unknown as File[];
  const bannerimages: File[] = data.getAll("bannerimages") as unknown as File[];

  if (!logoimages && !bannerimages) {
    return NextResponse.json({ status:400 });
  }

//  for images List 

const uniqueId = uuidv4();

// Define arrays to store the unique filenames for images and videos
const Logoimages = [];
const Bannerimages = [];


// Loop through image files
for (const image of logoimages) {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate a unique filename for the image
  const imageFilename = `${uniqueId}_${uuidv4()}_${image.name}`;

  // Add the filename to the uniqueImageFilenames array
  Logoimages.push({ name: imageFilename });

  // Save the file to the server with the unique filename
  const path = `../data/Agencyimages/${imageFilename}`;
  await writeFile(path, buffer);
}

// Banner image


for (const image of bannerimages) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    // Generate a unique filename for the image
    const imageFilename = `${uniqueId}_${uuidv4()}_${image.name}`;
  
    // Add the filename to the uniqueImageFilenames array
    Bannerimages.push({ name: imageFilename });
  
    // Save the file to the server with the unique filename
    const path = `../data/Agencyimages/${imageFilename}`;
    await writeFile(path, buffer);
  }

let status = "InActive"


const Agencydata = new Agencies({
    Agencyname,
    CEO_Name,
    address,
    email,
    Latitude,
    Longitude,
    members :members,
    Logoimages: Logoimages,
    Bannerimages: Bannerimages,
    status  
  });

   await Agencydata.save()


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
  const path = `../data/Agencyimages/${filename}`;

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







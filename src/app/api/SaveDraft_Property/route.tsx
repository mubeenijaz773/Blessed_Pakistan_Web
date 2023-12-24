import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

import Draft_Product from "../../models/draft_product";

import { v4 as uuidv4 } from "uuid"; // Import the UUID library

export async function POST(request: NextRequest) {
  const data = await request.formData();
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

//   if (!image_files && !video_files) {
//     return NextResponse.json({ status: 400 });
//   }



  // Check if the property already exists in the draft collection
  const existingDraft = await Draft_Product.findOne({ userid });


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



  if (existingDraft) {
    // Update the existing draft
    existingDraft.userid = data.get("userid");
    existingDraft.purpose = data.get("purpose");
    existingDraft.propertyType = data.get("propertyType");
    existingDraft.subType = data.get("subType");
    existingDraft.city = data.get("city");
    existingDraft.location = data.get("location");
  existingDraft.Area_size  = data.get("Area_size");
  existingDraft.price = data.get("price");
  existingDraft.bedrooms = data.get("bedrooms");
  existingDraft.bathrooms = data.get("bathrooms");
  existingDraft.title = data.get("title");
  existingDraft.description = data.get("description");
  existingDraft.email = data.get("email");
existingDraft.mobile  = data.get("mobile");
existingDraft.Latitude = data.get("lat");
existingDraft.Longitude = data.get("lng");
existingDraft.images = uniqueImageFilenames;
existingDraft.videos = uniqueVideoFilenames;
existingDraft.Verified = "Not Verified";
    await existingDraft.save();

    return NextResponse.json({ status: 200 });
  } else {

  const property = new Draft_Product({
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
    Verified: "Not Verified",
  });

  await property.save();



  return NextResponse.json({ status: 200 });
  }
}

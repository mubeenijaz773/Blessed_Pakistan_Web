import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

import Product from "../../models/product";

import { unlink } from "fs/promises";

import { v4 as uuidv4 } from "uuid"; // Import the UUID library

export async function PUT(request: NextRequest) {
  const data = await request.formData();
  const _id = data.get("_id");
  const image_files: File[] = data.getAll("imagefiles") as unknown as File[];
  const video_files: File[] = data.getAll("videofiles") as unknown as File[];

  if (!image_files && !video_files) {
    return NextResponse.json({ status: 400 });
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

  const property = await Product.findOneAndUpdate(
    { _id },
    {
      $push: {
        images: { $each: uniqueImageFilenames },
        videos: { $each: uniqueVideoFilenames },
      },
    },
    { new: true }
  );

  return NextResponse.json({ status: 200 });
}








export async function DELETE(request: NextRequest) {
    try {
      const url = new URL(request.url);
      const body = url.searchParams;
      const _id = body.get("_id");
      const imageFilenameToDelete = body.get("imageFilename");
      const videoFilenameToDelete = body.get("videoFilename");
  
      if (imageFilenameToDelete) {
        // Remove image filename from the list
        await Product.findOneAndUpdate(
          { _id },
          { $pull: { images: { name: imageFilenameToDelete } } }
        );
  
        const filePath1 = `../data/propertyimages/${imageFilenameToDelete}`;
        await unlink(filePath1);
      }
  
      if (videoFilenameToDelete) {
        // Remove video filename from the list
        await Product.findOneAndUpdate(
          { _id },
          { $pull: { videos: { name: videoFilenameToDelete } } }
        );
  
        const filePath2 = `../data/propertyimages/${videoFilenameToDelete}`;
        await unlink(filePath2);
      }
  
      return NextResponse.json({ status: 200 });
    } catch (error) {
      console.error('Error deleting files', error);
      return NextResponse.json({ status: 500, error: 'Internal Server Error' });
    }
  }
  
"use server";
import { writeFile } from "fs/promises";

import Draft_Product from "@/models/draft_product";
import connectDB from "@/utils/dbconnect";

export async function DraftByUserId(userid) {
  await connectDB();
  const getdata = await Draft_Product.find({ userid }).lean();

  if (getdata) {
    return { status: 200, data: getdata };
  } else {
    return { status: 400 };
  }
}

export async function DraftById(_id) {
  await connectDB();
  const getdata = await Draft_Product.find({ _id }).lean();

  if (getdata) {
    return { status: 200, data: getdata };
  } else {
    return { status: 400 };
  }
}

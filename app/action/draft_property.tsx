"use server";
import { writeFile } from "fs/promises";

import Draft_Product from "@/models/draft_product";

export async function DraftByUserId(userid) {
  const getdata = await Draft_Product.find({ userid }).lean();

  if (getdata) {
    return { status: 200, data: getdata };
  } else {
    return { status: 400 };
  }
}

export async function DraftById(_id) {
  const getdata = await Draft_Product.find({ _id }).lean();

  if (getdata) {
    return { status: 200, data: getdata };
  } else {
    return { status: 400 };
  }
}

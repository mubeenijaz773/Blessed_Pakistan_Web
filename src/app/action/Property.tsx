"use server"
import Product from "../models/product";
import { unlink } from "fs/promises";

import path from 'path';


export async function GetProductById(_id){
    try{
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




export async function UpdatePropertyById(_id, updatedData) {
    try {
      // console.log(fs.readdir('../../../'))
        console.log(updatedData , "updated data")
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
  

  

  export async function DeleteByIdImagesVideos(_id  , imageFilenameToDelete ,videoFilenameToDelete ) {

    // Remove image filename from the list
    await Product.findOneAndUpdate(
      { _id },
      { $pull: { images: { name: imageFilenameToDelete } } }
    );
  
    // Remove video filename from the list
    await Product.findOneAndUpdate(
      { _id },
      { $pull: { videos: { name: videoFilenameToDelete } } }
    );
  
// Example of using absolute paths
await unlink(path.resolve(__dirname, `./data/propertyimages/${imageFilenameToDelete}`));
await unlink(path.resolve(__dirname, `./data/propertyimages/${videoFilenameToDelete}`));

    return ({ status: 200 });
  }






  export async function DeletePropertyById(_id) {
    try {
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
  
  





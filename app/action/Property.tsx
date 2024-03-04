"use server"
import Product from "@/models/product";
import connectDB from "@/utils/dbconnect";

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






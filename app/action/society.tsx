"use server"
import Society from "@/models/Society";
import connectDB from "@/utils/dbconnect";

export async function GetAllSocieties(){
    try{
        await connectDB();
    const data = await Society.find().lean();

    return({ sucess:true , message: "All Societies Fetch Sucessfully ",  data })
  
}catch(error){
     return ({ error:error , message: "Not Fetch !" })
    }


}



// Add New Project //////////////////



  
export async function Add_Societies(
    name, description, city,
    location, Latitude, Longitude ,  ImagesList
  
  ) {
    try {

  
        await connectDB();
      var ImagesUrls = [];
    
  
      for (const image of ImagesList) {
        ImagesUrls.push({ name: image.name });
      }
  
  
      // Save data
      await Society.create({
        name,
        description,
        city,
        location,
        Latitude,
        Longitude,
        images: ImagesUrls,
      });
  
  
      // Return a success response with the created product
      return ({ status: 200, message: 'Project added successfully' });
    } catch (error) {
      // Return an error response if there's any issue
      return ({ status: 400, message: 'Failed to add Project', error: error.message });
    }
  }
  









"use server"
import Project from "@/models/Project";
import connectDB from "@/utils/dbconnect";

export async function GetAllProjects(){
    try{
        await connectDB();
    const data = await Project.find().lean();

    if(data){
    return({ status:200 , message: "All Projects Fetch Sucessfully ", "projects": data })
    }else{
        return({status : 400})
    }
}catch(error){
     return ({ error:error , message: "user not Deleted !" })
    }


}



export async function FindProjectbyid(_id:any) {
    try {
        await connectDB();
        const data = await Project.find({"_id": _id }).lean();

        if (data) {
            return ({ status: 200, message: "Project fetched successfully", project: data });
        } else {
            return ({ status: 404, message: "Project not found" });
        }
    } catch (error) {
        console.error('Error fetching project:', error);
        return ({ status: 500, message: "Internal Server Error" });
    }
}





// Add New Project //////////////////



  
export async function Add_Projects(
    name, description, city,
    location, Latitude, Longitude ,  ImagesList,
     VideosList
  ) {
    try {

  
        await connectDB();
      var ImagesUrls = [];
      var VideosUrls = [];
  
      for (const image of ImagesList) {
        ImagesUrls.push({ name: image.name });
      }
  
      for (const video of VideosList) { // Corrected loop variable from VideosUrls to VideosList
        VideosUrls.push({ name: video.name });
      }
  
      // Save data
      await Project.create({
        name,
        description,
        city,
        location,
        Latitude,
        Longitude,
    images: ImagesUrls,
    videos: VideosUrls,
      });
  
  
      // Return a success response with the created product
      return ({ status: 200, message: 'Project added successfully' });
    } catch (error) {
      // Return an error response if there's any issue
      return ({ status: 400, message: 'Failed to add Project', error: error.message });
    }
  }
  



"use server"
import Agencies from "@/models/Agency";
import connectDB from "@/utils/dbconnect";
export async function GetAllAgencies(){
    try{
        await connectDB();
    const Getdata = await Agencies.find().lean();

    return({ sucess:true , message: "All Agencies Fetch Sucessfully ",GET:Getdata })
  
}catch(error){
     return ({ error:error , message: "user not Deleted !" })
    }


}


// //////////////////  Change Status ////////////////////////////////



export async function updateStatus(_id, status) {
    await connectDB();
    const data = await Agencies.findByIdAndUpdate(
        { _id: _id },
        { status: status },
        { new: true } // returns the modified document rather than the original
    ).lean();

    return data;
}





export async function AgentByUserId(userid) {
  try {
      await connectDB();
      const agencies = await Agencies.find({ userid }).lean();
      return ({ status: 200, data: agencies });
  } catch (error) {
      console.error("Error fetching agencies:", error);
      return ({ status: 500, error: error, message: "An error occurred while fetching agencies" });
  }
}





export async function GetAgenciesById(_id){
    try{
        await connectDB();
    const Getdata = await Agencies.find({_id}).lean();

    return Getdata
  
}catch(error){
     return ({ error:error , message: "user not Deleted !" })
    }
}



// Add Agency




  
export async function Add_Agencies(
    Agencyname, CEO_Name, address, city,
    email, Latitude, Longitude, members ,  Logoimages,
     Bannerimages
  ) {
    try {

  
        await connectDB();
      var ImagesUrls = [];
      var VideosUrls = [];
  
      for (const image of Logoimages) {
        ImagesUrls.push({ name: image.name });
      }
  
      for (const banner of Bannerimages) { // Corrected loop variable from VideosUrls to VideosList
        VideosUrls.push({ name: banner.name });
      }
  
      // Save data
      await Agencies.create({
        Agencyname,
        CEO_Name,
        address,
        city ,
        email,
        Latitude,
        Longitude,
        members :members,
        Logoimages: ImagesUrls,
        Bannerimages: VideosUrls,
        status :"InActive" 
      });
  
  
      // Return a success response with the created product
      return ({ status: 200, message: 'Agency added successfully' });
    } catch (error) {
      // Return an error response if there's any issue
      return ({ status: 400, message: 'Failed to add Agency', error: error.message });
    }
  }
  



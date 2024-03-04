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




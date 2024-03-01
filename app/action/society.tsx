"use server"
import Society from "@/models/Society";

export async function GetAllSocieties(){
    try{
        
    const data = await Society.find().lean();

    return({ sucess:true , message: "All Societies Fetch Sucessfully ",  data })
  
}catch(error){
     return ({ error:error , message: "Not Fetch !" })
    }


}




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




export async function FindProjectbyid(_id){
    try{
        
    const data = await Project.find({_id}).lean();
    if(data){
        return({ status : 200 , message: "Projects Get Sucessfully ",  Get:data })
        }else{
            return({ status : 400})
        }
  
}catch(error){
     return ({ error:error , message: "user not Deleted !" })
    }


}



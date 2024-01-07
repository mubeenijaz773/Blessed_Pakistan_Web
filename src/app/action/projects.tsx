"use server"
import Project from "../models/Project";

export async function GetAllProjects(){
    try{
        
    const data = await Project.find().lean();

    return({ sucess:true , message: "All Projects Fetch Sucessfully ",  data })
  
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



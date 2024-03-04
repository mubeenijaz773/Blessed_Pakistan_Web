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
        const data = await Project.find({ _id }).lean();

        if (data.length > 0) {
            return { status: 200, message: "Project fetched successfully", project: data };
        } else {
            return { status: 404, message: "Project not found" };
        }
    } catch (error) {
        console.error('Error fetching project:', error);
        return { status: 500, message: "Internal Server Error" };
    }
}

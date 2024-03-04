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


export async function GetAllAgenciesByUserId(userid){
    try{
        await connectDB();
    const Getdata = await Agencies.find({userid}).lean();

    return Getdata
  
}catch(error){
     return ({ error:error , message: "Agent not Found !" })
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
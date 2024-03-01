"use server"
import Agencies from "@/models/Agency";
export async function GetAllAgencies(){
    try{
        
    const Getdata = await Agencies.find().lean();

    return({ sucess:true , message: "All Agencies Fetch Sucessfully ",GET:Getdata })
  
}catch(error){
     return ({ error:error , message: "user not Deleted !" })
    }


}


// //////////////////  Change Status ////////////////////////////////



export async function updateStatus(_id, status) {
    const data = await Agencies.findByIdAndUpdate(
        { _id: _id },
        { status: status },
        { new: true } // returns the modified document rather than the original
    ).lean();

    return data;
}


export async function GetAllAgenciesByUserId(userid){
    try{
        
    const Getdata = await Agencies.find({userid}).lean();

    return Getdata
  
}catch(error){
     return ({ error:error , message: "user not Deleted !" })
    }
}





export async function GetAgenciesById(_id){
    try{
        
    const Getdata = await Agencies.find({_id}).lean();

    return Getdata
  
}catch(error){
     return ({ error:error , message: "user not Deleted !" })
    }
}
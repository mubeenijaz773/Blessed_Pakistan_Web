"use server"
import Favorites_Property from "../models/favorite_properties";



export async function SavefavoriteProperty(userid, property_id) {
    try {
      // Check if the combination of userid and property_id already exists
      const existingFavorite = await Favorites_Property.findOne({
        userid,
        property_id,
      });
  
      if (existingFavorite) {
        return { status: 400, message: 'Favorite already exists for this user and property' };
      }
  
      // If not exists, save the new favorite
      const newFavorite = new Favorites_Property({
        userid,
        property_id,
      });
  
      await newFavorite.save();
  
      return { status: 200, message: 'Saved Successfully' };
    } catch (error) {
      return { status: 500, error, message: 'Error Saving Favorite Property' };
    }
  }




  export async function GetFavoritePropertyByUserId(userid){
    try{
    const getdata = await Favorites_Property.find({userid}).populate("property_id").lean()



    if(getdata){
    return({ status : 200 , message: "Favorite Get Sucessfully ",   Get: getdata.map(item => item.property_id) })
    }else{
        return({ status : 400})
    }
}catch(error){
     return ({ error:error , message: "user not Found Error !" })
    }


}




export async function DeleteFavoritePropertyById(property_id) {
  try {
    const deletedFavorite = await Favorites_Property.deleteOne({property_id}).lean();

    if (deletedFavorite) {
      return ({ status: 200, message: "Favorite Property deleted successfully" });
    } else {
      return ({ status: 404, message: "Favorite Property not found" });
    }
  } catch (error) {
    return ({ status: 500, message: "Internal server error", error: error });
  }
}






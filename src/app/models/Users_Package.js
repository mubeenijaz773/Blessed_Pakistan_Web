import mongoose from "mongoose";

var packageSchema = new mongoose.Schema({
  userid: {
    type: String,
    ref:'User'
  },
  package_type: {
    type: String,
   
  },
  package_price: {
    type: Number,
   
  },

  adsPosted: {
    type: Number,
  
  },

});

const Packages =
  mongoose.models.Users_Package || mongoose.model("Users_Package", packageSchema);

export default Packages;

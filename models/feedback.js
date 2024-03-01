import mongoose from "mongoose";

var UserSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

});

const FeedBack =
  mongoose.models.feedback || mongoose.model("feedback", UserSchema);

export default FeedBack;

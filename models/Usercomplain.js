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

const Complain =
  mongoose.models.complains || mongoose.model("complains", UserSchema);

export default Complain;

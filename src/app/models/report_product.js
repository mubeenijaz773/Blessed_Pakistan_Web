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

const Report =
  mongoose.models.report_product || mongoose.model("report_product", UserSchema);

export default Report;

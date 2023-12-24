import mongoose from "mongoose";

var UserSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  city: {
    type: String,
  },

  propertyType: {
    type: String,
  },

  min_price: {
    type: String,
  },
  max_price: {
        type: String,
      },
  min_area: {
    type: String,
  },
  max_area: {
        type: String,
      }
});

const Search =
  mongoose.models.searches || mongoose.model("searches", UserSchema);

export default Search;

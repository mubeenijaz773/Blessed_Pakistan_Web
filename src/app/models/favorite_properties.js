var mongoose = require("mongoose");

var FavoritesSchema = new mongoose.Schema(
  {
    userid: {
        type: String,
      },
    property_id: {
      type: String,
      ref: "products",
    },
 
  },
  {
    timestamps: true,
  }
);

const Favorites_Property =
  mongoose.models.favorite_properties ||
  mongoose.model("favorite_properties", FavoritesSchema);

export default Favorites_Property;

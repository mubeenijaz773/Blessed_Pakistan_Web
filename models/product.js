var mongoose = require('mongoose');


var products = new mongoose.Schema({
    property_id:{
type:Number
    },
    userid:{
        type:String
    },
    purpose:{
        type: String,
    },

    propertyType:{
        type: String
    },
    subType:{
        type: String
    },



    city:{
        type: String,
    },

    location:{
        type: String,
    },

    Area_size:{
        type: String
    },
    price:{
        type: String
    },
    bedrooms:{
        type: String
    },
    bathrooms:{
        type: String
    },
     title:{
        type: String
    },
    description:{
        type: String
    },
    email:{
        type: String
    },
    mobile:{
        type: String
    },
    Latitude:{
        type: String
    },
    Longitude:{
        type: String
    },
    images: [
        {
            name:String
        }
    ],
    videos: [
        {
            name:String
        }
    ],
    Verified:{
        type:String
    },
    }, 
    {
        timestamps: true
    }
);



const Product   = mongoose.models.products || mongoose.model('products', products);

export default Product;




var mongoose = require('mongoose');


var draftSchema = new mongoose.Schema({
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
    }
 
});



const Draft_Product   = mongoose.models.draft_products || mongoose.model('draft_products', draftSchema);

export default Draft_Product;




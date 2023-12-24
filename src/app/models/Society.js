var mongoose = require('mongoose');


var societySchema = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
      type:String
    },
    city:{
        type: String,
    },
    location:{
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

});



const Society   = mongoose.models.society || mongoose.model('society', societySchema);

export default Society;




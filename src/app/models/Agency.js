var mongoose = require('mongoose');


var AgencySchema = new mongoose.Schema({

    userid:{
        type:String
    },
    Agencyname:{
        type:String
    },
    CEO_Name:{
        type: String,
    },

    address:{
        type: String
    },
    email:{
        type:String
    },

    Latitude:{
        type: String
    },
    Longitude:{
        type: String
    },

    members: [{
        name: String,
        designation: String,
        phone: String
    }],
    Logoimages: [
        {
            name:String
        }
    ],
    Bannerimages: [
        {
            name:String
        }
    ],
    status:{
        type: String
    },
});



const Agencies   = mongoose.models.Agencies || mongoose.model('Agencies', AgencySchema);

export default Agencies;




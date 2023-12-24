var mongoose = require('mongoose');


var projectSchema = new mongoose.Schema({
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
    videos: [
        {
            name:String
        }
    ],

});



const Project   = mongoose.models.project || mongoose.model('project', projectSchema);

export default Project;





import mongoose from "mongoose";

var UserSchema = new mongoose.Schema({

    
        username: {
                type: String,
                required: true
        },

        email: {
                type: String,
                required: true
        },
      


        password: { 
                type: String
        },
        role: { 
                type: String
        },
        type: { 
                type: String
        },    


    
});


const User   = mongoose.models.users || mongoose.model('users', UserSchema);

export default User;
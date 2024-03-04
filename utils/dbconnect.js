import mongoose from 'mongoose';

const config = {
  isConnected : 0,
};

 const connectDB = async () => { 
 
  if (config.isConnected) { 
    console.log("Already Connected to MongoDB")
return } else { 
  
  const db = await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
 console.log(db.connection.readyState , "ready state")

config.isConnected = db.connection.readyState 
 
 console.log("Connected to MongoDB") 

}

}
 
 export default connectDB
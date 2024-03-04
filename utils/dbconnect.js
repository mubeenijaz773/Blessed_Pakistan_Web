import mongoose from 'mongoose';
 const connection = {}
const connectDB = async () => { 
  // console.log(process.env.MONGODB_URL , "db url")
  if (connection.isConnected) { console.log("Already Connected to MongoDB")
return } else { const db = await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
 connection.isConnected = db.connections[0].readyState 
 console.log("Connected to MongoDB") } }
 export default connectDB
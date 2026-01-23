//connection karne ka tarika bas itna sa hi hota h :)

import mongoose from "mongoose";

const connectDB = async()=>
{
     try{
          await mongoose.connect(process.env.MONGO_URI);
          console.log('mongodb connected successfully.');
     }catch(error)
     {
          console.log(error);
     }
}
export default connectDB;
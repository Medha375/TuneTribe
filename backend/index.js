
import express, {urlencoded} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});
import userRoute from "./routes/user.route.js";

const app = express();

const PORT=process.env.PORT;

app.get("/",(req,res)=>{
     return res.status(200).json({
          message:"running successfully",
          success:true
     })
})

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions={
     origin:'http://localhost:5173',
     credentials:true

}
app.use(cors(corsOptions));

//apis will be here

app.use("/api/v1/user", userRoute);
"http://localhost:8000//api/v1/user"


app.listen(PORT, ()=>
{
     connectDB();
    console.log(`server listening on port ${PORT}`); 
})
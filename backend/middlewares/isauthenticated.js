import jwt from "jsonwebtoken";
const isautheticted= async(req, res, next)=>
{
     try{
          const token= req.cookies.token;
          if(!token){
               return res.status(401).json({
                    message:'User not authenticated',
                    success:false
               });
          }
          const decode= await jwt.verify(token, process.env.SECRET_KEY);
          if(!decode)
          {
               return res.status(401).json({
                    message:'invalid',
                    success:false
               });
          }

     } catch(error){
          console.log(error);
     }
}

export default isautheticted;
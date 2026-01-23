import {User} from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req, res)=>
     {
          try{
               const{username,email, password}= req.body;

               if(!username || !email || !password)
               {
                    return res.status(401).json({
                         message:"please enter all the required information !",
                         success:false,
                    });
               }
               const user = await User.findOne({email});
               if(user){
                    return res.status(401).json({
                         message:"Account alredy exists on this email",
                         success:false,
                    });
               };

               const hashedPassword = await bcrypt.hash(password, 10);
               await User.create({
               username,
               email,
               password:hashedPassword
              });

              return res.status(201).json({
               message:"Account created successfully.",
               success:true,
              });

          }
          catch(error){
               console.log(error);

          }

}

export const login = async(req,res)=>{
     try{
          const{email ,password}=req.body;
          if(!email || !password)
               {
                    return res.status(401).json({
                         message:"please enter all the required information !",
                         success:false,
                    });
               }
               let user= await user.findOne({email});
               if(!user){
                    return res.status(401).json({
                         message:"this user dosent exists",
                         success:false,
                    });
               }

               const isPasswordMatch= await bcrypt.compare(password, user.password);
               if(!isPasswordMatch){
                    return res.status(401).json({
                         message:"Incorrect email or password",
                         success:false,
                    });
               }

               user={
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    profilePicture:user.profilePicture,
                    bio:user.bio,
                    followers:user.followers,
                    following:user.following,
                    posts:user.posts
               }

               const token = await jwt.sign({userId:user ._id}, process.env.SECRET_KEY,{expiresIn:'1d'});

               return res.cookie('token', token,{httpOnly:true, sameSite:'strict',maxAge:1*24*60*60*1000}).json
               ({
                    message:'Welcome back ${user.username}',
                    success:true,
                    user

               });
     }
     catch(error){
          console.log(error);
     }
};

export const logout= async(__dirname,res)=>{
     try{
          return res.cookie("token","",{maxAge:0}).json({
               message:'You have been logged out',
               success:true
          });

     }catch(error){
          console.log(error);
     }
};

export const getProfile= async(req, res)=>
{
     try{
          const userId= req.params.id;
          let user= await User.findById(userId);
          return res.status(200).json({
               user,
               success:true
          });

     }catch (error){
          console.log(error);

     }

};

export const editProfile =  async(req, res)=>{
     try{
          const userId=req.id;
          const {bio, gender}= req.body;
          const profilePicture= req.file;
          let cloudResponse;   //sign up cloudnary 1,25,40
           
         if(profilePicture){
          const fileUri= getDataUri(profilePicture);
          cloudResponse= await cloudinary.uploader.upload(fileUri);

          const user= await User.findById(userId);
          if(!user){
               return res.status(404).json({
                    message:'User not found.',
                    success:false
               })
          };
          if(bio) user.bio= bio;
          if(gender) user.gender= gender;
          if(profilePicture)user.profilePicture= cloudResponse.secure_url;

          await user.save();

          return res.status(200).json({
               message:'Profile picture updated.',
               success:true,
               user
          });
     }
     catch(error){
          console.log(error);
     }
     };

     //get suggested user l


     export const followOrUnfollow = asyn(req, res)=>
     {
          try{
               const follokarnewala= req.id;
               const jiskofollowkarungs= req.params.id;
               if(follokarnewala===jiskofollowkarungs){
                  return res.status(404).json({
                    message:'you cannot follow/unfollow yourself',
                    success:false
                  }); 
               }

               const user= await User.findById(follokarnewala);
               const targetUser= await User.findById(jiskofollowkarungs);

               if(!user || !targetUser){
                    return res.status(400).json({
                         message:'user not found',
                         success:false
                    });
               }

               //now check we have to sollow or unfollow
               const isFollowing= user.following.includes(jiskofollowkarungs);
               if(isFollowing){
                    //unfollow logic

                     await Promise.all([
                         User.updateOne({_id:follokarnewala},{$pull:{following:jiskofollowkarungs}}),

                         User.upDateOne({_id:jiskofollowkarungs},{$pull:{followers:follokarnewala}}),
                    ])

                    return res.status(200).json({
                         message:'unfollow successfully',
                         success:true
                    });

               } else{
                    await Promise.all([
                         User.updateOne({_id:follokarnewala},{$push:{following:jiskofollowkarungs}}),

                         User.upDateOne({_id:jiskofollowkarungs},{$push:{followers:follokarnewala}}),
                    ])

               }

          }
          catch(error){
               console.log(error);
          }
     }
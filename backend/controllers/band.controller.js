import { Band } from "../models/band.model.js";
import { User } from "../models/user.model.js";

export const createBand= asyn(req, res)=>{
     try{
          const{bandname, email, description, location, genre}=req.body;

          const leader=req.user.userId;

          const band= await Band.create({
               bandname,
               email,
               description,
               location,
               genre,
               teamlead: leaderId,
               members:[leaderId],
          });

          res.status(201).json({
               success:true,
               message:"band created successfully",
               band,
          });
     }catch (error){
          console.log(error);
          res.status(500).json({success:false, message:"Error craerting band"});

     }
};


export const editBand = async (req, res) => {
  try {
    const bandId = req.params.id;
    const updates = req.body;

    const band = await Band.findById(bandId);
    if (!band) return res.status(404).json({ success: false, message: "Band not found" });

    // check if current user is the leader
    if (band.teamlead.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "You are not the leader" });
    }

    Object.assign(band, updates); // apply changes
    await band.save();

    res.json({ success: true, message: "Band updated 🎶", band });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error editing band" });
  }
};


//for other users to join the band

export const joinBand = async (req, res) => {
  try {
    const bandId = req.params.id;
    const userId = req.user.userId;

    const band = await Band.findById(bandId);
    if (!band) return res.status(404).json({ success: false, message: "Band not found" });

    if (band.members.includes(userId)) {
      return res.status(400).json({ success: false, message: "Already a member" });
    }

    band.members.push(userId);
    await band.save();

    res.json({ success: true, message: "Joined the band 🎤", band });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error joining band" });
  }
};

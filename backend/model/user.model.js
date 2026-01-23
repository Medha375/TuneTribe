
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },

  profilePicture: { type: String, default: "" },
  description: { type: String, default: "" },

  gender: { type: String, enum: ["male", "female", "other"] },

  instruments: { type: [String], required: true },  // 🎸 Multiple instruments
  genres: { type: [String], required: true },       // 🎶 Multiple genres

  location: { type: String, default: "" },          // 🌍 For city-based matching
  availability: { type: String, default: "" },      // e.g. "Weekends", "Evenings"

  bands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Band" }], // 🎤 linked bands
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // dusre users ki id

posts:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],

bookmarks:[{type:mongoose.Schema.Types.ObjectId}],
},
{timestamps:true}); 

export const User = mongoose.model('User', userSchema);
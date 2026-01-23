import mongoose from "mongoose";

const bandSchema = new mongoose.Schema({
  bandname: { type: String, required: true, unique: true, trim: true },

  email: { type: String, required: true, unique: true },

  profilePicture: { type: String, default: "" },
  description: { type: String, default: "" },

  location: { type: String },

  teamlead: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  genre: { type: String, required: true },

  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

  lookingForMembers: { type: Boolean, default: false }, // like job openings
  openings: [{ instrument: String, description: String }], // optional detailed openings

}, { timestamps: true });

export const Band = mongoose.model("Band", bandSchema);

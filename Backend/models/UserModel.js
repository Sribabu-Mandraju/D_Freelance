import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timeline: { type: String }, // Can be a custom string like "Jan 2020 - Dec 2021"
  tags: [{ type: String }],
  role: { type: String },
  company: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    userWallet: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rating: { type: Number, default: 0 },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }], // Replace with actual project model
    gigs: [{ type: String }], // Can be strings or change to object later
    experience: [experienceSchema],
    role: {
      type: String,
      enum: ["admin", "client", "bidder"],
      default: "bidder",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

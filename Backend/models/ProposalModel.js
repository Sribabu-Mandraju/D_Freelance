import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    proposalId: { type: String },
    description: { type: String, required: true },
    image: { type: String },
    budget: { type: Number, required: true },
    project_duration: { type: String, required: true },
    userWalletAddress: { type: String, required: true },
    tags: { type: [String], default: [] },
    skills_requirement: { type: [String], required: true },
    bids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Bid",
      default: [],
    },
    accepted_bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isEditable: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);
export default Proposal;

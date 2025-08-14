import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {  // Fixed spelling from "recieverId"
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  proposalId: {  // Changed from projectId to proposalId
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
    required: true,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
}, {
  timestamps: true,
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
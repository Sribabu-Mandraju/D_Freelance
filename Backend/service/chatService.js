// services/chatService.js
import Message from "../models/messageModel.js";

const getProposalMessages = async (proposalId) => {
  try {
    const messages = await Message.find({ proposalId })
      .populate("senderId", "username userWallet") // Populate sender details
      .populate("receiverId", "username userWallet") // Populate receiver details
      .sort({ createdAt: 1 });
    return messages;
  } catch (error) {
    console.error("Error fetching messages for proposal:", error);
    return null;
  }
};

const saveNewMessage = async (messageData) => {
  try {
    const newMessage = new Message(messageData);
    await newMessage.save();
    await newMessage.populate("senderId", "username userWallet");
    return newMessage;
  } catch (error) {
    console.error("Error saving new message:", error);
    return null;
  }
};

export { getProposalMessages, saveNewMessage };
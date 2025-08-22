import Message from "../models/messageModel.js";
import PortfolioScheema from "../models/PortfolioModel.js";
import { getRecieverSocketId, io } from "../socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const walletConnectedUserId = req.user.address;
    const filterUsers = await PortfolioScheema.find({
      // Remove the filter to get all users
    })
      .select(
        "heroSection.name heroSection.profile heroSection.walletAddress"
      )
      .lean();

    const formattedUsers = filterUsers.map((p) => ({
      _id: p.heroSection?.walletAddress, 
      fullname: p.heroSection?.name, 
      profile: p.heroSection?.profile, 
    }));

    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.log("Error in the getUsers For Sidebar", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", msg: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user.address;
    const message = await Message.find({
      $or: [
        {
          senderId: myId,
          recieverId: userToChatId,
        },
        {
          senderId: userToChatId,
          recieverId: myId,
        },
      ],
    }).sort({ createdAt: 1 }); // Ensure messages are sorted by creation time
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessages Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user.address;
    // let imageUrl;
    // if (image) {
    //   const uploadResponse = await cloudinary.uploader.upload(image);
    //   imageUrl = uploadResponse.secure_url;
    // }
    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: image || "", // Use the provided image or an empty string
    });
    await newMessage.save();
     const receiverSocketId=getRecieverSocketId(recieverId);
     if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
     }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in SendMessage Controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
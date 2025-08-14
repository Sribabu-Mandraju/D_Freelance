import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// Import your Mongoose models
import Proposal from "./models/ProposalModel.js";
import User from "./models/UserModel.js";
import Message from "./models/messageModel.js";

const configureSockets = (server) => {
  // WebSocket server setup
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Your frontend URL
      methods: ["GET", "POST"]
    }
  });

  // Middleware to authenticate socket connections using JWT
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error: Token missing'));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Find the user and attach it to the socket object
      const user = await User.findOne({ userWallet: decoded.address });
      if (!user) {
          return next(new Error('Authentication error: User not found'));
      }
      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // WebSocket event handlers
  io.on('connection', (socket) => {
    console.log(`User connected with ID: ${socket.id} (Wallet: ${socket.user.userWallet})`);

    socket.on('joinProposalChat', async (proposalId) => {
      try {
        const proposal = await Proposal.findById(proposalId).populate('accepted_bidder');
        if (!proposal) {
          socket.emit('chatError', 'Proposal not found');
          return;
        }
        
        const userId = socket.user.userWallet.toLowerCase();
        
        const isClient = proposal.user_wallet_address.toLowerCase() === userId;
        const isBidder = proposal.accepted_bidder && proposal.accepted_bidder.userWallet.toLowerCase() === userId;
        
        if (!isClient && !isBidder) {
          socket.emit('chatError', 'Unauthorized to join this chat.');
          return;
        }

        socket.join(proposalId);
        console.log(`User ${userId} joined chat for proposal: ${proposalId}`);
        
        const messages = await Message.find({ proposalId })
          .populate("senderId", "username userWallet")
          .populate("receiverId", "username userWallet")
          .sort({ createdAt: 1 });
        socket.emit('previousMessages', messages);
        
      } catch (error) {
        console.error("Error joining chat:", error);
        socket.emit('chatError', 'Failed to join chat');
      }
    });

    socket.on('sendMessage', async ({ proposalId, senderId, receiverId, text, image }) => {
      try {
        const newMessage = new Message({
          proposalId,
          senderId,
          receiverId,
          text,
          image
        });

        const savedMessage = await newMessage.save();
        await savedMessage.populate("senderId", "username userWallet");
        
        io.to(proposalId).emit('newMessage', savedMessage);
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit('chatError', 'Failed to send message');
      }
    });

    socket.on('typing', (data) => {
      socket.to(data.proposalId).emit('typing', data.username);
    });

    socket.on('stopTyping', (data) => {
      socket.to(data.proposalId).emit('stopTyping', data.username);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected with ID: ${socket.id}`);
    });
  });
};

export default configureSockets;

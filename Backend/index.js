// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import ProposalRoutes from "./Routes/ProposalRoutes.js";
// import BidRoutes from "./routes/BidRoutes.js";
// import UserRoutes from "./routes/UserRoutes.js";
// import authRoutes from "./routes/AuthRoutes.js";
// import HFTtokenRoutes from "./routes/HFTtokenRoutes.js"
// import TreasuryRoutes from "./routes/TreasuryRoutes.js"
// import EscrowRoutes from "./routes/EscrowRoutes.js"
// import ProposalManagerRoutes from "./routes/ProposalManagerRoutes.js"
// import PortfolioRoutes from "./routes/PortfolioRoutes.js"
// import cors from "cors";

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware to parse JSON and enable CORS
// app.use(express.json());
// app.use(cors());

// app.use("/api/proposals", ProposalRoutes);
// app.use("/api/bids", BidRoutes);
// app.use("/api/users", UserRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/hftToken", HFTtokenRoutes);
// app.use("/api/treasury",TreasuryRoutes);
// app.use("/api/escrow",EscrowRoutes)
// app.use("/api/proposalManager",ProposalManagerRoutes)
// app.use("/api/portfolio",PortfolioRoutes)
// // Default route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then((conn) => {
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   })
//   .catch((error) => {
//     console.error(`❌ MongoDB connection error: ${error.message}`);
//     process.exit(1);
//   });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// Import your existing routes
import ProposalRoutes from "./Routes/ProposalRoutes.js";
import BidRoutes from "./routes/BidRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import HFTtokenRoutes from "./routes/HFTtokenRoutes.js"
import TreasuryRoutes from "./routes/TreasuryRoutes.js"
import EscrowRoutes from "./routes/EscrowRoutes.js"
import ProposalManagerRoutes from "./routes/ProposalManagerRoutes.js"
import PortfolioRoutes from "./routes/PortfolioRoutes.js"

// Import the WebSocket configuration
import configureSockets from "./socket.js";

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

// Middleware to parse JSON and enable CORS
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3001","http://localhost:3000"],
  credentials: true // if you want to allow cookies/auth headers
}));

// All your existing routes
app.use("/api/proposals", ProposalRoutes);
app.use("/api/bids", BidRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hftToken", HFTtokenRoutes);
app.use("/api/treasury", TreasuryRoutes);
app.use("/api/escrow", EscrowRoutes)
app.use("/api/proposalManager", ProposalManagerRoutes)
app.use("/api/portfolio", PortfolioRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  })
  .catch((error) => {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  });

// Configure and start the WebSocket server
configureSockets(server);
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

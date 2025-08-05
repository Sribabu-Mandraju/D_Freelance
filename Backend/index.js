import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import cors
import ProposalRoutes from "./Routes/ProposalRoutes.js";
import BidRoutes from "./routes/BidRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ContentRoutes from "./routes/ContentRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use("/api/proposals", ProposalRoutes);
app.use("/api/bids", BidRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/Content", ContentRoutes);

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
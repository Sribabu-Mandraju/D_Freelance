import express from "express";
import {
  getUserBidsWithDetails,
  getUserBidStats,
} from "../controllers/CrossPortfolio.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes (authentication required)
router.get("/user-bids", authMiddleware, getUserBidsWithDetails);
router.get("/user-bid-stats", authMiddleware, getUserBidStats);

export default router;

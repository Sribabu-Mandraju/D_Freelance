import express from "express";
import {
  createBid,
  getAllBids,
  getBidById,
  updateBid,
  deleteBid,
} from "../controllers/BidController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/", getAllBids);
router.get("/:id", getBidById);

// Define specific routes before dynamic ones
router.get("/hello/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Hello from /bids/hello/${id}`);
});

// Protected routes (authentication required)
router.post("/", authMiddleware, createBid);
router.put("/:id", authMiddleware, updateBid);
router.delete("/:id", authMiddleware, deleteBid);

export default router;

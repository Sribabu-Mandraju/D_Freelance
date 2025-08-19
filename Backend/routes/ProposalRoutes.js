import express from "express";
import {
  createProposal,
  getAllProposals,
  getProposalById,
  updateProposal,
  deleteProposal,
  updateProposalId,
  getProposalsByUser,
  searchProposals,
  getProposalStats,
  bulkUpdateProposals,
  // acceptBid
} from "../controllers/ProposalController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/", getAllProposals);
router.get("/search", searchProposals);
router.get("/:id", getProposalById);

// Protected routes (authentication required)
router.post("/", authMiddleware, createProposal);
router.post("/bulk-update", authMiddleware, bulkUpdateProposals); 
router.get("/user/my-proposals", authMiddleware, getProposalsByUser);
router.get("/user/stats", authMiddleware, getProposalStats);  
router.put("/:id", authMiddleware, updateProposal);
router.patch("/:id/proposalId", authMiddleware, updateProposalId);
router.delete("/:id", authMiddleware, deleteProposal);
// router.patch('/:id/accept/:bidId', authMiddleware, acceptBid);

export default router;

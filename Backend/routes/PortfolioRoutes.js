// import express from "express"
// import {
//   createPortfolio,
//   updatePortfolio,
//   deletePortfolio,
//   getAllPortfolios,
//   getPortfolioById,
//   sendOTP,
//   verifyOTP,
//   resendOTP,
// } from "../controllers/PortfolioController.js"
// const router = express.Router()
// // Send OTP for portfolio creation
// router.post("/send-otp", sendOTP)

// // Verify OTP and create portfolio
// router.post("/verify-otp", verifyOTP)

// // Resend OTP
// router.post("/resend-otp", resendOTP)

// // Create new portfolio (direct creation without OTP - kept for backward compatibility)
// router.post("/", createPortfolio)

// // Get all portfolios
// router.get("/getAll", getAllPortfolios)
// router.get("/:id", getPortfolioById)

// // Update portfolio by ID
// router.put("/:id", updatePortfolio)

// // Delete portfolio by ID
// router.delete("/:id", deletePortfolio)

// export default router



import express from 'express';
import { 
  sendOTP, 
  resendOTP, 
  verifyOTP, 
  createPortfolio, 
  getAllPortfolios, 
  getPortfolioByWallet, 
  updatePortfolio, 
  deletePortfolio, 
  addBiddedProposal, 
  addAcceptedProposal, 
  addCreatedProposal, 
  addSavedProposal, 
  addSavedGig, 
  addUserGig 
} from '../controllers/PortfolioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

// OTP Routes
router.post('/otp/send', authMiddleware, sendOTP);
router.post('/otp/resend', authMiddleware, resendOTP);
router.post('/otp/verify', authMiddleware, verifyOTP);

// Portfolio Routes
router.post('/', authMiddleware, createPortfolio);
router.get('/', getAllPortfolios);
router.get('/me', authMiddleware, getPortfolioByWallet);
router.put('/', authMiddleware, updatePortfolio);
router.delete('/', authMiddleware, deletePortfolio);

// Proposal and Gig Routes
router.post('/proposals/bidded', authMiddleware, addBiddedProposal);
router.post('/proposals/accepted', authMiddleware, addAcceptedProposal);
router.post('/proposals/created', authMiddleware, addCreatedProposal);
router.post('/proposals/saved', authMiddleware, addSavedProposal);
router.post('/gigs/saved', authMiddleware, addSavedGig);
router.post('/gigs/user', authMiddleware, addUserGig);

export default router;
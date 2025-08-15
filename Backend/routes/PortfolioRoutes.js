import express from "express"
import {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getAllPortfolios,
  getPortfolioById,
  sendOTP,
  verifyOTP,
  resendOTP,
} from "../controllers/PortfolioController.js"
const router = express.Router()
// Send OTP for portfolio creation
router.post("/send-otp", sendOTP)

// Verify OTP and create portfolio
router.post("/verify-otp", verifyOTP)

// Resend OTP
router.post("/resend-otp", resendOTP)

// Create new portfolio (direct creation without OTP - kept for backward compatibility)
router.post("/", createPortfolio)

// Get all portfolios
router.get("/getAll", getAllPortfolios)
router.get("/:id", getPortfolioById)

// Update portfolio by ID
router.put("/:id", updatePortfolio)

// Delete portfolio by ID
router.delete("/:id", deletePortfolio)

export default router

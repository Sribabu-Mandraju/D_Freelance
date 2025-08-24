import express from "express";
import { getNonce, verifySignature } from "../controllers/AuthControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes
router.get("/health", (req, res) => {
  res.json({ success: true, message: "Auth service is running" });
});
router.post("/get-nonce", getNonce);
router.post("/verify", verifySignature);
router.get("/validate-token", authMiddleware, (req, res) => {
  // If middleware passes, token is valid
  res.json({
    success: true,
    message: "Token is valid",
    user: req.user,
  });
});

export default router;

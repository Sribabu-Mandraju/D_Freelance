import express from 'express';
import { getUserLastClaimTime } from '../contracts/HFTtoken.js';
const router = express.Router();

// Correct route registration
router.get('/last-claim-time/:address', getUserLastClaimTime);
router.get("/hello", async (req,res) => {
    res.send("API is running...");
})

export default router;
import express from 'express';
import { getUserHftTokenData } from '../contracts/HFTtoken.js';
import { getTokenMetaData } from '../contracts/HFTtoken.js';
const router = express.Router();

// Correct route registration
router.get('/userHFTtokenDetails/:address', getUserHftTokenData);
router.get("/tokenMetaData",getTokenMetaData);
router.get("/hello", async (req,res) => {
    res.send("API is running...");
})



export default router;
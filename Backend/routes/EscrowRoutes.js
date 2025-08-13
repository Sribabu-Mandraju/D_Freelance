import express from 'express';
import { getEscrowConfig,getEscrowData } from '../contracts/Escrow.js';
const router = express.Router();

router.get("/config",getEscrowConfig);
router.get("/:address",getEscrowData);

export default router;
import express from 'express';
import { getTreasuryInfo } from '../contracts/Treasury.js';

const router = express.Router();

router.get("/",getTreasuryInfo);

export default router;
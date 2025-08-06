import express from 'express';
import { getNonce,verifySignature } from '../controllers/AuthControllers.js';

const router = express.Router();

// Routes
router.post('/get-nonce', getNonce);
router.post('/verify', verifySignature);

export default router;
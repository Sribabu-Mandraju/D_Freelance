// routes/chatRoutes.js
import express from 'express';
import { getMessagesByProposalId } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js'; // Assuming you have an auth middleware

const router = express.Router();

router.get('/:proposalId', protect, getMessagesByProposalId);

export default router;
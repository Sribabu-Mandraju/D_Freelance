import express from 'express';
import {
  createProposal,
  getAllProposals,
  getProposalById,
  updateProposal,
  deleteProposal,
  // acceptBid
} from '../controllers/ProposalController.js';

const router = express.Router();

router.post('/', createProposal);
router.get('/', getAllProposals);
router.get('/:id', getProposalById);
router.put('/:id', updateProposal);
router.delete('/:id', deleteProposal);
// router.patch('/:id/accept/:bidId', acceptBid);

export default router;

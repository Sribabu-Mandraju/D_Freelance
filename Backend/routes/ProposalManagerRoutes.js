import express from 'express';
import {
  getContractConstants,
  getProposal,
  getAllProposals,
  getPaginatedProposals,
  getDaoMembers,
  getPlatformFee,
  getProposalCount,
  getImprovementProposals,
  getUserProposals
} from '../contracts/ProposalManager.js';


const router = express.Router();

// Constants routes
router.get('/constants', getContractConstants);

// Proposal routes
router.get('/proposals', getAllProposals);
router.get('/proposals/paginated', getPaginatedProposals);
router.get('/proposals/:proposalId', getProposal);

// DAO Member routes
router.get('/members', getDaoMembers);

// Utility routes
router.get('/platform-fee', getPlatformFee);
router.get('/proposal-count', getProposalCount);

// Improvement proposals routes
router.get('/improvement-proposals', getImprovementProposals);

// User-specific routes
router.get('/user/:address/proposals', getUserProposals);

export default router;
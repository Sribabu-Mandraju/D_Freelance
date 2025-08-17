import express from 'express';
import { getEscrowData ,getHftTokenData,getProposalManagerData,getTreasuryData} from '../contracts/admin.js';


const  router = express.Router();

// Route for fetching all admin panel data
router.get("/escrow-data", getEscrowData);
router.get("/hft-token-data", getHftTokenData);
router.get("/proposal-manager-data", getProposalManagerData);
router.get("/treasury-data", getTreasuryData);


export default router;
import express from 'express';
import {
  createBid,
  getAllBids,
  getBidById,
  updateBid,
  deleteBid,
} from '../controllers/BidController.js';

const router = express.Router();

router.post('/', createBid);
router.get('/', getAllBids);
router.get('/:id', getBidById);
router.put('/:id', updateBid);
router.delete('/:id', deleteBid);

export default router;

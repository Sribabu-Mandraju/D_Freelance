
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  createGig,
  getGigById,
  getAllGigs,
  updateGig,
  deleteGig,
} from '../controllers/GigController.js';

const router = express.Router();

// Create gig
router.post('/', authMiddleware, createGig);

// Get all gigs
router.get('/', getAllGigs);

// Get gig by ID
router.get('/:id', getGigById);

// Update gig
router.put('/:id', authMiddleware, updateGig);

// Delete gig
router.delete('/:id', authMiddleware, deleteGig);

export default router;

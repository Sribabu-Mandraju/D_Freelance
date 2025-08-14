import express from 'express';
import {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  getAllPortfolios,
  getPortfolioById
} from "../controllers/PortfolioController.js"

const router = express.Router();

// Create new portfolio
router.post('/', createPortfolio);



// Get all portfolios
router.get('/getAll', getAllPortfolios);
router.get("/:id",getPortfolioById);
// Update portfolio by ID
router.put('/:id', updatePortfolio);

// Delete portfolio by ID
router.delete('/:id', deletePortfolio);

export default router;

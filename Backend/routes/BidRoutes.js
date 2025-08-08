import express from "express";
import {
  createBid,
  getAllBids,
  getBidById,
  updateBid,
  deleteBid,
} from "../controllers/BidController.js";
import { getUserLastClaimTime } from "../contracts/HFTtoken.js";

const router = express.Router();


router.post("/", createBid);
router.get("/", getAllBids);

// Define specific routes before dynamic ones
router.get('/hello/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Hello from /bids/hello/${id}`);

});

router.get("/token/:address", getUserLastClaimTime);

// Define dynamic ones last
router.get("/:id", getBidById);
router.put("/:id", updateBid);
router.delete("/:id", deleteBid);

export default router;

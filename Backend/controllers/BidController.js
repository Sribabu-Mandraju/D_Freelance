import Bid from "../models/BidModel.js";
import mongoose from "mongoose";

// @desc    Create a bid
// @route   POST /api/bids
export const createBid = async (req, res) => {
  try {
    let { cover_letter, bid_amount, proposal_id } = req.body;

    // Get wallet address from authenticated user

    const wallet_address = req.user.address;
    console.log(wallet_address);
    if (!wallet_address) {
      return res
        .status(400)
        .json({ message: "User wallet address is required" });
    }

    // Validation
    if (!cover_letter || !bid_amount || !proposal_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Sanitization
    const sanitizedWalletAddress = wallet_address.trim();
    cover_letter = cover_letter.trim();
    bid_amount = Number(bid_amount);

    if (sanitizedWalletAddress === "" || cover_letter === "") {
      return res
        .status(400)
        .json({ message: "Wallet address and cover letter cannot be empty" });
    }

    if (isNaN(bid_amount) || bid_amount <= 0) {
      return res
        .status(400)
        .json({ message: "Bid amount must be a positive number" });
    }

    if (!mongoose.Types.ObjectId.isValid(proposal_id)) {
      return res.status(400).json({ message: "Invalid proposal ID" });
    }

    const bid = new Bid({
      wallet_address: sanitizedWalletAddress,
      cover_letter,
      bid_amount,
      proposal_id,
    });

    await bid.save();
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all bids
// @route   GET /api/bids
export const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single bid by ID
// @route   GET /api/bids/:id
export const getBidById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid bid ID" });
    }

    const bid = await Bid.findById(id).populate("proposal_id");
    if (!bid) return res.status(404).json({ message: "Bid not found" });
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a bid
// @route   PUT /api/bids/:id
export const updateBid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid bid ID" });
    }

    // Check if the authenticated user owns the bid
    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    if (!req.user || req.user.address !== bid.wallet_address) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this bid" });
    }

    const updateData = { ...req.body };

    // Remove wallet_address from update data since it should not be changeable
    delete updateData.wallet_address;

    if (updateData.cover_letter)
      updateData.cover_letter = updateData.cover_letter.trim();
    if (updateData.bid_amount) {
      updateData.bid_amount = Number(updateData.bid_amount);
      if (isNaN(updateData.bid_amount) || updateData.bid_amount <= 0) {
        return res
          .status(400)
          .json({ message: "Bid amount must be a positive number" });
      }
    }
    if (
      updateData.proposal_id &&
      !mongoose.Types.ObjectId.isValid(updateData.proposal_id)
    ) {
      return res.status(400).json({ message: "Invalid proposal ID" });
    }

    const updatedBid = await Bid.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(updatedBid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a bid
// @route   DELETE /api/bids/:id
export const deleteBid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid bid ID" });
    }

    // Check if the authenticated user owns the bid
    const bid = await Bid.findById(id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    if (!req.user || req.user.address !== bid.wallet_address) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this bid" });
    }

    await Bid.findByIdAndDelete(id);
    res.status(200).json({ message: "Bid deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Bid from '../models/BidModel.js';

// @desc    Create a bid
// @route   POST /api/bids
export const createBid = async (req, res) => {
  try {
    const { wallet_address, cover_letter, bid_amount, proposal_id } = req.body;

    const bid = new Bid({
      wallet_address,
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
    const bids = await Bid.find().populate('proposal_id');
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single bid by ID
// @route   GET /api/bids/:id
export const getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('proposal_id');
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a bid
// @route   PUT /api/bids/:id
export const updateBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a bid
// @route   DELETE /api/bids/:id
export const deleteBid = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });
    res.status(200).json({ message: 'Bid deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

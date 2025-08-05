import Proposal from '../models/ProposalModel.js';

// @desc    Create new proposal
// @route   POST /api/proposals
export const createProposal = async (req, res) => {
  try {
    const proposal = await Proposal.create(req.body);
    res.status(201).json(proposal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all proposals
// @route   GET /api/proposals
export const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find().populate('bids').populate('accepted_bidder');
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single proposal by ID
// @route   GET /api/proposals/:id
export const getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate('bids').populate('accepted_bidder');
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update proposal by ID
// @route   PUT /api/proposals/:id
export const updateProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    res.status(200).json(proposal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete proposal by ID
// @route   DELETE /api/proposals/:id
export const deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });
    res.status(200).json({ message: 'Proposal deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Accept a bid
// @route   PATCH /api/proposals/:id/accept/:bidId
export const acceptBid = async (req, res) => {
  const { id, bidId } = req.params;
  try {
    const proposal = await Proposal.findById(id);
    if (!proposal) return res.status(404).json({ error: 'Proposal not found' });

    proposal.accepted_bidder = bidId;
    await proposal.save();

    res.status(200).json({ message: 'Bid accepted successfully', proposal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

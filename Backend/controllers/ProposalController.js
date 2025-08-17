import Proposal from '../models/ProposalModel.js';

// Utility functions (reused from your example)
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const hasPayload = (obj) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;

// Create a new proposal
export const createProposal = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      budget,
      project_duration,
      tags,
      skills_requirement,
    } = req.body;

    // Required fields validation
    if (!title || !description || !budget || !project_duration || !skills_requirement) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    // Extract walletAddress from authenticated user
    const walletAddress = req.user.address;
    if (!walletAddress) {
      return res.status(400).json({ message: 'User wallet address is required' });
    }

    const payload = {
      userWalletAddress: walletAddress,
      title,
      description,
      budget,
      project_duration,
      image: image || undefined,
      tags: toArray(tags),
      skills_requirement: toArray(skills_requirement),
      isEditable: true, // Default to true for new proposals
    };

    const newProposal = new Proposal(payload);
    const savedProposal = await newProposal.save();
    console.log('Proposal created successfully:', savedProposal.userWalletAddress);

    return res.status(201).json(savedProposal);
  } catch (error) {
    console.error('❌ Create proposal error:', error);
    return res.status(500).json({ message: error.message });
  }
};

// Update a proposal
export const updateProposal = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      budget,
      project_duration,
      tags,
      skills_requirement,
      isEditable,
    } = req.body;

    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    // Check if the authenticated user owns the proposal
    if (!req.user || req.user.address !== proposal.userWalletAddress) {
      return res.status(403).json({ message: 'Unauthorized to update this proposal' });
    }

    // Check if the proposal is editable
    if (proposal.isEditable === false) {
      return res.status(400).json({ message: 'Proposal is not editable' });
    }

    // Update fields if provided
    if (title !== undefined) proposal.title = title;
    if (description !== undefined) proposal.description = description;
    if (image !== undefined) proposal.image = image;
    if (budget !== undefined) proposal.budget = budget;
    if (project_duration !== undefined) proposal.project_duration = project_duration;
    if (tags !== undefined) proposal.tags = toArray(tags);
    if (skills_requirement !== undefined) proposal.skills_requirement = toArray(skills_requirement);
    if (isEditable !== undefined) proposal.isEditable = Boolean(isEditable);

    const updatedProposal = await proposal.save();
    return res.json(updatedProposal);
  } catch (error) {
    console.error('❌ Update proposal error:', error);
    return res.status(500).json({ message: 'Server error while updating proposal' });
  }
};

// Get a proposal by ID
export const getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate('bids', 'bidder amount description') // Populate bids with relevant fields
      .populate('accepted_bidder', 'name email'); // Populate accepted bidder info

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    return res.json(proposal);
  } catch (error) {
    console.error('❌ Get proposal by ID error:', error);
    return res.status(500).json({ message: 'Server error while fetching proposal' });
  }
};

// Get all proposals
export const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({})
      .populate('bids', 'bidder amount description')
      .populate('accepted_bidder', 'name email');

    return res.json(proposals);
  } catch (error) {
    console.error('❌ Get all proposals error:', error);
    return res.status(500).json({ message: 'Server error while fetching proposals' });
  }
};

// Delete a proposal
export const deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    // Check if the authenticated user owns the proposal
    if (!req.user || req.user.address !== proposal.userWalletAddress) {
      return res.status(403).json({ message: 'Unauthorized to delete this proposal' });
    }

    await proposal.deleteOne();
    return res.json({ message: 'Proposal removed' });
  } catch (error) {
    console.error('❌ Delete proposal error:', error);
    return res.status(500).json({ message: 'Server error while deleting proposal' });
  }
};
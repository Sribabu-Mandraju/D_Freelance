import Proposal from "../models/ProposalModel.js";
import { validationResult, body } from "express-validator";

//  Validation middleware (used inline)
export const validateProposal = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("budget").isNumeric().withMessage("Budget must be a number"),
  body("project_duration")
    .trim()
    .notEmpty()
    .withMessage("Project duration is required"),
  body("user_wallet_address")
    .trim()
    .notEmpty()
    .withMessage("Wallet address is required"),
  body("skills_requirement")
    .isArray({ min: 1 })
    .withMessage("Skills requirement must be a non-empty array"),
];

//  Create Proposal
export const createProposal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const proposal = await Proposal.create(req.body);
    res.status(201).json(proposal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  Get All Proposals
export const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find()
      .populate("bids")
      .populate("accepted_bidder");
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get Single Proposal
export const getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate("bids")
      .populate("accepted_bidder");
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });
    res.status(200).json(proposal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Update Proposal
export const updateProposal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const proposal = await Proposal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });
    res.status(200).json(proposal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  Delete Proposal
export const deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });
    res.status(200).json({ message: "Proposal deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Accept Bid
export const acceptBid = async (req, res) => {
  const { id, bidId } = req.params;
  try {
    const proposal = await Proposal.findById(id);
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });

    proposal.accepted_bidder = bidId;
    await proposal.save();

    res.status(200).json({ message: "Bid accepted successfully", proposal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

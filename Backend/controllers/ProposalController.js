import Proposal from "../models/ProposalModel.js";
import Portfolio from "../models/PortfolioModel.js";
import { ethers } from "ethers";
import ProposalManager_ABI from '../abis/ProposalManager_ABI.json' with { type: 'json' };

// Contract configuration
const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
const ProposalManager_contractAddress = "0x9e002323F46D6908EC4ef5444f1Bd0F67AF9Cf10";
const ProposalManager_contract = new ethers.Contract(
  ProposalManager_contractAddress,
  ProposalManager_ABI,
  provider
);

// Utility functions (reused from your example)
const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const hasPayload = (obj) =>
  obj && typeof obj === "object" && Object.keys(obj).length > 0;

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
    if (
      !title ||
      !description ||
      !budget ||
      !project_duration ||
      !skills_requirement
    ) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields" });
    }

    // Extract walletAddress from authenticated user
    const walletAddress = req.user.address;
    console.log(walletAddress);
    if (!walletAddress) {
      return res
        .status(400)
        .json({ message: "User wallet address is required" });
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
    console.log(
      "Proposal created successfully:",
      savedProposal.userWalletAddress
    );

    // Add proposal to user's portfolio (similar to GigController)
    try {
      const portfolio = await Portfolio.findOne({
        "heroSection.walletAddress": walletAddress,
      });
      if (portfolio && !portfolio.userProposals?.includes(savedProposal._id)) {
        if (!portfolio.userProposals) portfolio.userProposals = [];
        portfolio.userProposals.push(savedProposal._id);
        await portfolio.save();
        console.log("Proposal added to portfolio successfully");
      }
    } catch (portfolioError) {
      console.warn("⚠️ Portfolio update failed:", portfolioError.message);
      // Don't fail the main request if portfolio update fails
    }

    return res.status(201).json(savedProposal);
  } catch (error) {
    console.error("❌ Create proposal error:", error);
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
      return res.status(404).json({ message: "Proposal not found" });
    }

    // Check if the authenticated user owns the proposal
    if (!req.user || req.user.address !== proposal.userWalletAddress) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this proposal" });
    }

    // Check if the proposal is editable
    if (proposal.isEditable === false) {
      return res.status(400).json({ message: "Proposal is not editable" });
    }

    // Update fields if provided
    if (title !== undefined) proposal.title = title;
    if (description !== undefined) proposal.description = description;
    if (image !== undefined) proposal.image = image;
    if (budget !== undefined) proposal.budget = budget;
    if (project_duration !== undefined)
      proposal.project_duration = project_duration;
    if (tags !== undefined) proposal.tags = toArray(tags);
    if (skills_requirement !== undefined)
      proposal.skills_requirement = toArray(skills_requirement);
    if (isEditable !== undefined) proposal.isEditable = Boolean(isEditable);

    const updatedProposal = await proposal.save();
    return res.json(updatedProposal);
  } catch (error) {
    console.error("❌ Update proposal error:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating proposal" });
  }
};

// Update proposalId for a specific proposal
export const updateProposalId = async (req, res) => {
  try {
    const { proposalId } = req.body;
    const { id } = req.params;

    if (!proposalId) {
      return res.status(400).json({ message: "Proposal ID is required" });
    }

    const proposal = await Proposal.findById(id);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // Check if the authenticated user owns the proposal
    if (!req.user || req.user.address !== proposal.userWalletAddress) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this proposal" });
    }

    proposal.proposalId = proposalId;
    const updatedProposal = await proposal.save();

    return res.json({
      message: "Proposal ID updated successfully",
      proposal: updatedProposal
    });
  } catch (error) {
    console.error("❌ Update proposal ID error:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating proposal ID" });
  }
};

// Get a proposal by ID with contract data if available
export const getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate("bids", "bidder amount description") // Populate bids with relevant fields
      .populate("accepted_bidder", "name email"); // Populate accepted bidder info

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // If proposalId exists, fetch contract data
    let contractData = null;
    if (proposal.proposalId) {
      try {
        const contractProposal = await ProposalManager_contract.getProposal(proposal.proposalId);
        
        contractData = {
          contractProposalId: contractProposal.id.toString(),
          client: contractProposal.client,
          bidder: contractProposal.bidder,
          startTime: contractProposal.startTime.toString(),
          endTime: contractProposal.endTime.toString(),
          budget: contractProposal.budget.toString(),
          bidAmount: contractProposal.bidAmount.toString(),
          state: contractProposal.state.toString()
        };
      } catch (contractError) {
        console.error("❌ Contract data fetch error:", contractError);
        // Contract data fetch failed, but don't fail the entire request
        contractData = { error: "Failed to fetch contract data" };
      }
    }

    const response = {
      ...proposal.toObject(),
      contractData
    };

    return res.json(response);
  } catch (error) {
    console.error("❌ Get proposal by ID error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching proposal" });
  }
};

// Get all proposals
export const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({})
      .populate("bids", "bidder amount description")
      .populate("accepted_bidder", "name email");

    return res.json(proposals);
  } catch (error) {
    console.error("❌ Get all proposals error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching proposals" });
  }
};

// Get proposals by user wallet address
export const getProposalsByUser = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    if (!walletAddress) {
      return res
        .status(400)
        .json({ message: "User wallet address is required" });
    }

    const proposals = await Proposal.find({ userWalletAddress: walletAddress })
      .populate("bids", "bidder amount description")
      .populate("accepted_bidder", "name email")
      .sort({ createdAt: -1 }); // Sort by newest first

    return res.json(proposals);
  } catch (error) {
    console.error("❌ Get proposals by user error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching user proposals" });
  }
};

// Delete a proposal
export const deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // Check if the authenticated user owns the proposal
    if (!req.user || req.user.address !== proposal.userWalletAddress) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this proposal" });
    }

    await proposal.deleteOne();
    return res.json({ message: "Proposal removed" });
  } catch (error) {
    console.error("❌ Delete proposal error:", error);
    return res
      .status(500)
      .json({ message: "Server error while deleting proposal" });
  }
};

// Search and filter proposals
export const searchProposals = async (req, res) => {
  try {
    const {
      minBudget,
      maxBudget,
      skills,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    // Build filter object
    const filter = {};
    
    // Budget range filter
    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) filter.budget.$gte = Number(minBudget);
      if (maxBudget) filter.budget.$lte = Number(maxBudget);
    }
    
    // Skills filter
    if (skills) {
      const skillsArray = Array.isArray(skills) ? skills : [skills];
      filter.skills_requirement = { $in: skillsArray.map(s => new RegExp(s, "i")) };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const proposals = await Proposal.find(filter)
      .populate("bids", "bidder amount description")
      .populate("accepted_bidder", "name email")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Proposal.countDocuments(filter);

    return res.json({
      proposals,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProposals: total,
        hasNextPage: skip + proposals.length < total,
        hasPrevPage: Number(page) > 1,
      },
    });
  } catch (error) {
    console.error("❌ Search proposals error:", error);
    return res
      .status(500)
      .json({ message: "Server error while searching proposals" });
  }
};

// Get proposal statistics for a user
export const getProposalStats = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    if (!walletAddress) {
      return res
        .status(400)
        .json({ message: "User wallet address is required" });
    }

    const stats = await Proposal.aggregate([
      { $match: { userWalletAddress: walletAddress } },
      {
        $group: {
          _id: null,
          totalProposals: { $sum: 1 },
          totalBudget: { $sum: "$budget" },
          avgBudget: { $avg: "$budget" },
        }
      },
      {
        $project: {
          _id: 0,
          totalProposals: 1,
          totalBudget: 1,
          avgBudget: { $round: ["$avgBudget", 2] },
        }
      }
    ]);

    // Get recent proposals for timeline
    const recentProposals = await Proposal.find({ userWalletAddress: walletAddress })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title createdAt budget");

    const response = {
      stats: stats[0] || {
        totalProposals: 0,
        totalBudget: 0,
        avgBudget: 0,
      },
      recentProposals,
      summary: {
        message: `You have ${stats[0]?.totalProposals || 0} proposals with a total budget of $${stats[0]?.totalBudget || 0}`,
        lastUpdated: new Date().toISOString()
      }
    };

    return res.json(response);
  } catch (error) {
    console.error("❌ Get proposal stats error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching proposal statistics" });
  }
};

// Bulk update proposals
export const bulkUpdateProposals = async (req, res) => {
  try {
    const { proposalIds, updates } = req.body;
    const walletAddress = req.user.address;

    if (!walletAddress) {
      return res
        .status(400)
        .json({ message: "User wallet address is required" });
    }

    if (!proposalIds || !Array.isArray(proposalIds) || proposalIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Proposal IDs array is required" });
    }

    if (!updates || typeof updates !== "object") {
      return res
        .status(400)
        .json({ message: "Updates object is required" });
    }

    // Verify all proposals belong to the authenticated user
    const proposals = await Proposal.find({
      _id: { $in: proposalIds },
      userWalletAddress: walletAddress
    });

    if (proposals.length !== proposalIds.length) {
      return res
        .status(403)
        .json({ message: "Some proposals not found or unauthorized" });
    }

    // Prepare update operations
    const updateOperations = proposalIds.map(id => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: updates },
        upsert: false
      }
    }));

    // Perform bulk update
    const result = await Proposal.bulkWrite(updateOperations);

    return res.json({
      message: "Bulk update completed successfully",
      result: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
        upsertedCount: result.upsertedCount
      },
      updatedProposalIds: proposalIds
    });
  } catch (error) {
    console.error("❌ Bulk update proposals error:", error);
    return res
      .status(500)
      .json({ message: "Server error while performing bulk update" });
  }
};

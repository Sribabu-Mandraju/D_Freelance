import Proposal from "../models/ProposalModel.js";
import Portfolio from "../models/PortfolioModel.js";
import { ethers } from "ethers";
import ProposalManager_ABI from '../abis/ProposalManager_ABI.json' with { type: 'json' };
import mongoose from "mongoose";
import Bid from "../models/BidModel.js";
// Contract configuration
const provider = new ethers.JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/vt_tNAcA-byKs7AxeH4Ze");
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
    const { id } = req.params;
    
    // Validate that the ID is a valid MongoDB ObjectId
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ 
        message: "Invalid proposal ID format. ID must be a 24-character hexadecimal string." 
      });
    }

    const proposal = await Proposal.findById(id)
      .populate("bids", "bidder amount description") // Populate bids with relevant fields
      .populate("accepted_bidder", "name email"); // Populate accepted bidder info

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    console.log("🔍 Proposal found:", {
      id: proposal._id,
      userWalletAddress: proposal.userWalletAddress,
      title: proposal.title
    });

    // Fetch user portfolio details using userWalletAddress
    let userPortfolioDetails = null;
    if (proposal.userWalletAddress) {
      try {
        console.log("🔍 Searching portfolio for wallet:", proposal.userWalletAddress);
        
        const portfolio = await Portfolio.findOne({
          "heroSection.walletAddress": proposal.userWalletAddress
        });
        
        console.log("🔍 Portfolio search result:", portfolio ? "Found" : "Not found");
        
        if (portfolio) {
          userPortfolioDetails = {
            name: portfolio.heroSection.name,
            profile: portfolio.heroSection.profile,
            email: portfolio.contactInfo.email
          };
          console.log("✅ Portfolio details extracted:", userPortfolioDetails);
        } else {
          console.log("⚠️ No portfolio found for wallet:", proposal.userWalletAddress);
          // Let's also check if there are any portfolios in the database
          const totalPortfolios = await Portfolio.countDocuments();
          console.log("📊 Total portfolios in database:", totalPortfolios);
          
          // Check if there are any portfolios with different wallet address format
          const samplePortfolio = await Portfolio.findOne({});
          if (samplePortfolio) {
            console.log("📋 Sample portfolio wallet format:", samplePortfolio.heroSection?.walletAddress);
          }
        }
      } catch (portfolioError) {
        console.error("❌ Portfolio fetch error:", portfolioError);
        // Portfolio fetch failed, but don't fail the entire request
        userPortfolioDetails = { error: "Failed to fetch user portfolio details" };
      }
    } else {
      console.log("⚠️ Proposal has no userWalletAddress");
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
      userPortfolioDetails,
      contractData
    };

    console.log("📤 Final response userPortfolioDetails:", userPortfolioDetails);

    return res.json(response);
  } catch (error) {
    console.error("❌ Get proposal by ID error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching proposal" });
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

// Get proposals where a specific user has placed bids
export const getProposalsByBidderWallet = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    if (!walletAddress) {
      return res
        .status(400)
        .json({ message: "Wallet address is required" });
    }

    console.log(`🔍 Searching for proposals where user ${walletAddress} has placed bids`);

    // First, find all bids by this user
    // const Bid = mongoose.model("Bid");
    const userBids = await Bid.find({ wallet_address: walletAddress });
    console.log("userBids",userBids);
    
    console.log(`🔍 Total bids found for wallet ${walletAddress}: ${userBids.length}`);

    if (userBids.length === 0) {
      return res.json([]);
    }

    // Extract proposal IDs from the bids
    const proposalIds = userBids.map(bid => bid.proposal_id);
    console.log(`🔍 Proposal IDs found: ${proposalIds.length}`);

    // Fetch all proposals where the user has placed bids
    const proposals = await Proposal.find({ _id: { $in: proposalIds } })
      .populate("bids", "bidder amount description")
      .populate("accepted_bidder", "name email");

    console.log(`🔍 Total proposals found for bids: ${proposals.length}`);

    // Fetch user portfolio details and contract data for each proposal
    const proposalsWithDetails = await Promise.all(
      proposals.map(async (proposal) => {
        let userPortfolioDetails = null;
        let contractData = null;
        
        // Fetch user portfolio details
        if (proposal.userWalletAddress) {
          try {
            const portfolio = await Portfolio.findOne({
              "heroSection.walletAddress": proposal.userWalletAddress
            });
            
            if (portfolio) {
              userPortfolioDetails = {
                name: portfolio.heroSection.name,
                profile: portfolio.heroSection.profile,
                email: portfolio.contactInfo.email
              };
            }
          } catch (portfolioError) {
            console.error(`❌ Portfolio fetch error for proposal ${proposal._id}:`, portfolioError);
            userPortfolioDetails = { error: "Failed to fetch user portfolio details" };
          }
        }

        // Fetch contract data if proposalId exists
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
            console.error(`❌ Contract data fetch error for proposal ${proposal._id}:`, contractError);
            contractData = { error: "Failed to fetch contract data" };
          }
        }

        // Find the user's specific bid for this proposal
        const userBid = userBids.find(bid => 
          bid.proposal_id.toString() === proposal._id.toString()
        );

        return {
          ...proposal.toObject(),
          userPortfolioDetails,
          contractData,
          userBid: userBid ? {
            bidAmount: userBid.bid_amount,
            coverLetter: userBid.cover_letter,
            createdAt: userBid.createdAt
          } : null
        };
      })
    );

    console.log(`📊 Final result - proposals where user ${walletAddress} has bid: ${proposalsWithDetails.length}`);

    return res.json(proposalsWithDetails);
  } catch (error) {
    console.error("❌ Get proposals by bidder wallet error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching proposals by bidder wallet" });
  }
};

// Get proposals by user wallet address (for any user, not just authenticated user)
export const getProposalsByUserWallet = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    if (!walletAddress) {
      return res
        .status(400)
        .json({ message: "Wallet address is required" });
    }

    console.log(`🔍 Searching for proposals with userWalletAddress: ${walletAddress}`);

    const proposals = await Proposal.find({ userWalletAddress: walletAddress })
      .populate("bids", "bidder amount description")
      .populate("accepted_bidder", "name email");

    console.log(`🔍 Total proposals found for wallet ${walletAddress}: ${proposals.length}`);

    // Fetch user portfolio details and contract data for each proposal
    const proposalsWithDetails = await Promise.all(
      proposals.map(async (proposal) => {
        let userPortfolioDetails = null;
        let contractData = null;
        
        // Fetch user portfolio details
        if (proposal.userWalletAddress) {
          try {
            const portfolio = await Portfolio.findOne({
              "heroSection.walletAddress": proposal.userWalletAddress
            });
            
            if (portfolio) {
              userPortfolioDetails = {
                name: portfolio.heroSection.name,
                profile: portfolio.heroSection.profile,
                email: portfolio.contactInfo.email
              };
            }
          } catch (portfolioError) {
            console.error(`❌ Portfolio fetch error for proposal ${proposal._id}:`, portfolioError);
            userPortfolioDetails = { error: "Failed to fetch user portfolio details" };
          }
        }

        // Fetch contract data if proposalId exists
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
            console.error(`❌ Contract data fetch error for proposal ${proposal._id}:`, contractError);
            contractData = { error: "Failed to fetch contract data" };
          }
        }

        return {
          ...proposal.toObject(),
          userPortfolioDetails,
          contractData
        };
      })
    );

    console.log(`📊 Final result - proposals for wallet ${walletAddress}: ${proposalsWithDetails.length}`);

    return res.json(proposalsWithDetails);
  } catch (error) {
    console.error("❌ Get proposals by user wallet error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching proposals by user wallet" });
  }
};

// Get accepted proposals for the authenticated user (where they are the bidder)
export const getAcceptedProposals = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    if (!walletAddress) {
      return res
        .status(400)
        .json({ message: "User wallet address is required" });
    }

    console.log(`🔍 Searching for accepted proposals where user ${walletAddress} is the bidder`);

    const proposals = await Proposal.find({})
      .populate("bids", "bidder amount description")
      .populate("accepted_bidder", "name email");

    console.log(`🔍 Total proposals found: ${proposals.length}`);

    // Fetch user portfolio details and contract data for each proposal, then filter by bidder
    const proposalsWithDetails = await Promise.all(
      proposals.map(async (proposal) => {
        let userPortfolioDetails = null;
        let contractData = null;
        
        // Fetch user portfolio details
        if (proposal.userWalletAddress) {
          try {
            const portfolio = await Portfolio.findOne({
              "heroSection.walletAddress": proposal.userWalletAddress
            });
            
            if (portfolio) {
              userPortfolioDetails = {
                name: portfolio.heroSection.name,
                profile: portfolio.heroSection.profile,
                email: portfolio.contactInfo.email
              };
            }
          } catch (portfolioError) {
            console.error(`❌ Portfolio fetch error for proposal ${proposal._id}:`, portfolioError);
            userPortfolioDetails = { error: "Failed to fetch user portfolio details" };
          }
        }

        // Fetch contract data if proposalId exists
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
            console.error(`❌ Contract data fetch error for proposal ${proposal._id}:`, contractError);
            contractData = { error: "Failed to fetch contract data" };
          }
        }

        return {
          ...proposal.toObject(),
          userPortfolioDetails,
          contractData
        };
      })
    );

    // Filter proposals where the authenticated user is the bidder
    const acceptedProposals = proposalsWithDetails.filter(proposal => {
      // Only include proposals that have contract data and where the user is the bidder
      return proposal.contractData && 
             !proposal.contractData.error && 
             proposal.contractData.bidder.toLowerCase() === walletAddress.toLowerCase();
    });

    console.log(`📊 Final result - accepted proposals for user ${walletAddress}: ${acceptedProposals.length}`);

    return res.json(acceptedProposals);
  } catch (error) {
    console.error("❌ Get accepted proposals error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching accepted proposals" });
  }
};

// Get proposals by contract state
export const getProposalsByContractState = async (req, res) => {
  try {
    const { state = 1 } = req.query; // Default to state 1, but allow query param override
    
    const proposals = await Proposal.find({})
      .populate("bids", "bidder amount description")
      .populate("accepted_bidder", "name email");

    console.log(`🔍 Total proposals found: ${proposals.length}, filtering by contract state: ${state}`);

    // Fetch user portfolio details and contract data for each proposal, then filter by state
    const proposalsWithDetails = await Promise.all(
      proposals.map(async (proposal) => {
        let userPortfolioDetails = null;
        let contractData = null;
        
        // Fetch user portfolio details
        if (proposal.userWalletAddress) {
          try {
            const portfolio = await Portfolio.findOne({
              "heroSection.walletAddress": proposal.userWalletAddress
            });
            
            if (portfolio) {
              userPortfolioDetails = {
                name: portfolio.heroSection.name,
                profile: portfolio.heroSection.profile,
                email: portfolio.contactInfo.email
              };
            }
          } catch (portfolioError) {
            console.error(`❌ Portfolio fetch error for proposal ${proposal._id}:`, portfolioError);
            userPortfolioDetails = { error: "Failed to fetch user portfolio details" };
          }
        }

        // Fetch contract data if proposalId exists
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
            console.error(`❌ Contract data fetch error for proposal ${proposal._id}:`, contractError);
            contractData = { error: "Failed to fetch contract data" };
          }
        }

        return {
          ...proposal.toObject(),
          userPortfolioDetails,
          contractData
        };
      })
    );

    // Filter proposals by contract state
    const filteredProposals = proposalsWithDetails.filter(proposal => {
      // Only include proposals that have contract data and match the specified state
      return proposal.contractData && 
             !proposal.contractData.error && 
             Number(proposal.contractData.state) === Number(state);
    });

    console.log(`📊 Final result - proposals with contract state ${state}: ${filteredProposals.length}`);

    return res.json(filteredProposals);
  } catch (error) {
    console.error("❌ Get proposals by contract state error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching proposals by contract state" });
  }
};

// Get all proposals
export const getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({})
      .populate("bids", "bidder amount description")
      .populate("accepted_bidder", "name email");

    console.log("🔍 Total proposals found:", proposals.length);

    // Fetch user portfolio details and contract data for each proposal
    const proposalsWithDetails = await Promise.all(
      proposals.map(async (proposal) => {
        let userPortfolioDetails = null;
        let contractData = null;
        
        // Fetch user portfolio details
        if (proposal.userWalletAddress) {
          try {
            console.log(`🔍 Searching portfolio for proposal ${proposal._id} with wallet:`, proposal.userWalletAddress);
            
            const portfolio = await Portfolio.findOne({
              "heroSection.walletAddress": proposal.userWalletAddress
            });
            
            if (portfolio) {
              userPortfolioDetails = {
                name: portfolio.heroSection.name,
                profile: portfolio.heroSection.profile,
                email: portfolio.contactInfo.email
              };
              console.log(`✅ Portfolio details found for proposal ${proposal._id}:`, userPortfolioDetails);
            } else {
              console.log(`⚠️ No portfolio found for proposal ${proposal._id} with wallet:`, proposal.userWalletAddress);
            }
          } catch (portfolioError) {
            console.error(`❌ Portfolio fetch error for proposal ${proposal._id}:`, portfolioError);
            // Portfolio fetch failed, but don't fail the entire request
            userPortfolioDetails = { error: "Failed to fetch user portfolio details" };
          }
        } else {
          console.log(`⚠️ Proposal ${proposal._id} has no userWalletAddress`);
        }

        // Fetch contract data if proposalId exists
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
            console.log(`✅ Contract data fetched for proposal ${proposal._id}:`, contractData);
          } catch (contractError) {
            console.error(`❌ Contract data fetch error for proposal ${proposal._id}:`, contractError);
            // Contract data fetch failed, but don't fail the entire request
            contractData = { error: "Failed to fetch contract data" };
          }
        } else {
          console.log(`⚠️ Proposal ${proposal._id} has no proposalId`);
        }

        return {
          ...proposal.toObject(),
          userPortfolioDetails,
          contractData
        };
      })
    );

    console.log("📊 Final result - proposals with user details and contract data:", proposalsWithDetails.length);

    return res.json(proposalsWithDetails);
  } catch (error) {
    console.error("❌ Get all proposals error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching proposals" });
  }
};

import Bid from "../models/BidModel.js";
import Proposal from "../models/ProposalModel.js";
import Portfolio from "../models/PortfolioModel.js";
import { ethers } from "ethers";
import ProposalManager_ABI from '../abis/ProposalManager_ABI.json' with { type: 'json' };

// Contract configuration
const provider = new ethers.JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/vt_tNAcA-byKs7AxeH4Ze");
const ProposalManager_contractAddress = "0x9e002323F46D6908EC4ef5444f1Bd0F67AF9Cf10";
const ProposalManager_contract = new ethers.Contract(
  ProposalManager_contractAddress,
  ProposalManager_ABI,
  provider
);

/**
 * Get all bids for a specific user wallet address
 * Fetches bid details, proposal information, and contract data 
 */
export const getUserBidsWithDetails = async (req, res) => {
  try {
    // Get wallet address from authenticated user instead of params
    const walletAddress = req.user?.address;
    
    if (!walletAddress) {
      return res.status(400).json({ 
        success: false,
        message: "User wallet address not found in authentication token" 
      });
    }

    // Convert to lowercase for consistent matching
    const normalizedWalletAddress = walletAddress.toLowerCase();

    console.log(`🔍 Fetching bids for authenticated user wallet: ${normalizedWalletAddress}`);

    // Step 1: Find all bids by this user
    const userBids = await Bid.find({ 
      wallet_address: { 
        $regex: new RegExp(`^${normalizedWalletAddress}$`, 'i') 
      } 
    });

    console.log(`🔍 Found ${userBids.length} bids for wallet ${normalizedWalletAddress}`);

    if (userBids.length === 0) {
      return res.json({
        success: true,
        message: "No bids found for this wallet address",
        data: [],
        totalBids: 0
      });
    }

    // Step 2: Extract proposal IDs from the bids
    const proposalIds = userBids.map(bid => bid.proposal_id);
    console.log(`🔍 Proposal IDs to fetch:`, proposalIds);

    // Step 3: Fetch all proposals where the user has placed bids
    const proposals = await Proposal.find({ 
      _id: { $in: proposalIds } 
    }).populate("bids", "bidder amount description");

    console.log(`🔍 Fetched ${proposals.length} proposals`);

    // Step 4: Fetch user portfolio details and contract data for each proposal
    const bidsWithFullDetails = await Promise.all(
      userBids.map(async (bid) => {
        // Find the corresponding proposal
        const proposal = proposals.find(p => 
          p._id.toString() === bid.proposal_id.toString()
        );

        if (!proposal) {
          console.warn(`⚠️ Proposal not found for bid ${bid._id}`);
          return {
            bidDetails: bid,
            proposalDetails: null,
            userPortfolioDetails: null,
            contractData: null,
            error: "Proposal not found"
          };
        }

        let userPortfolioDetails = null;
        let contractData = null;

        // Fetch user portfolio details (from the proposal owner)
        if (proposal.userWalletAddress) {
          try {
            const portfolio = await Portfolio.findOne({
              "heroSection.walletAddress": { 
                $regex: new RegExp(`^${proposal.userWalletAddress}$`, 'i') 
              }
            });
            
            if (portfolio) {
              userPortfolioDetails = {
                name: portfolio.heroSection.name,
                profile: portfolio.heroSection.profile,
                email: portfolio.contactInfo.email,
                walletAddress: portfolio.heroSection.walletAddress
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
            console.log(`🔍 Fetching contract data for proposalId: ${proposal.proposalId}`);
            
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
            
            console.log(`✅ Contract data fetched successfully for proposalId: ${proposal.proposalId}`);
          } catch (contractError) {
            console.error(`❌ Contract data fetch error for proposalId ${proposal.proposalId}:`, contractError);
            contractData = { 
              error: "Failed to fetch contract data",
              proposalId: proposal.proposalId,
              errorMessage: contractError.message
            };
          }
        } else {
          console.log(`⚠️ No proposalId found for proposal ${proposal._id}`);
        }

        return {
          bidDetails: {
            _id: bid._id,
            wallet_address: bid.wallet_address,
            cover_letter: bid.cover_letter,
            bid_amount: bid.bid_amount,
            proposal_id: bid.proposal_id,
            createdAt: bid.createdAt,
            updatedAt: bid.updatedAt
          },
          proposalDetails: {
            _id: proposal._id,
            title: proposal.title,
            description: proposal.description,
            image: proposal.image,
            budget: proposal.budget,
            project_duration: proposal.project_duration,
            userWalletAddress: proposal.userWalletAddress,
            tags: proposal.tags,
            skills_requirement: proposal.skills_requirement,
            proposalId: proposal.proposalId,
            isEditable: proposal.isEditable,
            createdAt: proposal.createdAt,
            updatedAt: proposal.updatedAt
          },
          userPortfolioDetails,
          contractData
        };
      })
    );

    // Filter out any bids with errors (optional)
    const validBids = bidsWithFullDetails.filter(bid => !bid.error);
    const bidsWithErrors = bidsWithFullDetails.filter(bid => bid.error);

    if (bidsWithErrors.length > 0) {
      console.warn(`⚠️ ${bidsWithErrors.length} bids had errors during processing`);
    }

    console.log(`📊 Successfully processed ${validBids.length} bids with full details`);

    return res.json({
      success: true,
      message: `Successfully fetched ${validBids.length} bids for authenticated user`,
      data: validBids,
      totalBids: userBids.length,
      processedBids: validBids.length,
      errors: bidsWithErrors.length > 0 ? bidsWithErrors : undefined,
      summary: {
        walletAddress: normalizedWalletAddress,
        totalBidsFound: userBids.length,
        successfulProcessing: validBids.length,
        failedProcessing: bidsWithErrors.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("❌ Get user bids with details error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user bids with details",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Get summary statistics for a user's bidding activity
 */
export const getUserBidStats = async (req, res) => {
  try {
    // Get wallet address from authenticated user instead of params
    const walletAddress = req.user?.address;
    
    if (!walletAddress) {
      return res.status(400).json({ 
        success: false,
        message: "User wallet address not found in authentication token" 
      });
    }

    // Convert to lowercase for consistent matching
    const normalizedWalletAddress = walletAddress.toLowerCase();

    console.log(`📊 Fetching bid statistics for authenticated user wallet: ${normalizedWalletAddress}`);

    // Get all bids for the user
    const userBids = await Bid.find({ 
      wallet_address: { 
        $regex: new RegExp(`^${normalizedWalletAddress}$`, 'i') 
      } 
    });

    if (userBids.length === 0) {
      return res.json({
        success: true,
        message: "No bids found for this wallet address",
        stats: {
          totalBids: 0,
          totalBidAmount: 0,
          averageBidAmount: 0,
          firstBidDate: null,
          lastBidDate: null,
          activeProposals: 0
        }
      });
    }

    // Calculate statistics
    const totalBidAmount = userBids.reduce((sum, bid) => sum + (bid.bid_amount || 0), 0);
    const averageBidAmount = totalBidAmount / userBids.length;
    const firstBidDate = new Date(Math.min(...userBids.map(bid => new Date(bid.createdAt))));
    const lastBidDate = new Date(Math.max(...userBids.map(bid => new Date(bid.createdAt))));

    // Get proposal IDs to check active proposals
    const proposalIds = userBids.map(bid => bid.proposal_id);
    const proposals = await Proposal.find({ _id: { $in: proposalIds } });
    
    // Count active proposals (those with proposalId and potentially active contract state)
    const activeProposals = proposals.filter(p => p.proposalId).length;

    const stats = {
      totalBids: userBids.length,
      totalBidAmount: totalBidAmount,
      averageBidAmount: Math.round(averageBidAmount * 100) / 100, // Round to 2 decimal places
      firstBidDate: firstBidDate.toISOString(),
      lastBidDate: lastBidDate.toISOString(),
      activeProposals: activeProposals,
      biddingPeriod: {
        start: firstBidDate.toISOString(),
        end: lastBidDate.toISOString(),
        daysActive: Math.ceil((lastBidDate - firstBidDate) / (1000 * 60 * 60 * 24))
      }
    };

    console.log(`📊 Bid statistics calculated for wallet ${normalizedWalletAddress}:`, stats);

    return res.json({
      success: true,
      message: `Successfully calculated bid statistics for authenticated user`,
      stats,
      walletAddress: normalizedWalletAddress
    });

  } catch (error) {
    console.error("❌ Get user bid stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while calculating bid statistics",
      error: error.message
    });
  }
};

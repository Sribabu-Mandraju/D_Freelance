import { ethers } from "ethers";
import ProposalManager_ABI from '../abis/ProposalManager_ABI.json' with { type: 'json' };

const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
const ProposalManager_contractAddress = "0x9e002323F46D6908EC4ef5444f1Bd0F67AF9Cf10";

const ProposalManager_contract = new ethers.Contract(
  ProposalManager_contractAddress,
  ProposalManager_ABI,
  provider
);

// Constants getters  
export const getContractConstants = async (req, res) => {
  try {
    const [
      firstPaymentPercent,
      secondPaymentPercent,
      thirdPaymentPercent,
      basisPoints,
      platformFeeBasisPoints,
      bidFee,
      treasury,
      platformToken,
      escrow,
      usdcToken
    ] = await Promise.all([
      ProposalManager_contract.FIRST_PAYMENT_PERCENT(),
      ProposalManager_contract.SECOND_PAYMENT_PERCENT(),
      ProposalManager_contract.THIRD_PAYMENT_PERCENT(),
      ProposalManager_contract.BASIS_POINTS(),
      ProposalManager_contract.PLATFORM_FEE_BASICPOINTS(),
      ProposalManager_contract.bidFee(),
      ProposalManager_contract.treasury(),
      ProposalManager_contract.platformToken(),
      ProposalManager_contract.escrow(),
      ProposalManager_contract.usdcToken()
    ]);

    return res.status(200).json({
      success: true,
      constants: {
        firstPaymentPercent: firstPaymentPercent.toString(),
        secondPaymentPercent: secondPaymentPercent.toString(),
        thirdPaymentPercent: thirdPaymentPercent.toString(),
        basisPoints: basisPoints.toString(),
        platformFeeBasisPoints: platformFeeBasisPoints.toString(),
        bidFee: bidFee.toString(),
        treasury,
        platformToken,
        escrow,
        usdcToken
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Proposal related functions
export const getProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;
    const proposal = await ProposalManager_contract.getProposal(proposalId);
    
    return res.status(200).json({
      success: true,
      proposal: {
        id: proposal.id.toString(),
        client: proposal.client,
        bidder: proposal.bidder,
        startTime: proposal.startTime.toString(),
        endTime: proposal.endTime.toString(),
        budget: proposal.budget.toString(),
        bidAmount: proposal.bidAmount.toString(),
        state: proposal.state.toString()
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getAllProposals = async (req, res) => {
  try {
    const proposals = await ProposalManager_contract.getAllProposals();
    
    const formattedProposals = proposals.map(proposal => ({
      id: proposal.id.toString(),
      client: proposal.client,
      bidder: proposal.bidder,
      startTime: proposal.startTime.toString(),
      endTime: proposal.endTime.toString(),
      budget: proposal.budget.toString(),
      bidAmount: proposal.bidAmount.toString(),
      state: proposal.state.toString()
    }));
    
    return res.status(200).json({
      success: true,
      proposals: formattedProposals,
      count: formattedProposals.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getPaginatedProposals = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const proposals = await ProposalManager_contract.getPaginatedProposals(offset, limit);
    
    const formattedProposals = proposals.map(proposal => ({
      id: proposal.id.toString(),
      client: proposal.client,
      bidder: proposal.bidder,
      startTime: proposal.startTime.toString(),
      endTime: proposal.endTime.toString(),
      budget: proposal.budget.toString(),
      bidAmount: proposal.bidAmount.toString(),
      state: proposal.state.toString()
    }));
    
    return res.status(200).json({
      success: true,
      proposals: formattedProposals,
      count: formattedProposals.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// DAO Member related functions
export const getDaoMembers = async (req, res) => {
  try {
    const members = await ProposalManager_contract.getDaoMembers();
    
    const formattedMembers = members.map(member => ({
      member: member.member,
      role: member.role.toString()
    }));
    
    return res.status(200).json({
      success: true,
      members: formattedMembers,
      count: formattedMembers.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Additional utility functions
export const getPlatformFee = async (req, res) => {
  try {
    const fee = await ProposalManager_contract.getPlatformFee();
    
    return res.status(200).json({
      success: true,
      platformFee: fee.toString()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getProposalCount = async (req, res) => {
  try {
    const count = await ProposalManager_contract.proposalCount();
    
    return res.status(200).json({
      success: true,
      proposalCount: count.toString()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Improvement proposals (if available in the ABI)
export const getImprovementProposals = async (req, res) => {
  try {
    // Note: This assumes the ABI includes a way to get improvement proposals
    // If not, you would need to implement a different approach
    const improvementProposals = await ProposalManager_contract.improvementProposals();
    
    const formattedProposals = improvementProposals.map(ip => ({
      // Format based on your ImprovementProposal struct
      // Example fields - adjust according to your actual struct
      id: ip.id.toString(),
      proposer: ip.proposer,
      description: ip.description,
      status: ip.status.toString()
    }));
    
    return res.status(200).json({
      success: true,
      improvementProposals: formattedProposals,
      count: formattedProposals.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// User-specific data
export const getUserProposals = async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Ethereum address"
      });
    }

    // Get all proposals and filter client/bidder side
    const allProposals = await ProposalManager_contract.getAllProposals();
    
    const clientProposals = allProposals
      .filter(p => p.client.toLowerCase() === address.toLowerCase())
      .map(p => ({
        id: p.id.toString(),
        client: p.client,
        bidder: p.bidder,
        startTime: p.startTime.toString(),
        endTime: p.endTime.toString(),
        budget: p.budget.toString(),
        bidAmount: p.bidAmount.toString(),
        state: p.state.toString()
      }));
    
    const bidderProposals = allProposals
      .filter(p => p.bidder.toLowerCase() === address.toLowerCase())
      .map(p => ({
        id: p.id.toString(),
        client: p.client,
        bidder: p.bidder,
        startTime: p.startTime.toString(),
        endTime: p.endTime.toString(),
        budget: p.budget.toString(),
        bidAmount: p.bidAmount.toString(),
        state: p.state.toString()
      }));
    
    return res.status(200).json({
      success: true,
      clientProposals,
      bidderProposals,
      clientCount: clientProposals.length,
      bidderCount: bidderProposals.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
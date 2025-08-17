import { ethers } from "ethers";
import Escrow_ABI from "../abis/Escrow_ABI.json" with { type: "json" };
import HFTtoken_ABI from "../abis/HFTtoken_ABI.json" with { type: "json" };
import ProposalManager_ABI from "../abis/ProposalManager_ABI.json" with { type: "json" };
import Treasury_ABI from "../abis/Treasury_ABI.json" with { type: "json" };
import ERC20_ABI from "../abis/ERC20_ABI.json" with { type: "json" };

// Initialize provider
const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");

// Contract addresses
const CONTRACT_ADDRESSES = {
  USDC: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  TREASURY: "0xd0f8B61b0EB48f54e10e3daA68bAC846e4bC2F56",
  ESCROW: "0xb7eBD3c77C8c0B0Cf783b7C8930C01BCDf8c562C",
  HFT_TOKEN: "0xd0D1B6E1dE2F705701FE370e91f8fb4731161d5a",
  PROPOSAL_MANAGER: "0x9e002323F46D6908EC4ef5444f1Bd0F67AF9Cf10",
};

// Initialize contract instances
const Escrow_contract = new ethers.Contract(CONTRACT_ADDRESSES.ESCROW, Escrow_ABI, provider);
const HFTtoken_contract = new ethers.Contract(CONTRACT_ADDRESSES.HFT_TOKEN, HFTtoken_ABI, provider);
const ProposalManager_contract = new ethers.Contract(CONTRACT_ADDRESSES.PROPOSAL_MANAGER, ProposalManager_ABI, provider);
const Treasury_contract = new ethers.Contract(CONTRACT_ADDRESSES.TREASURY, Treasury_ABI, provider);
const USDC_contract = new ethers.Contract(CONTRACT_ADDRESSES.USDC, ERC20_ABI, provider);

// 1. Escrow Data API
export const getEscrowData = async (req, res) => {
  try {
    // Extract optional proposalId query parameter
    const { proposalId } = req.query;

    // Validate proposalId if provided
    let specificProposalData = {};
    if (proposalId) {
      if (isNaN(proposalId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid proposalId: must be a number",
        });
      }
      try {
        specificProposalData = {
          proposalBalance: (await Escrow_contract.getProposalBalance(proposalId)).toString(),
        };
      } catch (error) {
        specificProposalData = { error: error.message };
      }
    }

    // Fetch Escrow contract data
    const escrowData = {
      totalContractBalance: (await Escrow_contract.getTotalContractBalance()).toString(),
      totalLockedFunds: (await Escrow_contract.getTotalLockedFunds()).toString(),
      availableBalance: (await Escrow_contract.getAvailableBalance()).toString(),
      usdcToken: await Escrow_contract.usdcToken(),
      treasury: await Escrow_contract.treasury(),
      governanceContract: await Escrow_contract.governanceContract(),
    };

    // Fetch USDC balance for Escrow contract
    const usdcData = {
      escrowBalance: (await USDC_contract.balanceOf(CONTRACT_ADDRESSES.ESCROW)).toString(),
    };

    return res.status(200).json({
      success: true,
      data: {
        escrow: escrowData,
        usdc: usdcData,
        specificProposal: proposalId ? { escrow: specificProposalData } : undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 2. HFT Token Data API
export const getHftTokenData = async (req, res) => {
  try {
    // Fetch HFTtoken contract data
    const hftTokenData = {
      totalUSDCBalance: (await HFTtoken_contract.getTotalUSDCBalance()).toString(),
      totalHFTtokensPurchasedWithUSDC: (await HFTtoken_contract.getTotalHFTtokensPurchasedWithUSDC()).toString(),
      claimInterval: (await HFTtoken_contract.CLAIM_INTERVAL()).toString(),
      claimAmount: (await HFTtoken_contract.CLAIM_AMOUNT()).toString(),
      bidFee: (await HFTtoken_contract.BID_FEE()).toString(),
      tokensCost150: (await HFTtoken_contract.TOKENS_COST_150()).toString(),
      tokenAmoutPerTenDollars: (await HFTtoken_contract.tokenAmoutPerTenDollars()).toString(),
      usdcToken: await HFTtoken_contract.usdcToken(),
      transfersEnabled: await HFTtoken_contract.transfersEnabled(),
    };

    // Fetch USDC balance for HFTtoken contract
    const usdcData = {
      hftTokenBalance: (await USDC_contract.balanceOf(CONTRACT_ADDRESSES.HFT_TOKEN)).toString(),
    };

    return res.status(200).json({
      success: true,
      data: {
        hftToken: hftTokenData,
        usdc: usdcData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 3. Proposal Manager Data API
export const getProposalManagerData = async (req, res) => {
  try {
    // Extract optional query parameters
    const { proposalId, offset = 0, limit = 10 } = req.query;

    // Validate proposalId if provided
    let specificProposalData = {};
    if (proposalId) {
      if (isNaN(proposalId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid proposalId: must be a number",
        });
      }
      try {
        const proposal = await ProposalManager_contract.getProposal(proposalId);
        specificProposalData = {
          proposal: {
            id: proposal.id.toString(),
            client: proposal.client,
            bidder: proposal.bidder,
            startTime: proposal.startTime.toString(),
            endTime: proposal.endTime.toString(),
            budget: proposal.budget.toString(),
            bidAmount: proposal.bidAmount.toString(),
            state: proposal.state.toString(),
          },
        };
      } catch (error) {
        specificProposalData = { error: error.message };
      }
    }

    // Fetch ProposalManager contract data
    const proposalCount = (await ProposalManager_contract.proposalCount()).toString();
    const daoMembers = await ProposalManager_contract.getDaoMembers();

    const proposalManagerData = {
      firstPaymentPercent: (await ProposalManager_contract.FIRST_PAYMENT_PERCENT()).toString(),
      secondPaymentPercent: (await ProposalManager_contract.SECOND_PAYMENT_PERCENT()).toString(),
      thirdPaymentPercent: (await ProposalManager_contract.THIRD_PAYMENT_PERCENT()).toString(),
      basisPoints: (await ProposalManager_contract.BASIS_POINTS()).toString(),
      platformFeeBasisPoints: (await ProposalManager_contract.getPlatformFee()).toString(),
      bidFee: (await ProposalManager_contract.bidFee()).toString(),
      proposalCount,
      treasury: await ProposalManager_contract.treasury(),
      platformToken: await ProposalManager_contract.platformToken(),
      escrow: await ProposalManager_contract.escrow(),
      usdcToken: await ProposalManager_contract.usdcToken(),
      daoMembers: daoMembers.map((member) => ({
        member: member.member,
        role: member.role.toString(),
      })),
    };

    // Fetch USDC balance for ProposalManager contract
    const usdcData = {
      proposalManagerBalance: (await USDC_contract.balanceOf(CONTRACT_ADDRESSES.PROPOSAL_MANAGER)).toString(),
    };

    return res.status(200).json({
      success: true,
      data: {
        proposalManager: proposalManagerData,
        usdc: usdcData,
        specificProposal: proposalId ? { proposalManager: specificProposalData } : undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 4. Treasury Data API
export const getTreasuryData = async (req, res) => {
  try {
    // Fetch Treasury contract data
    const treasuryData = {
      totalTreasureBalance: (await Treasury_contract.getTotalTreasureBalance()).toString(),
      usdcTokenAddress: await Treasury_contract.usdcTokenAddress(),
    };

    // Fetch USDC balance for Treasury contract
    const usdcData = {
      treasuryBalance: (await USDC_contract.balanceOf(CONTRACT_ADDRESSES.TREASURY)).toString(),
      // totalSupply: (await USDC_contract.totalSupply()).toString(),
    };

    return res.status(200).json({
      success: true,
      data: {
        treasury: treasuryData,
        usdc: usdcData,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
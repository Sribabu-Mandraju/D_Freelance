import { ethers } from "ethers";
import Escrow_ABI from '../abis/Escrow_ABI.json' with { type: 'json' };

const provider = new ethers.JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/vt_tNAcA-byKs7AxeH4Ze");
const Escrow_contractAddress = "0x7BeaCDbE4Ac6219DB0a1695743427B613B0cb2Fb"; // Replace with your Escrow contract address


const Escrow_contract = new ethers.Contract(
  Escrow_contractAddress,
  Escrow_ABI,
  provider
);

export const getEscrowData = async (req, res) => {
  try {
   

    const [ totalLocked, totalBalance, availableBalance] = await Promise.all([
      Escrow_contract.getTotalLockedFunds(),
      Escrow_contract.getTotalContractBalance(),
      Escrow_contract.getAvailableBalance()
    ]);

    return res.status(200).json({
      success: true,
      totalLockedFunds: totalLocked.toString(),
      totalContractBalance: totalBalance.toString(),
      availableBalance: availableBalance.toString()
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getEscrowConfig = async (req, res) => {
  try {
    const [usdcToken, treasury, governanceContract] = await Promise.all([
      Escrow_contract.usdcToken(),
      Escrow_contract.treasury(),
      Escrow_contract.governanceContract()
    ]);

    return res.status(200).json({
      success: true,
      usdcToken,
      treasury,
      governanceContract
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


export const getProposalBalance = async (req, res) => {
  try {
    const { proposalId } = req.params;
    
    if (!proposalId) {
      return res.status(400).json({
        success: false,
        error: "Proposal ID is required"
      });
    }

    const balance = await Escrow_contract.getProposalBalance(proposalId);

    return res.status(200).json({
      success: true,
      proposalId: proposalId,
      lockedFunds: balance.toString()
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
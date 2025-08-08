import { ethers } from "ethers";
import HFTtoken_ABI from '../abis/HFTtoken_ABI.json' with { type: 'json' };

const provider = new ethers.JsonRpcProvider(process.env.BASE_SEPOLIA_RPC);
const contractAddress = "0x9759f0C5dC990cF1aa9f3A6D85d0d34A53659152";

const HFTtoken_contract = new ethers.Contract(
  contractAddress,
  HFTtoken_ABI,
  provider
);

export const getUserLastClaimTime = async (req, res) => {
  try {
    console.log("hello")
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Ethereum address"
      });
    }

    const lastClaimTime = await HFTtoken_contract.lastClaimTime(address);
    
    return res.status(200).json({
      success: true,
      lastClaimTime: lastClaimTime.toString() // Convert BigNumber to string
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
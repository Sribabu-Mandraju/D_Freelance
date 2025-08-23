import { ethers } from "ethers";
import HFTtoken_ABI from '../abis/HFTtoken_ABI.json' with { type: 'json' };

const provider = new ethers.JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/vt_tNAcA-byKs7AxeH4Ze");
const HFTtoken_contractAddress = "0xd0D1B6E1dE2F705701FE370e91f8fb4731161d5a";


const HFTtoken_contract = new ethers.Contract(
  HFTtoken_contractAddress,
  HFTtoken_ABI,
  provider
);

export const getUserHftTokenData = async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Ethereum address"
      });
    }

    const lastClaimTime = await HFTtoken_contract.lastClaimTime(address);
    const userHFTtokenBalance = await HFTtoken_contract.balanceOf(address)
    

    let bidInfo = {
      bids: [],
      bidsCount: 0,
      isEmpty: true
    };


    try {
      
      const bids = await HFTtoken_contract.getBidsOfUser(address);
      if (bids && bids.length > 0) {
        bidInfo = {
          bids: bids.map(bid => bid.toString()),
          bidsCount: bids.length,
          isEmpty: false
        };
      }
    } catch (error) {
      
      if (!error.message.includes("execution reverted")) {
        throw error; 
      }
    }
    
    return res.status(200).json({
      success: true,
      lastClaimTime: lastClaimTime.toString(), 
      userHFTBalance:userHFTtokenBalance.toString(),
      bidInfo:bidInfo
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getTokenMetaData = async (req, res) => {
  try {
    const claimInterval = await HFTtoken_contract.CLAIM_INTERVAL();
    const claimAmount = await HFTtoken_contract.CLAIM_AMOUNT();
    const bidFee = await HFTtoken_contract.BID_FEE()
    const totalTokensPerTenUSDC = await HFTtoken_contract.tokenAmoutPerTenDollars()
    const totalHFTtokenPurchasesWithUSDC = await HFTtoken_contract.totalHFTtokensPurchasesWithUSDC();
    const getCurrentUSDCBalanceAvailable = await HFTtoken_contract.getTotalUSDCBalance()
    const isTransfetOfHFTtokenEnabled = await HFTtoken_contract.transfersEnabled();

    return res.status(200).json({
      success: true,
      claimInterval: claimInterval.toString(),
      claimAmount:claimAmount.toString(),
      bidFee:bidFee.toString(),
      totalTokensPerTenUSDC:totalTokensPerTenUSDC.toString(),
      totalHFTtokenPurchasesWithUSDC:totalHFTtokenPurchasesWithUSDC.toString(),
      currentUSDCBalanceAvailable:getCurrentUSDCBalanceAvailable.toString(),
      isTransfetOfHFTtokenEnabled:isTransfetOfHFTtokenEnabled.toString()


    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
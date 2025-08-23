import { ethers } from "ethers";
import Treasury_ABI from '../abis/Treasury_ABI.json' with { type: 'json' };

const provider = new ethers.JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/vt_tNAcA-byKs7AxeH4Ze");
const Treasury_contractAddress = "0x988ABc52D200bF476885262f82a3a5A1a4e2A2de";

const Treasury_contract = new ethers.Contract(
  Treasury_contractAddress,
  Treasury_ABI,
  provider
);


export const getTreasuryInfo = async (req,res) => {
  try {
    const TreasuryPaymentToken = await Treasury_contract.usdcTokenAddress();
    const ownerOfTheTreasury = await Treasury_contract.owner();
    const totalTreasuryBalance = await Treasury_contract.getTotalTreasureBalance();

    res.status(200).json({
      usdcTokenAddress:TreasuryPaymentToken.toString(),
      ownerOfTheTreasury:ownerOfTheTreasury.toString(),
      treasuryBalance:totalTreasuryBalance.toString()
    })
  } catch (error) {
     return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
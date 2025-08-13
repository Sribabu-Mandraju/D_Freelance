import { ethers } from "ethers";
import Escrow_ABI from '../abis/Escrow_ABI.json' with { type: 'json' };

const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
const Escrow_contractAddress = "0xb7eBD3c77C8c0B0Cf783b7C8930C01BCDf8c562C"; // Replace with your Escrow contract address


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
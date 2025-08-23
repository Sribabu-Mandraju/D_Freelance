import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';
import Nonce from '../models/Nonce.js';
import PortfolioScheema from "../models/PortfolioModel.js"; // Import PortfolioScheema

const getNonce = async (req, res, next) => {
  try {
    console.log("generating  nonce  lol  ...... !")
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ success: false, message: 'Address is required' });
    }

    const nonce = Math.floor(Math.random() * 1000000).toString();

    await Nonce.findOneAndUpdate(
      { address: address.toLowerCase() },
      { nonce, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    res.json({ success: true, nonce });
  } catch (error) {
    next(error);
  }
};

const verifySignature = async (req, res, next) => {
  try {
    console.log("authenticating  verifying signature ...... lol !")
    const { address, signature, nonce } = req.body;
    if (!address || !signature || !nonce) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const nonceDoc = await Nonce.findOne({ address: address.toLowerCase() });
    if (!nonceDoc || nonceDoc.nonce !== nonce) {
      return res.status(401).json({ success: false, message: 'Invalid nonce' });
    }

    const signerAddress = ethers.verifyMessage(nonce, signature);
    if (signerAddress.toLowerCase() === address.toLowerCase()) {
      await Nonce.deleteOne({ address: address.toLowerCase() });

      // let portfolioUser = await PortfolioScheema.findOne({ "heroSection.walletAddress": address.toLowerCase() });
      // let userExists = !!portfolioUser;

      // if (!portfolioUser) {
      //   // Create a new portfolio entry if user doesn't exist
      //   portfolioUser = await PortfolioScheema.create({
      //     heroSection: {
      //       walletAddress: address.toLowerCase(),
      //       name: `User_${address.substring(2, 8)}`, // Default name
      //       profilePic: "/avatar.png", // Default profile pic
      //     },
      //   });
      //   userExists = true;
      // }

      const token = jwt.sign({ address: address.toLowerCase() }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      console.log(token)

      res.json({
        success: true,
        message: 'Authentication successful',
        token,
      //   // userExists,
      //   user: {
      //     _id: portfolioUser.heroSection.walletAddress,
      //     fullname: portfolioUser.heroSection.name,
      //     profilePic: portfolioUser.heroSection.profilePic,
      //   // },
      // });
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    next(error);
  }
};

export { getNonce, verifySignature };
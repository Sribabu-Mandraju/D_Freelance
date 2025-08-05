import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';
import Nonce from '../models/Nonce.js';
import User from "../models/UserModel.js";

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

      let user = await User.findOne({ userWallet: address.toLowerCase() });
      const userExists = !!user;

      const token = jwt.sign({ address: address.toLowerCase() }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({
        success: true,
        message: 'Authentication successful',
        token,
        userExists,
        user: user || null,
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    next(error);
  }
};

export { getNonce, verifySignature };
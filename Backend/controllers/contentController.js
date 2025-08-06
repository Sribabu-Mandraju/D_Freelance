import express from 'express';
import { checkWithGemini } from '../utils/geminiProfanityChecker.js';

const router = express.Router();

export const submitContent = async (req, res) => {
  const { text } = req.body;

  // Validate text
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required.' });
  }

  try {
    const isVulgar = await checkWithGemini(text);
    if (isVulgar) {
      return res.status(400).json({ error: 'Vulgar language detected in text. Please revise your content.' });
    }

    return res.status(200).json({ success: true, message: 'Text is clean. No inappropriate content detected.' });
  } catch (error) {
    console.error('Error in submitContent:', error.message);
    return res.status(500).json({ error: 'Failed to validate content. Try again later.' });
  }
};

export default router;
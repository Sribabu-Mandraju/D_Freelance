
import axios from "axios"
import NodeCache from "node-cache"
import dotenv from "dotenv";
dotenv.config();

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

export const checkWithGemini = async (text) => {
  const cacheKey = `gemini_${text}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  const prompt = `Does this message contain vulgar, abusive, or inappropriate language? Only reply "vulgar" or "clean".\n\nMessage: "${text}"`;

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    // Validate response structure
    if (
      !response.data ||
      !response.data.candidates ||
      !response.data.candidates[0] ||
      !response.data.candidates[0].content ||
      !response.data.candidates[0].content.parts ||
      !response.data.candidates[0].content.parts[0]
    ) {
      console.error('Invalid Gemini API response structure:', response.data);
      throw new Error('Invalid API response');
    }

    const result = response.data.candidates[0].content.parts[0].text.trim().toLowerCase();
    if (result !== 'vulgar' && result !== 'clean') {
      console.error('Unexpected Gemini response:', result);
      throw new Error('Unexpected API response');
    }

    const isVulgar = result === 'vulgar';
    cache.set(cacheKey, isVulgar);
    return isVulgar;
  } catch (error) {
    if (error.response?.status === 429) {
      console.error('Gemini API rate limit exceeded:', error.message);
    } else if (error.response?.data?.error) {
      console.error('Gemini API error:', error.response.data.error);
    } else {
      console.error('Gemini API error:', error.message);
    }
    throw error; // Let the controller handle the error
  }
};

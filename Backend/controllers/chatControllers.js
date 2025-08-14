// controllers/chatController.js
import { getProposalMessages } from '../services/chatService.js';

const getMessagesByProposalId = async (req, res) => {
  const { proposalId } = req.params;
  try {
    const messages = await getProposalMessages(proposalId);
    if (!messages) {
      return res.status(404).json({ message: "Messages not found for this proposal." });
    }
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

export { getMessagesByProposalId };
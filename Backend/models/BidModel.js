import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    required: true,
  },
  cover_letter: {
    type: String,
    required: true,
  },
  bid_amount: {
    type: Number,
    required: true,
  },
  proposal_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proposal',
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Bid', bidSchema);

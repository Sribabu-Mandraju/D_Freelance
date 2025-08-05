const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String, // assuming markup is stored as string (Markdown, HTML, etc.)
    required: true,
  },
  image: {
    type: String, // URL or path to the image
  },
  budget: {
    type: Number,
    required: true,
  },
  project_duration: {
    type: String, // You can change this to Number if using days or a time unit
    required: true,
  },
  user_wallet_address: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // array of tags
    default: [],
  },
  skills_requirement: {
    type: [String], // array of strings (skill names)
    required: true,
  },
  bids: {
    type: [mongoose.Schema.Types.ObjectId], // array of bid IDs
    ref: 'Bid', // make sure to define the Bid model
    default: [],
  },
  accepted_bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or 'Bid' based on logic
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('Proposal', proposalSchema);

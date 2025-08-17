import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    hourlyPay: {
      type: Number,
      min: 0,
    },
    duration: {
      type: String,
      trim: true,
    },
    custom_ui: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ['yes', 'no', 'client_choice'],
    },
    code_reviews: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const GigSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    // unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  gigimage:{
    type: String,
    required: false,
    trim: true,
  },
  images: [
    {
      url: { type: String, required: false },
    },
  ],
  tags: {
    type: [String],
    default: [],
  },
  skills: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },

  basic: packageSchema,
  standard: packageSchema,
  pro: packageSchema,

  deliveryTime: {
    type: Number,
    required: true,
    min: 1,
  },
  price:{
      type: String,
      required: true,
      min: 0,
    },
  faqs: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  about: {
    type: String,
    trim: true,
  },

  // New fields
  badges: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  projects: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Available', 'Unavailable'],
    default: 'Available',
  },
  location: {
    type: String,
    trim: true,
  },

  responseTime: {
    type: String,
    trim: true,
  },
  successRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  avatar: {
    type: String,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Gig', GigSchema);

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
  { _id: false }
);

const GigSchema = new mongoose.Schema({
   userwalletAddress: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Gig', GigSchema);
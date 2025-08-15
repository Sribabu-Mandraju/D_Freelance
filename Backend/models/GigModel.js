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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
  tags: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  skills: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  category: {
    type: String,
    required: true,
    trim: true,
  },

  // Packages - user will select only one
  basic: { type: packageSchema, required: false },
  standard: { type: packageSchema, required: false },
  pro: { type: packageSchema, required: false },

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

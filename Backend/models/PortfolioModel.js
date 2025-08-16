import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  // Hero Section Data
  heroSection: {
    walletAddress: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    }, 
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    domains: [{
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    }],
    thoughtLine: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    aboutMe: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },
    expertise: [{
      type: String,
      required: true,
      trim: true,
      maxlength: 40
    }],
    focusAreas: [{
      type: String,
      required: true,
      trim: true,
      maxlength: 40
    }]
  },
  
  // Right Sidebar Data
  contactInfo: {
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    linkedinProfile: {
      type: String,
      required: true,
      trim: true,
      match: [/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, 'Please enter a valid LinkedIn profile URL']
    }
  },
  
  currentStatus: [{
    status: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    color: {
      type: String,
      required: true,
      enum: ['green', 'yellow', 'red', 'blue', 'purple', 'orange']
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  
  techHighlights: [{
    technology: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    description: {
      type: String,
      trim: true,
      maxlength: 100
    }
  }],

  // New fields for proposals and gigs
  biddedProposals: [{
    type: mongoose.Schema.Types.Mixed, // Allows both String and Number
    trim: true
  }],
  
  acceptedProposals: [{
    type: String, // Allows both String and Number
    trim: true
  }],
  
  createdProposals: [{
    type: String, // MongoDB ObjectId for created proposals
    ref: 'Proposal' // Assuming there's a Proposal model
  }],
  
  savedProposals: [{
    type: String, // MongoDB ObjectId for saved proposals
    ref: 'Proposal' // Assuming there's a Proposal model
  }],
  
  savedGigs: [{
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId for saved gigs
    ref: 'Gig' // Assuming there's a Gig model
  }],
  
  userGigs: [{
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId for user's own gigs
    ref: 'Gig' // Assuming there's a Gig model
  }],
  
  // Metadata
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Validation for array limits
portfolioSchema.pre('save', function(next) {
  // Validate expertise array (max 4)
  if (this.heroSection.expertise.length > 4) {
    return next(new Error('Expertise can have maximum 4 items'));
  }
  
  // Validate focus areas array (max 4)
  if (this.heroSection.focusAreas.length > 4) {
    return next(new Error('Focus areas can have maximum 4 items'));
  }
  
  // Validate current status array (max 3)
  if (this.currentStatus.length > 3) {
    return next(new Error('Current status can have maximum 3 items'));
  }
  
  // Validate tech highlights array (max 4)
  if (this.techHighlights.length > 4) {
    return next(new Error('Tech highlights can have maximum 4 items'));
  }
  
  // Update the updatedAt field
  this.updatedAt = Date.now();
  next();
});

const PortfolioScheema = mongoose.model('Portfolio', portfolioSchema);

export default PortfolioScheema;

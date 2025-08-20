import Portfolio from "../models/PortfolioModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// In-memory OTP store (use a proper database in production)
const otpStorage = new Map();

// Cleanup function to remove unverified portfolios after 1 hour
const cleanupUnverifiedPortfolios = async () => {
  try {
    const oneHourAgo = Date.now() - 60 * 60 * 1000; // 1 hour ago
    const result = await Portfolio.deleteMany({
      isVerified: false,
      createdAt: { $lt: oneHourAgo },
    });

    if (result.deletedCount > 0) {
      console.log(`Cleaned up ${result.deletedCount} unverified portfolios`);
    }
  } catch (error) {
    console.error("Error cleaning up unverified portfolios:", error);
  }
};

// Run cleanup every hour
setInterval(cleanupUnverifiedPortfolios, 60 * 60 * 1000);

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate a 6-digit numeric OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Regex to validate email
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Send OTP
export const sendOTP = async (req, res) => {
  try {
    const {
      contactInfo,
      heroSection,
      currentStatus,
      techHighlights,
    } = req.body;
    const walletAddress = req.user.address; // Get wallet address from authMiddleware

    if (!contactInfo || !contactInfo.email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!emailRegex.test(contactInfo.email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (!heroSection?.name) {
      return res.status(400).json({
        success: false,
        message: "Hero section name is required",
      });
    }

    // Check if portfolio already exists for this wallet address
    const existingPortfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });
    if (existingPortfolio) {
      return res.status(400).json({
        success: false,
        message: "Portfolio already exists for this wallet address",
      });
    }

    // Create portfolio with isVerified = false
    const portfolioData = {
      heroSection: {
        walletAddress,
        name: heroSection.name,
        domains: heroSection.domains || [],
        thoughtLine: heroSection.thoughtLine || "",
        aboutMe: heroSection.aboutMe || "",
        expertise: heroSection.expertise || [],
        focusAreas: heroSection.focusAreas || [],
      },
      contactInfo: {
        email: contactInfo.email,
        phoneNumber: contactInfo.phoneNumber || "",
        linkedinProfile: contactInfo.linkedinProfile || "",
      },
      currentStatus: currentStatus || [],
      techHighlights: techHighlights || [],
      biddedProposals: [],
      acceptedProposals: [],
      createdProposals: [],
      savedProposals: [],
      savedGigs: [],
      userGigs: [],
      isVerified: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    console.log(
      "Creating portfolio with data:",
      JSON.stringify(portfolioData, null, 2)
    );

    const portfolio = new Portfolio(portfolioData);
    const savedPortfolio = await portfolio.save();

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP with portfolio ID
    otpStorage.set(contactInfo.email, {
      otp,
      expiresAt,
      walletAddress,
      portfolioId: savedPortfolio._id,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactInfo.email,
      subject: "Your Portfolio Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; padding: 20px; background: #f4f4f4; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Portfolio Verification</h2>
          <p style="text-align: center;">Your verification code is:</p>
          <h1 style="text-align: center; letter-spacing: 4px; color: #4f46e5;">${otp}</h1>
          <p style="text-align: center; font-size: 12px; color: #555;">This code will expire in 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      portfolioId: savedPortfolio._id,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Error sending OTP",
    });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email, portfolioId } = req.body;
    const walletAddress = req.user.address;

    if (!email || !portfolioId) {
      return res.status(400).json({
        success: false,
        message: "Email and portfolio ID are required",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Verify portfolio exists and wallet address matches
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio || portfolio.heroSection.walletAddress !== walletAddress) {
      return res.status(403).json({
        success: false,
        message: "Portfolio not found or unauthorized",
      });
    }

    if (portfolio.contactInfo.email !== email) {
      return res.status(400).json({
        success: false,
        message: "Email does not match portfolio",
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store or update OTP
    otpStorage.set(email, { otp, expiresAt, portfolioId, walletAddress });

    // Send new OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Portfolio Verification - New Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #a855f7; margin-bottom: 10px;">New Verification Code</h1>
            <p style="color: #e5e7eb; font-size: 16px;">Here's your new verification code</p>
          </div>
          
          <div style="background: rgba(168, 85, 247, 0.1); padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #e5e7eb; margin-bottom: 15px;">Your new verification code is:</p>
            <div style="font-size: 32px; font-weight: bold; color: #a855f7; letter-spacing: 8px; margin: 20px 0;">${otp}</div>
            <p style="color: #9ca3af; font-size: 14px;">This code will expire in 5 minutes</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Error resending OTP",
    });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, portfolioId } = req.body;
    const walletAddress = req.user.address;

    if (!email || !otp || !portfolioId) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and portfolio ID are required",
      });
    }

    const storedData = otpStorage.get(email);

    if (!storedData || storedData.walletAddress !== walletAddress) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or unauthorized",
      });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStorage.delete(email);
      // Clean up expired OTP portfolio
      try {
        await Portfolio.findByIdAndDelete(portfolioId);
      } catch (error) {
        console.error("Error cleaning up expired portfolio:", error);
      }
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Verify portfolio and wallet address match
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio || portfolio.heroSection.walletAddress !== walletAddress) {
      return res.status(403).json({
        success: false,
        message: "Portfolio not found or unauthorized",
      });
    }

    if (portfolio.contactInfo.email !== email) {
      return res.status(400).json({
        success: false,
        message: "Email does not match portfolio",
      });
    }

    // Mark portfolio as verified
    portfolio.isVerified = true;
    const updatedPortfolio = await portfolio.save();

    // Clean up OTP storage
    otpStorage.delete(email);

    res.status(200).json({
      success: true,
      message: "OTP verified and portfolio confirmed",
      data: updatedPortfolio,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error verifying OTP",
    });
  }
};

// Create Portfolio
export const createPortfolio = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    console.log("Wallet Address:", walletAddress);
    if (!walletAddress) {
      return res.status(401).json({
        success: false,
        message: "Wallet address not found in authentication token",
      });
    }

    const {
      heroSection,
      contactInfo,
      currentStatus,
      techHighlights,
      biddedProposals,
      acceptedProposals,
      createdProposals,
      savedProposals,
      savedGigs,
      userGigs,
    } = req.body;

    if (!heroSection?.name) {
      return res.status(400).json({
        success: false,
        message: "Hero section name is required",
      });
    }
    if (!contactInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "Contact email is required",
      });
    }

    // Check if portfolio already exists for this wallet address
    const existingPortfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });
    if (existingPortfolio) {
      return res.status(400).json({
        success: false,
        message: "Portfolio already exists for this wallet address",
      });
    }

    // Explicitly construct portfolio data with walletAddress
    const portfolioData = {
      heroSection: {
        walletAddress, // Explicitly set from authMiddleware
        name: heroSection.name,
        profile:heroSection.profile,
        domains: heroSection.domains || [],
        thoughtLine: heroSection.thoughtLine || "",
        aboutMe: heroSection.aboutMe || "",
        expertise: heroSection.expertise || [],
        focusAreas: heroSection.focusAreas || [],
      },
      contactInfo: {
        email: contactInfo.email,
        phoneNumber: contactInfo.phoneNumber || "",
        linkedinProfile: contactInfo.linkedinProfile || "",
      },
      currentStatus: currentStatus || [],
      techHighlights: techHighlights || [],
      biddedProposals: biddedProposals || [],
      acceptedProposals: acceptedProposals || [],
      createdProposals: createdProposals || [],
      savedProposals: savedProposals || [],
      savedGigs: savedGigs || [],
      userGigs: userGigs || [],
      isVerified: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const portfolio = new Portfolio(portfolioData);
    const savedPortfolio = await portfolio.save();

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: savedPortfolio,
    });
  } catch (error) {
    console.error("Create portfolio error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error creating portfolio",
    });
  }
};

// Get All Portfolios
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: portfolios,
    });
  } catch (error) {
    console.error("Get portfolios error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching portfolios",
    });
  }
};

// Get Portfolio by Wallet Address
export const getPortfolioByWallet = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    const portfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    console.error("Get portfolio error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching portfolio",
    });
  }
};

// Update Portfolio
export const updatePortfolio = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    const {
      heroSection,
      contactInfo,
      currentStatus,
      techHighlights,
      biddedProposals,
      acceptedProposals,
      createdProposals,
      savedProposals,
      savedGigs,
      userGigs,
    } = req.body;

    const portfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // Prevent wallet address modification
    if (
      heroSection?.walletAddress &&
      heroSection.walletAddress !== walletAddress
    ) {
      return res.status(403).json({
        success: false,
        message: "Cannot change wallet address",
      });
    }

    const updateData = {};
    if (heroSection) {
      updateData.heroSection = {
        ...portfolio.heroSection,
        ...heroSection,
        walletAddress, // Ensure wallet address remains unchanged
      };
    }
    if (contactInfo) {
      updateData.contactInfo = {
        ...portfolio.contactInfo,
        ...contactInfo,
      };
    }
    if (currentStatus) {
      updateData.currentStatus = currentStatus;
    }
    if (techHighlights) {
      updateData.techHighlights = techHighlights;
    }
    if (biddedProposals) {
      updateData.biddedProposals = biddedProposals;
    }
    if (acceptedProposals) {
      updateData.acceptedProposals = acceptedProposals;
    }
    if (createdProposals) {
      updateData.createdProposals = createdProposals;
    }
    if (savedProposals) {
      updateData.savedProposals = savedProposals;
    }
    if (savedGigs) {
      updateData.savedGigs = savedGigs;
    }
    if (userGigs) {
      updateData.userGigs = userGigs;
    }

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { "heroSection.walletAddress": walletAddress },
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: updatedPortfolio,
    });
  } catch (error) {
    console.error("Update portfolio error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error updating portfolio",
    });
  }
};

// Delete Portfolio
export const deletePortfolio = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    const portfolio = await Portfolio.findOneAndDelete({
      "heroSection.walletAddress": walletAddress,
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting portfolio",
    });
  }
};

// Add Bidded Proposal
export const addBiddedProposal = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    const { proposalId } = req.body;

    const portfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    if (!portfolio.biddedProposals.includes(proposalId)) {
      portfolio.biddedProposals.push(proposalId);
      await portfolio.save();
    }

    res.status(200).json({
      success: true,
      message: "Proposal added to bidded proposals",
      data: portfolio,
    });
  } catch (error) {
    console.error("Add bidded proposal error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error adding bidded proposal",
    });
  }
};

// Add Accepted Proposal
export const addAcceptedProposal = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    const { proposalId } = req.body;

    const portfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    if (!portfolio.acceptedProposals.includes(proposalId)) {
      portfolio.acceptedProposals.push(proposalId);
      await portfolio.save();
    }

    res.status(200).json({
      success: true,
      message: "Proposal added to accepted proposals",
      data: portfolio,
    });
  } catch (error) {
    console.error("Add accepted proposal error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error adding accepted proposal",
    });
  }
};

// Add Created Proposal
export const addCreatedProposal = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    const { proposalId } = req.body;

    const portfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    if (!portfolio.createdProposals.includes(proposalId)) {
      portfolio.createdProposals.push(proposalId);
      await portfolio.save();
    }

    res.status(200).json({
      success: true,
      message: "Proposal added to created proposals",
      data: portfolio,
    });
  } catch (error) {
    console.error("Add created proposal error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error adding created proposal",
    });
  }
};

// Add Saved Proposal
export const addSavedProposal = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    const { proposalId } = req.body;

    const portfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    if (!portfolio.savedProposals.includes(proposalId)) {
      portfolio.savedProposals.push(proposalId);
      await portfolio.save();
    }

    res.status(200).json({
      success: true,
      message: "Proposal added to saved proposals",
      data: portfolio,
    });
  } catch (error) {
    console.error("Add saved proposal error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error adding saved proposal",
    });
  }
};

// Add Saved Gig
export const addSavedGig = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    const { gigId } = req.body;

    const portfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    if (!portfolio.savedGigs.includes(gigId)) {
      portfolio.savedGigs.push(gigId);
      await portfolio.save();
    }

    res.status(200).json({
      success: true,
      message: "Gig added to saved gigs",
      data: portfolio,
    });
  } catch (error) {
    console.error("Add saved gig error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error adding saved gig",
    });
  }
};

// Add User Gig
export const addUserGig = async (req, res) => {
  try {
    const walletAddress = req.user.address;
    const { gigId } = req.body;

    const portfolio = await Portfolio.findOne({
      "heroSection.walletAddress": walletAddress,
    });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    if (!portfolio.userGigs.includes(gigId)) {
      portfolio.userGigs.push(gigId);
      await portfolio.save();
    }

    res.status(200).json({
      success: true,
      message: "Gig added to user gigs",
      data: portfolio,
    });
  } catch (error) {
    console.error("Add user gig error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error adding user gig",
    });
  }
};

import Portfolio from "../models/PortfolioModel.js"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

// Load environment variables from .env file
dotenv.config()

// In-memory OTP store (use a proper database in production)
const otpStorage = new Map()

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
})

// Generate a 6-digit numeric OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Regex to validate a general email format, consistent with the Mongoose schema
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

// Function to send OTP
export const sendOTP = async (req, res) => {
  try {
    const { contactInfo } = req.body

    // Basic validation for existence of email field
    if (!contactInfo || !contactInfo.email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      })
    }

    // Validate email format using regex, consistent with the schema
    if (!emailRegex.test(contactInfo.email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      })
    }

    // Create OTP + expiry (5 minutes)
    const otp = generateOTP()
    const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes

    // Store OTP with the email as key
    otpStorage.set(contactInfo.email, { otp, expiresAt })

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactInfo.email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; padding: 20px; background: #f4f4f4; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Email Verification</h2>
          <p style="text-align: center;">Your OTP code is:</p>
          <h1 style="text-align: center; letter-spacing: 4px; color: #4f46e5;">${otp}</h1>
          <p style="text-align: center; font-size: 12px; color: #555;">This code will expire in 5 minutes.</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    res.status(500).json({
      success: false,
      message: "Error sending OTP",
    })
  }
}

// All other functions from your original file.
export const createPortfolio = async (req, res) => {
  try {
    const { heroSection, contactInfo, currentStatus, techHighlights } = req.body
    if (!heroSection?.name) {
      return res.status(400).json({
        success: false,
        message: "Hero section name is required",
      })
    }
    if (!contactInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "Contact email is required",
      })
    }
    const portfolioData = {
      heroSection: {
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
    }
    const portfolio = new Portfolio(portfolioData)
    const savedPortfolio = await portfolio.save()
    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: savedPortfolio,
    })
  } catch (error) {
    console.error("Create portfolio error:", error)
    res.status(400).json({
      success: false,
      message: error.message || "Error creating portfolio",
    })
  }
}

export const getAllPortfolios = async (req, res) => {
  try {
    console.log("hi guys")
    const portfolios = await Portfolio.find().sort({
      createdAt: -1
    })
    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: portfolios,
    })
  } catch (error) {
    console.error("Get portfolios error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching portfolios",
    })
  }
}

export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params
    const portfolio = await Portfolio.findById(id)
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      })
    }
    res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    console.error("Get portfolio error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching portfolio",
    })
  }
}

export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params
    const { heroSection, contactInfo, currentStatus, techHighlights } = req.body
    const portfolio = await Portfolio.findById(id)
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      })
    }
    const updateData = {}
    if (heroSection) {
      updateData.heroSection = {
        ...portfolio.heroSection,
        ...heroSection,
      }
    }
    if (contactInfo) {
      updateData.contactInfo = {
        ...portfolio.contactInfo,
        ...contactInfo,
      }
    }
    if (currentStatus) {
      updateData.currentStatus = currentStatus
    }
    if (techHighlights) {
      updateData.techHighlights = techHighlights
    }
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: updatedPortfolio,
    })
  } catch (error) {
    console.error("Update portfolio error:", error)
    res.status(400).json({
      success: false,
      message: error.message || "Error updating portfolio",
    })
  }
}

export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params
    const portfolio = await Portfolio.findByIdAndDelete(id)
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      })
    }
    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    })
  } catch (error) {
    console.error("Delete portfolio error:", error)
    res.status(500).json({
      success: false,
      message: "Error deleting portfolio",
    })
  }
}

// Modified verifyOTP to accept portfolio data along with OTP verification
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, portfolioData } = req.body

    if (!email || !otp || !portfolioData) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and portfolio data are required",
      })
    }

    const storedData = otpStorage.get(email)

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      })
    }

    if (Date.now() > storedData.expiresAt) {
      otpStorage.delete(email)
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      })
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      })
    }

    // OTP is valid, create portfolio
    const { heroSection, contactInfo, currentStatus, techHighlights } = portfolioData

    // Create portfolio with nested structure
    const finalPortfolioData = {
      heroSection: {
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
    }
    const portfolio = new Portfolio(finalPortfolioData)
    const savedPortfolio = await portfolio.save()

    // Clean up OTP storage
    otpStorage.delete(email)

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: savedPortfolio,
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    res.status(400).json({
      success: false,
      message: error.message || "Error verifying OTP",
    })
  }
}

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      })
    }

    const storedData = otpStorage.get(email)

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "No OTP request found for this email",
      })
    }

    // Generate new OTP
    const otp = generateOTP()
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Update stored data with new OTP
    otpStorage.set(email, {
      ...storedData,
      otp,
      expiresAt,
    })

    // Send new OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Portfolio Creation - New Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #a855f7; margin-bottom: 10px;">New Verification Code</h1>
            <p style="color: #e5e7eb; font-size: 16px;">Here's your new verification code</p>
          </div>
          
          <div style="background: rgba(168, 85, 247, 0.1); padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="color: #e5e7eb; margin-bottom: 15px;">Your new verification code is:</p>
            <div style="font-size: 32px; font-weight: bold; color: #a855f7; letter-spacing: 8px; margin: 20px 0;">${otp}</div>
            <p style="color: #9ca3af; font-size: 14px;">This code will expire in 10 minutes</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
    })
  } catch (error) {
    console.error("Resend OTP error:", error)
    res.status(500).json({
      success: false,
      message: "Error resending OTP",
    })
  }
}

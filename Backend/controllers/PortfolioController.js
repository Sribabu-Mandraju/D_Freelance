import Portfolio from '../models/PortfolioModel.js'

export const createPortfolio = async (req, res) => {
  try {
    const { heroSection, contactInfo, currentStatus, techHighlights } = req.body;
    // Validate required nested fields
    if (!heroSection?.name) {
      return res.status(400).json({
        success: false,
        message: "Hero section name is required"
      });
    }

    if (!contactInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "Contact email is required"
      });
    }

    // Create portfolio with nested structure
    const portfolioData = {
      heroSection: {
        name: heroSection.name,
        domains: heroSection.domains || [],
        thoughtLine: heroSection.thoughtLine || '',
        aboutMe: heroSection.aboutMe || '',
        expertise: heroSection.expertise || [],
        focusAreas: heroSection.focusAreas || []
      },
      contactInfo: {
        email: contactInfo.email,
        phoneNumber: contactInfo.phoneNumber || '', // Fixed from phone to phoneNumber
        linkedinProfile: contactInfo.linkedinProfile || '' // Fixed from linkedin to linkedinProfile
      },
      currentStatus: currentStatus || [],
      techHighlights: techHighlights || []
    };

    const portfolio = new Portfolio(portfolioData);
    const savedPortfolio = await portfolio.save();

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: savedPortfolio
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(400).json({
      success: false,
      message: error.message || "Error creating portfolio"
    });
  }
};

// Get all portfolios
export const getAllPortfolios = async (req, res) => {
  try {
    console.log("hi guys")
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: portfolios.length,
      data: portfolios
    });
  } catch (error) {
    console.error('Get portfolios error:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching portfolios"
    });
  }
};

// Get single portfolio by ID
export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching portfolio"
    });
  }
};

// Update portfolio
export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { heroSection, contactInfo, currentStatus, techHighlights } = req.body;
    
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found"
      });
    }

    //  Update with nested structure validation
    const updateData = {};
    
    if (heroSection) {
      updateData.heroSection = {
        ...portfolio.heroSection,
        ...heroSection
      };
    }
    
    if (contactInfo) {
      updateData.contactInfo = {
        ...portfolio.contactInfo,
        ...contactInfo
      };
    }
    
    if (currentStatus) {
      updateData.currentStatus = currentStatus;
    }
    
    if (techHighlights) {
      updateData.techHighlights = techHighlights;
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: updatedPortfolio
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(400).json({
      success: false,
      message: error.message || "Error updating portfolio"
    });
  }
};

// Delete portfolio
export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findByIdAndDelete(id);
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully"
    });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({
      success: false,
      message: "Error deleting portfolio"
    });
  }
};

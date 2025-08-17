import Gig from '../models/GigModel.js';
import Portfolio from "../models/PortfolioModel.js";


const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const hasPayload = (obj) =>
  obj && typeof obj === 'object' && Object.keys(obj).length > 0;

export const createGig = async (req, res) => {
  // console.log('CreateGig - content-type:', req.headers['content-type']);
  // console.log('CreateGig - body:', req.body);
  try {
    const {
      username,
      title,
      description,
      gigimage,
      images,
      price,
      category,
      deliveryTime,
      faqs,
      about,
      tags,
      skills,
      basic,
      standard,
      pro,
      badges,
      rating,
      projects,
      status,
      location,
      responseTime,
      successRate,
      avatar,
    } = req.body;

    // Required top-level fields
    if (!username || !title || !description || !category || !deliveryTime || !price || !gigimage) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    // New validation: all three packages (basic, standard, pro) are required
    if (!hasPayload(basic) || !hasPayload(standard) || !hasPayload(pro)) {
      return res.status(400).json({ message: 'All three packages (basic, standard, and pro) are required.' });
    }

    const walletAddress = req.user.address;
    if (!walletAddress) {
      return res.status(400).json({ message: 'User wallet address is required' });
    }

    const payload = {
      walletAddress,
      username, // Added username to the payload as it's required by the schema
      title,
      description,
      price,
      gigimage,
      images: toArray(images),
      tags: toArray(tags),
      skills: toArray(skills),
      category,
      basic,
      standard,
      pro,
      deliveryTime,
      faqs: toArray(faqs),
      about,
    };

    // Optional new fields normalization & validation
    if (badges !== undefined) payload.badges = toArray(badges).map(String);
    if (rating !== undefined) {
      const r = Number(rating);
      if (!Number.isNaN(r)) payload.rating = Math.max(0, Math.min(5, r));
    }
    if (projects !== undefined) {
      const p = parseInt(projects, 10);
      if (!Number.isNaN(p) && p >= 0) payload.projects = p;
    }
    if (status !== undefined) {
      const allowed = ['Available', 'Unavailable'];
      if (allowed.includes(status)) payload.status = status;
    }
    if (location !== undefined) payload.location = String(location).trim();
    if (responseTime !== undefined) payload.responseTime = String(responseTime).trim();
    if (successRate !== undefined) {
      const s = Number(successRate);
      if (!Number.isNaN(s)) payload.successRate = Math.max(0, Math.min(100, s));
    }
    if (avatar !== undefined) payload.avatar = String(avatar).trim();

    const newGig = new Gig(payload);
    
    const savedGig = await newGig.save();
    console.log('Gig created successfully:', savedGig.walletAddress);

    const portfolio = await Portfolio.findOne({  "heroSection.walletAddress":walletAddress });
    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    if (!portfolio.userGigs.includes(savedGig._id)) {
      portfolio.userGigs.push(savedGig._id);
      await portfolio.save();
    }
    return res.status(201).json(savedGig);
  } catch (error) {
    console.error('❌ Create gig error:', error);
    return res.status(500).json({ message:error.message });
  }
};

// Update a gig
export const updateGig = async (req, res) => {
  try {
    const {
      username,
      title,
      description,
      price,
      gigimage,
      images,
      category,
      deliveryTime,
      faqs,
      about,
      tags,
      skills,
      basic,
      standard,
      pro,
      badges,
      rating,
      projects,
      status,
      location,
      responseTime,
      successRate,
      avatar,
    } = req.body;

    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (!req.user || !req.user.address == gig.walletAddress) {
      return res.status(400).json({ message: 'User wallet address is required' });
    }

    if (title !== undefined) gig.title = title;
    if (price !== undefined) gig.price = price;
    if (username !== undefined) gig.username = username;
    if (description !== undefined) gig.description = description;
    if (gigimage !== undefined) gig.gigimage = gigimage;
    if (images !== undefined) gig.images = toArray(images);
    if (category !== undefined) gig.category = category;
    if (deliveryTime !== undefined) gig.deliveryTime = deliveryTime;
    if (faqs !== undefined) gig.faqs = toArray(faqs);
    if (about !== undefined) gig.about = about;
    if (tags !== undefined) gig.tags = toArray(tags);
    if (skills !== undefined) gig.skills = toArray(skills);

    // Package updates: update if provided
    if (hasPayload(basic)) gig.basic = basic;
    if (hasPayload(standard)) gig.standard = standard;
    if (hasPayload(pro)) gig.pro = pro;

    // -------------------------
    // New profile/metadata fields
    // -------------------------
    if (badges !== undefined) {
      gig.badges = toArray(badges).map(String);
    }
    if (rating !== undefined) {
      const r = Number(rating);
      if (!Number.isNaN(r)) {
        gig.rating = Math.max(0, Math.min(5, r));
      }
    }
    if (projects !== undefined) {
      const p = parseInt(projects, 10);
      if (!Number.isNaN(p) && p >= 0) gig.projects = p;
    }
    if (status !== undefined) {
      const allowed = ['Available', 'Unavailable'];
      if (allowed.includes(status)) gig.status = status;
    }
    if (location !== undefined) gig.location = String(location).trim();
    if (responseTime !== undefined) gig.responseTime = String(responseTime).trim();
    if (successRate !== undefined) {
      const s = Number(successRate);
      if (!Number.isNaN(s)) {
        gig.successRate = Math.max(0, Math.min(100, s));
      }
    }
    if (avatar !== undefined) gig.avatar = String(avatar).trim();

    const updatedGig = await gig.save();
    return res.json(updatedGig);
  } catch (error) {
    console.error('❌ Update gig error:', error);
    return res.status(500).json({ message: 'Server error while updating gig' });
  }
};

// Get gig by ID
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('walletAddress', 'name email'); // Corrected populate field

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    return res.json(gig);
  } catch (error) {
    console.error('❌ Get gig by ID error:', error);
    return res.status(500).json({ message: 'Server error while fetching gig' });
  }
};
// Get all gigs
export const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({}).populate('walletAddress', 'name email'); // Corrected populate field
    return res.json(gigs);
  } catch (error) {
    console.error('❌ Get all gigs error:', error);
    return res.status(500).json({ message: 'Server error while fetching gigs' });
  }
};

// Delete a gig
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    if(!req.user || req.user.address==gig.walletAddress){
      return res.status(400).json({ message: 'User wallet address is required' });
    }
    // You have to fix the issue in the backend controller. I fixed the issue.
    await gig.deleteOne();
    return res.json({ message: 'Gig removed' });
  } catch (error) {
    console.error('❌ Delete gig error:', error);
    return res.status(500).json({ message: 'Server error while deleting gig' });
  }
};














// Create a new gig
// export const createGig = async (req, res) => {
//   console.log('CreateGig - content-type:', req.headers['content-type']);
//     console.log('CreateGig - body:', req.body);
//   try {
//     const {
//       userwalletAddress,
//       title,
//       description,
//       images,      
//       category,
//       deliveryTime,
//       faqs,        
//       about,
//       tags,
//       skills,
//       basic,
//       standard,
//       pro,
//     } = req.body;
    
//     // Get the user ID from the authenticated request object
//     // Assuming your token payload contains the user's ID as '_id'

//     // required top-level fields
//     if (!userwalletAddress || !title || !description || !category || !deliveryTime ) {
//       return res.status(400).json({ message: 'Please enter all required fields' });
//     }

//     // package validation: exactly one of basic/standard/pro
//     const { count, selected } = countSelectedPackages({ basic, standard, pro });
//     if (count === 0) {
//       return res.status(400).json({ message: 'Provide one package: basic, standard, or pro' });
//     }
//     if (count > 1) {
//       return res.status(400).json({ message: `Only one package allowed. You sent: ${selected.join(', ')}` });
//     }

//     const newGig = new Gig({
//       userwalletAddress,
//       title,
//       description,
//       images: toArray(images),
//       tags: toArray(tags),
//       skills: toArray(skills),
//       category,
//       ...(hasPayload(basic) && { basic }),
//       ...(hasPayload(standard) && { standard }),
//       ...(hasPayload(pro) && { pro }),
//       deliveryTime,
//       faqs: toArray(faqs),
//       about,
//     });

//     const savedGig = await newGig.save();
//     return res.status(201).json(savedGig);
//   } catch (error) {
//     console.error('❌ Create gig error:', error);
//     return res.status(500).json({ message: 'Server error while creating gig' });
//   }
// };
// export const updateGig = async (req, res) => {
//   try {
//     const {
//       userwalletAddress,
//       title,
//       description,
//       images,
//       category,
//       deliveryTime,
//       faqs,
//       about,
//       tags,
//       skills,
//       basic,
//       standard,
//       pro,
//     } = req.body;

//     const gig = await Gig.findById(req.params.id);
//     if (!gig) {
//       return res.status(404).json({ message: 'Gig not found' });
//     }

//     const { count, selected } = countSelectedPackages({ basic, standard, pro });
//     if (count > 1) {
//       return res.status(400).json({ message: `Only one package allowed. You sent: ${selected.join(', ')}` });
//     }
//     // Top-level updates
//     if(userwalletAddress !== undefined) gig.userwalletAddress = userwalletAddress;
//     if (title !== undefined) gig.title = title;
//     if (description !== undefined) gig.description = description;
//     if (images !== undefined) gig.images = toArray(images);
//     if (category !== undefined) gig.category = category;
//     if (deliveryTime !== undefined) gig.deliveryTime = deliveryTime;
//     if (faqs !== undefined) gig.faqs = toArray(faqs);
//     if (about !== undefined) gig.about = about;
//     if (tags !== undefined) gig.tags = toArray(tags);
//     if (skills !== undefined) gig.skills = toArray(skills);

//     // Package updates: replace whichever is provided; clear others if switching
//     if (count === 1) {
//       gig.basic = undefined;
//       gig.standard = undefined;
//       gig.pro = undefined;
//       if (hasPayload(basic)) gig.basic = basic;
//       if (hasPayload(standard)) gig.standard = standard;
//       if (hasPayload(pro)) gig.pro = pro;
//     } else if (count === 0) {
//       // no package fields in payload -> leave existing as-is
//     }

//     const updatedGig = await gig.save();
//     return res.json(updatedGig);
//   } catch (error) {
//     console.error('❌ Update gig error:', error);
//     return res.status(500).json({ message: 'Server error while updating gig' });
//   }
// };





import Gig from '../models/GigModel.js';

const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const hasPayload = (obj) =>
  obj && typeof obj === 'object' && Object.keys(obj).length > 0;

const countSelectedPackages = (body) => {
  const names = ['basic', 'standard', 'pro'];
  const selected = names.filter((n) => hasPayload(body[n]));
  return { count: selected.length, selected };
};

// Create a new gig
export const createGig = async (req, res) => {
  try {
    const {
      userwalletAddress,
      title,
      description,
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
    } = req.body;
    
    // Get the user ID from the authenticated request object
    // Assuming your token payload contains the user's ID as '_id'

    // required top-level fields
    if (!userwalletAddress || !title || !description || !category || !deliveryTime ) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    // package validation: exactly one of basic/standard/pro
    const { count, selected } = countSelectedPackages({ basic, standard, pro });
    if (count === 0) {
      return res.status(400).json({ message: 'Provide one package: basic, standard, or pro' });
    }
    if (count > 1) {
      return res.status(400).json({ message: `Only one package allowed. You sent: ${selected.join(', ')}` });
    }

    const newGig = new Gig({
      userwalletAddress,
      title,
      description,
      images: toArray(images),
      tags: toArray(tags),
      skills: toArray(skills),
      category,
      ...(hasPayload(basic) && { basic }),
      ...(hasPayload(standard) && { standard }),
      ...(hasPayload(pro) && { pro }),
      deliveryTime,
      faqs: toArray(faqs),
      about,
    });

    const savedGig = await newGig.save();
    return res.status(201).json(savedGig);
  } catch (error) {
    console.error('❌ Create gig error:', error);
    return res.status(500).json({ message: 'Server error while creating gig' });
  }
};

// Get gig by ID
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate('userwalletAddress', 'name email'); // Corrected populate field

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
    const gigs = await Gig.find({}).populate('userwalletAddress', 'name email'); // Corrected populate field
    return res.json(gigs);
  } catch (error) {
    console.error('❌ Get all gigs error:', error);
    return res.status(500).json({ message: 'Server error while fetching gigs' });
  }
};

// Update a gig
export const updateGig = async (req, res) => {
  try {
    const {
      title,
      description,
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
    } = req.body;

    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    // You have to fix the issue in the backend controller. I fixed the issue.
    if (gig.userwalletAddress.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this gig' });
    }

    // If user is changing packages, enforce "exactly one"
    const { count, selected } = countSelectedPackages({ basic, standard, pro });
    if (count > 1) {
      return res.status(400).json({ message: `Only one package allowed. You sent: ${selected.join(', ')}` });
    }

    // Top-level updates
    if (title !== undefined) gig.title = title;
    if (description !== undefined) gig.description = description;
    if (images !== undefined) gig.images = toArray(images);
    if (category !== undefined) gig.category = category;
    if (deliveryTime !== undefined) gig.deliveryTime = deliveryTime;
    if (faqs !== undefined) gig.faqs = toArray(faqs);
    if (about !== undefined) gig.about = about;
    if (tags !== undefined) gig.tags = toArray(tags);
    if (skills !== undefined) gig.skills = toArray(skills);

    // Package updates: replace whichever is provided; clear others if switching
    if (count === 1) {
      gig.basic = undefined;
      gig.standard = undefined;
      gig.pro = undefined;
      if (hasPayload(basic)) gig.basic = basic;
      if (hasPayload(standard)) gig.standard = standard;
      if (hasPayload(pro)) gig.pro = pro;
    } else if (count === 0) {
      // no package fields in payload -> leave existing as-is
    }

    const updatedGig = await gig.save();
    return res.json(updatedGig);
  } catch (error) {
    console.error('❌ Update gig error:', error);
    return res.status(500).json({ message: 'Server error while updating gig' });
  }
};

// Delete a gig
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    // You have to fix the issue in the backend controller. I fixed the issue.
    if (gig.userwalletAddress.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this gig' });
    }

    await gig.deleteOne();
    return res.json({ message: 'Gig removed' });
  } catch (error) {
    console.error('❌ Delete gig error:', error);
    return res.status(500).json({ message: 'Server error while deleting gig' });
  }
};
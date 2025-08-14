import Gig from '../models/GigModel.js';

// Create a new gig
export const createGig = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      category,
      price,
      deliveryTime,
      revisions,
      faqs,
      about,
    } = req.body;

    if (!title || !description || !category || !price || !deliveryTime || !revisions) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    const newGig = new Gig({
      userId: req.user._id,
      title,
      description,
      images: Array.isArray(images) ? images : (images ? [images] : []),
      category,
      price,
      deliveryTime,
      revisions,
      faqs: Array.isArray(faqs) ? faqs : (faqs ? [faqs] : []),
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
    const gig = await Gig.findById(req.params.id).populate('userId', 'name email');

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
    const gigs = await Gig.find({}).populate('userId', 'name email');
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
      price,
      deliveryTime,
      revisions,
      faqs,
      about,
    } = req.body;

    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    if (gig.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this gig' });
    }

    gig.title = title ?? gig.title;
    gig.description = description ?? gig.description;
    gig.images = images ? (Array.isArray(images) ? images : [images]) : gig.images;
    gig.category = category ?? gig.category;
    gig.price = price ?? gig.price;
    gig.deliveryTime = deliveryTime ?? gig.deliveryTime;
    gig.revisions = revisions ?? gig.revisions;
    gig.faqs = faqs ? (Array.isArray(faqs) ? faqs : [faqs]) : gig.faqs;
    gig.about = about ?? gig.about;

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

    if (gig.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this gig' });
    }

    await gig.deleteOne();
    return res.json({ message: 'Gig removed' });
  } catch (error) {
    console.error('❌ Delete gig error:', error);
    return res.status(500).json({ message: 'Server error while deleting gig' });
  }
};

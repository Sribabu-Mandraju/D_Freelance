import User from '../models/UserModel.js';

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { userWallet, username, email, rating, gigs, experience, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { userWallet }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with email or wallet already exists' });
    }

    const newUser = new User({
      userWallet,
      username,
      email,
      rating,
      gigs,
      experience,
      role,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error while creating user' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('projects');
    res.status(200).json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('projects');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error while updating user' });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
};

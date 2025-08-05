import User from "../models/UserModel.js";

// @desc    Create a new user
// @route   POST /api/users
export const createUser = async (req, res) => {
  try {
    const { userWallet, username, email, rating, gigs, experience, role } = req.body;

    if (!userWallet || !username || !email) {
      return res.status(400).json({ message: "Wallet, username, and email are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { userWallet }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with email or wallet already exists" });
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

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("❌ Create user error:", error);
    res.status(500).json({ message: "Server error while creating user" });
  }
};

// @desc    Get all users
// @route   GET /api/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("projects");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Get users error:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("projects");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Get user error:", error);
    res.status(500).json({ message: "Server error while fetching user" });
  }
};

// @desc    Update user by ID
// @route   PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const allowedFields = ["username", "email", "rating", "gigs", "experience", "role"];
    const updates = {};

    // Only allow whitelisted fields to be updated
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("❌ Update user error:", error);
    res.status(500).json({ message: "Server error while updating user" });
  }
};

// @desc    Delete user by ID
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Delete user error:", error);
    res.status(500).json({ message: "Server error while deleting user" });
  }
};

import User from "../models/UserModel.js";

const createUser = async (req, res) => {
  try {
    const {
      userWallet,
      username,
      email,
      rating,
      gigs,
      experience,
      role,
    } = req.body;

    if (!userWallet || !username || !email) {
      return res
        .status(400)
        .json({ message: "Wallet, username, and email are required" });
    }

    if (req.user.address !== userWallet.toLowerCase()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to create this user" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { userWallet: userWallet.toLowerCase() }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with email or wallet already exists" });
    }

    const newUser = new User({
      userWallet: userWallet.toLowerCase(),
      username,
      email,
      rating: rating || 0,
      gigs: gigs || [],
      experience: experience || [],
      role: role || "bidder",
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("❌ Create user error:", error);
    res.status(500).json({ message: "Server error while creating user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("projects");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Get users error:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("projects");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Get user error:", error);
    res.status(500).json({ message: "Server error while fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.address !== user.userWallet) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this user" });
    }

    const allowedFields = [
      "username",
      "email",
      "rating",
      "gigs",
      "experience",
      "role",
    ];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).populate("projects");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("❌ Update user error:", error);
    res.status(500).json({ message: "Server error while updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.address !== user.userWallet) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this user" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Delete user error:", error);
    res.status(500).json({ message: "Server error while deleting user" });
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };

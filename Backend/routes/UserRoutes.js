import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";

const router = express.Router();

// @route   POST /api/users
router.post("/", createUser);

// @route   GET /api/users
router.get("/", getAllUsers);

// @route   GET /api/users/:id
router.get("/:id", getUserById);

// @route   PUT /api/users/:id
router.put("/:id", updateUser);

// @route   DELETE /api/users/:id
router.delete("/:id", deleteUser);

export default router;

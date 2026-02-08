const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update logged-in user profile
 * @access  Private
 */
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { username, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

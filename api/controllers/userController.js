const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const { upload } = require("../config/s3");

// Create a new user
async function createUser(req, res) {
  try {
    // Validate requset
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user exist
    if (req.body.email) {
      const existUser = await userModel.getUserByEmail(req.body.email);
      if (existUser) {
        console.log({ existUser });
        return res.status(400).json({ message: "Email sudah terdaftar." });
      }
    }

    const newUser = await userModel.createUser(req.body);
    console.log({ newUser });

    // Handle successful registration logic here
    res.status(201).json({ message: "Registrasi berhasil silahkan login!" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Error creating user" });
  }
}

// Get user list
async function getUsers(req, res) {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Error retrieving user" });
  }
}

// Get a user by ID
async function getUserById(req, res) {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Error retrieving user" });
  }
}

// Get login user profile
async function getUserProfile(req, res) {
  try {
    const user = await userModel.getUserByEmail(req.user.email);
    if (!user) return res.status(404).json({ message: "User tidak ada" });
    res.json({
      status: 0,
      message: "Sukses",
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_image: user.profile_image,
      },
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Error getting user" });
  }
}

// Update profile image
async function updateProfileImage(req, res) {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = req.file.location;
    const userId = req.user.id;

    // Update the user's profile image URL in the database
    userModel
      .updateProfileImage(userId, imageUrl)
      .then((user) => {
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({
          status: 0,
          message: "Update Profile Image berhasil",
          data: {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image,
          },
        });
      })
      .catch((error) => {
        console.error("Error during S3 upload:", error); // Logs the full error object
        res.status(500).json({ error: "Failed to upload image" });
      });
  });
}

// Update a user by ID
async function updateUser(req, res) {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  try {
    await userModel.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
}

module.exports = {
  updateProfileImage,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  getUserProfile,
};

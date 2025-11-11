const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const signUpController = async (req, res) => {
  const { name, email, username, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !username || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Username already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res
      .status(201)
      .json({ user: newUser, token, message: "User registered successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from signUpController" });
  }
};

const loginController = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      res.json({ token, user, message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Incorrect password." });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error from loginController" });
  }
};

module.exports = { signUpController, loginController };

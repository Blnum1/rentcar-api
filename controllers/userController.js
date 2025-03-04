const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await userModel.createUser(username, hashedPassword);
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.getUser(username);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    res.json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { register, login };

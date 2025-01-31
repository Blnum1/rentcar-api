const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(username, hashedPassword);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.getUser(username);
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// ✅ แก้ให้ export ออกมา
module.exports = { register, login };

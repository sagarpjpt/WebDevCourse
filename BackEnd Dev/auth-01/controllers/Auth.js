const bcrypt = require("bcrypt");
const User = require("../models/User");

// signup route controller
exports.signup = async (req, res) => {
  try {
    // get user data
    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash(secure) password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds that adds complexity

    // create entry for user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // save user to DB
    await user.save();

    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error in creating user", success: false });
  }
};

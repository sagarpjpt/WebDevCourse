const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

// login route controller
exports.login = async (req, res) => {
  try {
    // get login data
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // password matched --> generate JWT token
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h", // token valid for 2 hours
    });

    user.password = undefined; // hide password field
    // user is mongoose document so to add new field convert to object
    const userObj = user.toObject();
    userObj.token = token; // store token in user document
    
    // creating cookie and sending token in response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // cookie valid for 3 days
      httpOnly: true, // cookie not accessible via client-side scripts
    };
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user: userObj,
      message: "User logged in successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error in login", success: false });
  }
};

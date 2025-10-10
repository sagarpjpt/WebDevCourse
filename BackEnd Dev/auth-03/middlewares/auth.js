// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {

    console.log("cookie", req.cookies.token)
    console.log("body", req.body.token)
    console.log("header", req.header("Authorization"))

    // extract JWT token
    const token = req.body?.token || req.cookies?.token || req?.header("Authorization")?.replace("Bearer ", ""); // req ke andr header ke andr ``Authorization key ki value lao aur uss value(string) mein replace krdo "Bearer " ko isse --> "" ``

    // req.body.token --> never do that not safe ie never send token in req body
    // req.cookies --> good
    // req.header --> best way (safe)

    // check token recieved or not
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded token recieved from client with req",decode);
      req.user = decode;
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "error while verifying the token", success: false });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    // autherizing user
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for students",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "user role is not matching", success: false });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    // autherizing user
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is protected route for admin",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "user role is not matching", success: false });
  }
};

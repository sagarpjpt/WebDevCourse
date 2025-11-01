const Course = require("../models/Course");
const Tag = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create course
exports.createCourse = async (req, res) => {
  try {
    // fetch data from req
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
    } = req.body;
    const thumbnail = req.files.thumbnailImage;

    // validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check for instructor
    const userId = req.user.userId;
    const instructorDetails = await User.findById(userId);
    if (instructorDetails.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can create courses",
      });
    }

    // check for category validity
    const tagDetails = await Tag.findById(category);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    }

    // upload thumbnail to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.COURSE_THUMBNAIL_FOLDER
    );

    // create course entry in db
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn: whatYouWillLearn.split(","),
      price,
      tag,
      category,
      thumbnail: thumbnailImage.url,
      instructor: instructorDetails._id,
    });

    // add new course to user schema of instructor
    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // add this course to category schema
    await Tag.findByIdAndUpdate(
      tagDetails._id,
      { $push: { course: newCourse._id } },
      { new: true }
    );

    // return response
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.log("Error in createCourse controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};

// get all courses
exports.getAllCourses = async (req, res) => {
  try {
    // fetch all courses from db
    const courses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        price: true,
        thumbnail: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
        instructor: true,
      }
    )
      .populate("instructor")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "All Courses fetched successfully",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get course details by id
exports.getCourseDetails = async (req, res) => {
  try {
    // fetch courseId from params
    const { courseId } = req.params;

    // validate courseId
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // populate everything in course schema
    const fullCourseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .populate("category")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      course: fullCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};

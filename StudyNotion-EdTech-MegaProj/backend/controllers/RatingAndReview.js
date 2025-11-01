const Course = require("../models/Course");
const User = require("../models/User");
const RatingAndReview = require("../models/RatingAndReview");

// createRatingAndReview 
exports.createRatingAndReview = async (req, res) => {
    try {
        // fetch courseId, userId, rating, review from req body
        const {courseId, userId, rating, review} = req.body;

        // validation
        if(!courseId || !userId || !rating || !review){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // valid courseId
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // valid userId
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // check if user is enrolled in the course
        if(!course.studentsEnrolled.includes(userId)){
            return res.status(403).json({
                success: false,
                message: "User is not enrolled in the course"
            });
        }

        // check if user has already given review for the course
        const existingReview = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });
        if(existingReview){
            return res.status(400).json({
                success: false,
                message: "User has already given review for this course"
            });
        }

        // create rating and review entry in db
        const newRatingAndReview = await RatingAndReview.create({
            user: userId,
            rating,
            review,
            course: courseId
        });

        // push ratingAndReview to course schema
        await Course.findByIdAndUpdate(
            courseId,
            { $push: { ratingAndReviews: newRatingAndReview._id } },
            { new: true }
        );

        // return response
        return res.status(201).json({
            success: true,
            message: "Rating and Review added successfully",
            data: newRatingAndReview
        });
    } catch (error) {
        console.error("Error in createRatingAndReview:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: " + error.message
        });
    }
};

// getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
        // fetch courseId from req body
        const {courseId} = req.params;

        // valid courseId
        const course = await Course.findById(courseId).populate("ratingAndReviews");
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // calculate average rating
        const ratings = course.ratingAndReviews;
        if(ratings.length === 0){
            return res.status(200).json({
                success: true,
                averageRating: 0
            });
        }
        const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = totalRating / ratings.length;

        // return response
        return res.status(200).json({
            success: true,
            averageRating: averageRating
        });
    } catch (error) {
        console.error("Error in getAverageRating:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: " + error.message
        });
    }
};

// getAllRatingsAndReviews
exports.getAllRatingsAndReviews = async (req, res) => {
    
    try {
        // extract all ratings and reviews from db
        const ratingsAndReviews = await RatingAndReview.find().sort({rating: "desc"})
            .populate("user", "name")
            .populate("course", "courseName");

        // return response
        return res.status(200).json({
            success: true,
            message: "Ratings and Reviews fetched successfully",
            data: ratingsAndReviews
        });
    } catch (error) {
        console.error("Error in getAllRatingsAndReviews:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: " + error.message
        });
    }
};

// getAllRatingsAndReviewsByCourseId
exports.getAllRatingsAndReviewsByCourseId = async (req, res) => {
    try {
        // fetch courseId from req params
        const {courseId} = req.params;

        // valid courseId
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // extract all ratings and reviews for the course from db
        const ratingsAndReviews = await RatingAndReview.find({course: courseId})
            .populate("user", "name") // populate user name only
            .populate("course", "courseName"); // populate course name only

        // return response
        return res.status(200).json({
            success: true,
            message: "Ratings and Reviews fetched successfully",
            data: ratingsAndReviews
        });
    } catch (error) {
        console.error("Error in getAllRatingsAndReviewsByCourseId:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: " + error.message
        });
    }
};

const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

// create order or catpture payment and initiate razorpay order
exports.capturePayment = async (req, res) => {
    try {
        // fetch courseId and userId from req body
        const {courseId, userId} = req.body;

        // validation
        if(!courseId || !userId){
            return res.status(400).json({
                success: false,
                message: "CourseId and UserId are required"
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

        // check if user is already enrolled in the course
        if(user.courses.includes(courseId)){
            return res.status(400).json({
                success: false,
                message: "User is already enrolled in the course"
            });
        }

        // create order
        const options = {
            amount: course.price * 100,  // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${Math.random() * 1000}`,
            notes: {
                courseId: courseId,
                userId: userId
            }
        };

        // create order using razorpay instance
        const order = await instance.orders.create(options);
        console.log("Razorpay Order:", order);

        // return response
        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            orderId: order.id,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            currency: order.currency,
            amount: order.amount
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error" + error.message
        });
    }
};

// verify signature of razorpay and Server, req came from razorpay webhook not the frontend
exports.verifySignature = async (req, res) => {
    try {

        // fetch webhook secret from env
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        // fetch signature from headers came from razorpay
        const signature = req.headers["x-razorpay-signature"];

        // verify the signature
        const crypto = require("crypto");
        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");
        if(signature !== digest){
            return res.status(400).json({
                success: false,
                message: "Invalid signature"
            });
        }

        // extract courseId and userId from payload
        const {courseId, userId} = req.body.payload.payment.entity.notes;

        // enroll the user in the course
        const enrolledUser = await User.findById(userId);
        enrolledUser.courses.push(courseId);
        await enrolledUser.save();

        // add user to course's studentsEnrolled list
        const course = await Course.findById(courseId);
        course.studentsEnrolled.push(userId);
        await course.save();

        // send course enrollment email to user
        const emailResponse = await mailSender(
            enrolledUser.email,
            "Congratulations! You've been enrolled in a new course",
            courseEnrollmentEmail(
                course.courseName,
                enrolledUser.firstName,
            )
        );
        console.log("Course Enrollment Email Response:", emailResponse);

        // return response
        return res.status(200).json({
            success: true,
            message: "Payment verified and user enrolled in the course successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error" + error.message
        });
    }
};


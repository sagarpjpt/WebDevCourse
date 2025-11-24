const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const Payment = require("../models/Payment");
const { courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const crypto = require("crypto");

// create order or catpture payment and initiate razorpay order
// exports.capturePayment = async (req, res) => {
//     try {
//         // fetch courseId and userId from req body
//         const {courseId, userId} = req.body;

//         // validation
//         if(!courseId || !userId){
//             return res.status(400).json({
//                 success: false,
//                 message: "CourseId and UserId are required"
//             });
//         }

//         // valid courseId
//         const course = await Course.findById(courseId);
//         if(!course){
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found"
//             });
//         }

//         // valid userId
//         const user = await User.findById(userId);
//         if(!user){
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         // check if user is already enrolled in the course
//         if(user.courses.includes(courseId)){
//             return res.status(400).json({
//                 success: false,
//                 message: "User is already enrolled in the course"
//             });
//         }

//         // create order
//         const options = {
//             amount: course.price * 100,  // amount in smallest currency unit
//             currency: "INR",
//             receipt: `receipt_order_${Math.random() * 1000}`,
//             notes: {
//                 courseId: courseId,
//                 userId: userId
//             }
//         };

//         // create order using razorpay instance
//         const order = await instance.orders.create(options);
//         console.log("Razorpay Order:", order);

//         // return response
//         return res.status(200).json({
//             success: true,
//             message: "Order created successfully",
//             orderId: order.id,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             currency: order.currency,
//             amount: order.amount
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error" + error.message
//         });
//     }
// };

// controllers/Payments.js


exports.capturePayment = async (req, res) => {
  try {
    // Accept either courseId (string) OR courseIds (array)
    let { courseId, courseIds, userId } = req.body;

    // console.log("REQ BODY:", req.body);

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    // normalize to array
    let coursesArray = [];
    if (courseIds && Array.isArray(courseIds) && courseIds.length > 0) {
      coursesArray = courseIds;
    } else if (courseId) {
      coursesArray = [courseId];
    } else {
      return res.status(400).json({ success: false, message: "courseId or courseIds required" });
    }

    // fetch courses and compute total
    const courses = await Course.find({ _id: { $in: coursesArray } });
    if (!courses || courses.length === 0) {
      return res.status(404).json({ success: false, message: "No valid courses found" });
    }

    // check for any missing ids
    const foundIds = courses.map(c => c._id.toString());
    const missing = coursesArray.filter(id => !foundIds.includes(id));
    if (missing.length) {
      return res.status(404).json({ success: false, message: `Courses not found: ${missing.join(",")}` });
    }

    // validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // filter out courses user already enrolled in
    const notEnrolledCourses = courses.filter(c => !user.courses.includes(c._id.toString()));
    if (notEnrolledCourses.length === 0) {
      return res.status(400).json({ success: false, message: "User already enrolled in all selected courses" });
    }

    // compute total amount (INR paise)
    const totalAmount = notEnrolledCourses.reduce((sum, c) => sum + (c.price * 100), 0);

    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
      notes: {
        userId: userId,
        // store course ids as JSON string
        courseIds: JSON.stringify(notEnrolledCourses.map(c => c._id.toString()))
      }
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      // optionally return course summary to frontend
      courses: notEnrolledCourses.map(c => ({
        _id: c._id,
        courseName: c.courseName,
        price: c.price,
        thumbnail: c.thumbnail
      }))
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error: " + error.message });
  }
};


// verify signature of razorpay and Server, req came from razorpay webhook not the frontend
// exports.verifySignature = async (req, res) => {
//     try {

//         // fetch webhook secret from env
//         const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

//         // fetch signature from headers came from razorpay
//         const signature = req.headers["x-razorpay-signature"];

//         // verify the signature
//         const crypto = require("crypto");
//         const shasum = crypto.createHmac("sha256", webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");
//         if(signature !== digest){
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid signature"
//             });
//         }

//         // extract courseId and userId from payload
//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         // enroll the user in the course
//         const enrolledUser = await User.findById(userId);
//         enrolledUser.courses.push(courseId);
//         await enrolledUser.save();

//         // add user to course's studentsEnrolled list
//         const course = await Course.findById(courseId);
//         course.studentsEnrolled.push(userId);
//         await course.save();

//         // send course enrollment email to user
//         const emailResponse = await mailSender(
//             enrolledUser.email,
//             "Congratulations! You've been enrolled in a new course",
//             courseEnrollmentEmail(
//                 course.courseName,
//                 enrolledUser.firstName,
//             )
//         );
//         console.log("Course Enrollment Email Response:", emailResponse);

//         // return response
//         return res.status(200).json({
//             success: true,
//             message: "Payment verified and user enrolled in the course successfully"
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error" + error.message
//         });
//     }
// };

exports.verifySignature = async (req, res) => {
  try {
    console.log("RAW BODY:", req.body);
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    const digest = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body) //raw buffer
      .digest("hex");

    if (digest !== signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Convert raw buffer to JSON
    const body = JSON.parse(req.body.toString("utf8"));
    console.log("EVENT RECEIVED:", body.event);


    const event = body.event;
    if (event !== "payment.captured") {
      return res.status(200).json({ success: true, message: `Ignored event: ${event}` });
    }

    // Extract payment entity
    const paymentEntity = body.payload.payment.entity;

    const notes = paymentEntity.notes || {};
    const userId = notes.userId;
    const courseIds = JSON.parse(notes.courseIds || "[]");

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // SAVE PAYMENT RECORD IN DB
    const paymentRecord = await Payment.create({
      razorpayPaymentId: paymentEntity.id,
      razorpayOrderId: paymentEntity.order_id,
      razorpaySignature: signature,
      amount: paymentEntity.amount,
      currency: paymentEntity.currency,
      userId: userId,
      courseIds: courseIds,
      status: paymentEntity.status || "captured",
    });

    console.log("Payment Saved:", paymentRecord);

    // Enroll user in each course
    for (const cId of courseIds) {
      if (!user.courses.includes(cId)) {
        user.courses.push(cId);
      }

      const course = await Course.findById(cId);
      if (course && !course.studentsEnrolled.includes(userId)) {
        course.studentsEnrolled.push(userId);
        await course.save();

        const emailResponse = await mailSender(
          user.email,
          "Congratulations! You've been enrolled in a new course",
          courseEnrollmentEmail(
            course.courseName,
            user.firstName,
          )
        );
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified, saved & user enrolled",
    });

  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};


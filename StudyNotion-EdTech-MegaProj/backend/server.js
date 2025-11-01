const express  = require('express');
const { connectDB } = require('./config/database');
const dotenv   = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

// routes
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const courseRoutes = require('./routes/courseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// configure dotenv
dotenv.config();

// initialize express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
}));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// mounting routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profiles', profileRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
cloudinaryConnect();

// test route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to StudyNotion EdTech Platform Backend"
    });
});

// start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



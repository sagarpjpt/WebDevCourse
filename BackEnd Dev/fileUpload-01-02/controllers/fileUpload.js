const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = (req, res, next) => {
  try {
    // fetch a file
    const file = req.files.file;
    console.log("printing file from localFileUpload function", file);

    // defining path, where file is to be uploaded
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`; //__dirname → "directory name" of the current module (file).

    file.mv(path, (err) => {
      console.log("error while saving file at defined path", err);
    });

    // sending response
    return res.status(200).json({
      success: true,
      message: "local file uploaded successfully",
    });
  } catch (error) {
    console.log("error from localFileUpload", error);
    return res.status(500).json({
      success: false,
      message: "local file is not uploaded at server",
    });
  }
};

function isFileTypeSupported(fileType, supportedTypes) {
  return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image Uploader Handler
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    // Fetch file
    const imageFile = req.files.imageFile;
    console.log(imageFile);

    const supportedTypes = ["png", "jpg", "jpeg"];
    const fileType = imageFile.name.split(".")[1].toLowerCase();

    // Check file type is supported or not
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    // Upload to Cloudinary
    const response = await uploadFileToCloudinary(imageFile, "FileApp");
    console.log(response);

    // Upload to DB
    const fileData = await File.create({
      name,
      tags,
      email,
      fileUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: fileData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Video Uploader Handler
exports.videoUpload = async (req, res) => {
  try {
    // Fetch Data
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const videoFile = req.files.videoFile;

    // Validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = videoFile.name.split(".")[1].toLowerCase();

    // HW - File Maximum 5MB
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    // Supported
    // File Upload to the Cloudinary
    const response = await uploadFileToCloudinary(videoFile, "FileApp");

    // Upload To DB
    const vidFile = new File({
      name,
      tags,
      email,
      fileUrl: response.secure_url,
    });

    const file = await vidFile.save();

    res.status(200).json({
      success: true,
      message: "video file uploaded successfully",
      file: file,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// image Reducer Handler
exports.imageReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    // Fetch file
    const imageFile = req.files.imageFile;
    console.log(imageFile);

    const supportedTypes = ["png", "jpg", "jpeg"];
    const fileType = imageFile.name.split(".")[1].toLowerCase();

    // Check file type is supported or not
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    // Upload to Cloudinary
    // HW - Decrease size by height and width
    const response = await uploadFileToCloudinary(imageFile, "FileApp", 50);
    console.log(response);

    // Upload to DB
    const fileData = await File.create({
      name,
      tags,
      email,
      fileUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: fileData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

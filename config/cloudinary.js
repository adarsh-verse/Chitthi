import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config(); // ✅ make sure .env variables are loaded

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  if (!filePath || !fs.existsSync(filePath)) {
    console.error("File path missing:", filePath);
    return null;
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    fs.unlink(filePath, (err) => {
      if (err) console.warn("Warning: could not delete local file", err.message);
    });

    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, () => {});
    }
    return null;
  }
};

export default uploadOnCloudinary;

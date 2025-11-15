import express from "express";
import "dotenv/config";
import { uploadToCloudinary } from "../utils/cloudinary";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { image } = req.body; 
    if (!image) return res.status(400).json({ error: "No image provided" });

    const uploadedUrl = await uploadToCloudinary(image);
    res.json({ success: true, url: uploadedUrl });
  } catch (err: any) {
    console.error("Cloud upload failed →", err);
  res.status(500).json({
    error: "Cloud upload failed",
    details: err.message || err,
  });
  }
});

export default router;


import express from "express";
import { prisma } from "@repo/db";
import axios from "axios";

const router = express.Router();

// Handle fal.ai webhook after generation completes
router.post("/", async (req, res) => {
  try {
    const { request_id, generationId, output } = req.body;

    if (!generationId || !output?.[0]?.url) {
      console.error("⚠️ Missing data in fal.ai webhook:", req.body);
      return res.status(400).json({ error: "Invalid webhook payload" });
    }

    const imageUrl = output[0].url;

    
    const cloudinaryUpload = await axios.post(
      `${process.env.CLOUDINARY_UPLOAD_URL}`, // something like: https://api.cloudinary.com/v1_1/<cloud_name>/image/upload
      {
        file: imageUrl,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      }
    );

    const finalImageUrl = cloudinaryUpload.data.secure_url || imageUrl;

    
    await prisma.generation.update({
      where: { id: generationId },
      data: {
        status: "COMPLETED",
        imageUrl: finalImageUrl,
      },
    });

    console.log(`Generation ${generationId} completed and saved`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in fal.ai webhook:", error);
    return res.status(500).json({ error: "Webhook handling failed" });
  }
});

export default router;

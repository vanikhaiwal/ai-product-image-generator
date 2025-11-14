import express from "express";
import { prisma } from "@repo/db";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    const generationId =
      body?.metadata?.generationId ||
      body?.metadata?.generation_id;

    if (!generationId) {
      console.error("No generationId found", body);
      return res.status(400).json({ error: "Missing generationId" });
    }

    
    const imageUrl =
      body?.output?.[0]?.url ||
      body?.images?.[0]?.url ||
      body?.result?.[0]?.url;

    if (!imageUrl) {
      console.error("No image url found", body);
      return res.status(400).json({ error: "Missing image url" });
    }

    
    const uploadResp = await axios.post(
      process.env.CLOUDINARY_UPLOAD_URL!,
      {
        file: imageUrl,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      }
    );

    const finalUrl = uploadResp.data.secure_url;

    await prisma.generation.update({
      where: { id: generationId },
      data: {
        status: "SUCCESS",
        imageUrl: finalUrl,
      },
    });

    console.log(`Updated Generation ${generationId}`);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("FAL Webhook Error:", error);
    return res.status(500).json({ error: "Webhook handling failed" });
  }
});

export default router;

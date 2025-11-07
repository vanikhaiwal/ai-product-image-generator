import express from "express";
import { fal } from "@fal-ai/client";
import prisma from "@repo/db";


const router = express.Router();


fal.config({
  credentials: process.env.FAL_KEY!,
});

router.post("/generate", async (req, res) => {
  try {
    const { prompt, userId, baseImageUrl, model = "fal-ai/flux-pro", productId } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    
    const generation = await prisma.generation.create({
      data: {
        prompt,
        userId,
        baseImageUrl,
        modelUsed: model,
        productId,
        status: "PENDING",
      },
    });

    
    const result = await fal.subscribe(model, {
      input: {
        prompt,
        image_url: baseImageUrl,
      },
      logs: true,
      onQueueUpdate: (update: any) => {
        console.log("Queue update:", update);
      },
    });

    const imageUrl = result.data?.images?.[0]?.url ?? null;

    
    await prisma.generation.update({
      where: { id: generation.id },
      data: {
        imageUrl,
        status: imageUrl ? "SUCCESS" : "FAILED",
      },
    });

    return res.status(200).json({ success: true, imageUrl });
  } catch (error: any) {
    console.error("Error creating generation:", error);
    return res.status(500).json({
      error: "Something went wrong",
      details: error.message,
    });
  }
});

export default router;

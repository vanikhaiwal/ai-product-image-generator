import express from "express";
import { prisma } from "@repo/db";
import { startFalGeneration } from "../utils/falClient";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt, productId, userId } = req.body;
    if (!prompt || !userId) return res.status(400).json({ error: "Missing data" });

   
    const generation = await prisma.generation.create({
      data: {
        prompt,
        status: "PENDING",
        productId,
        userId,
      },
    });

    
    const falResp = await startFalGeneration(prompt, generation.id);

    res.json({
      success: true,
      generationId: generation.id,
      falRequestId: falResp.request_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation start failed" });
  }
});

export default router;

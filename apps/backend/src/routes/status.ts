import express from "express";
import { prisma } from "@repo/db";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const generation = await prisma.generation.findUnique({
      where: { id },
    });

    if (!generation) {
      return res.status(404).json({ error: "Generation not found" });
    }

    return res.json({
      status: generation.status,
      imageUrl: generation.imageUrl,
      prompt: generation.prompt,
      falId: generation.falId,
      createdAt: generation.createdAt,
    });

  } catch (err) {
    console.error("Status fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch status" });
  }
});

export default router;

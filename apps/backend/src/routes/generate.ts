// import express from "express";
// import { prisma } from "@repo/db";
// import { startFalGeneration } from "../utils/falClient";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { prompt, productId, userId } = req.body;
//     if (!prompt || !userId) return res.status(400).json({ error: "Missing data" });

   
//     const generation = await prisma.generation.create({
//       data: {
//         prompt,
//         status: "PENDING",
//         productId,
//         userId,
//       },
//     });

    
//     const falResp = await startFalGeneration(prompt, generation.id);

//     res.json({
//       success: true,
//       generationId: generation.id,
//       falRequestId: falResp.request_id,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Generation start failed" });
//   }
// });

// export default router;
import express from "express";
import { prisma } from "@repo/db";
import { startFalGeneration } from "../utils/falClient";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt, productId, userId } = req.body;

    if (!prompt || !userId) {
      return res.status(400).json({ error: "Missing prompt or userId" });
    }

    const generation = await prisma.generation.create({
      data: {
        prompt,
        status: "PENDING",
        productId: productId || null, // optional
        userId,
      },
    });

    const falResp = await startFalGeneration(prompt, generation.id);

    return res.status(202).json({
      message: "Generation started",
      generationId: generation.id,
      falRequestId: falResp.request_id,
    });

  } catch (error: any) {
    console.error("Generation error:", error);
    return res.status(500).json({ error: "Failed to start generation" });
  }
});

export default router;

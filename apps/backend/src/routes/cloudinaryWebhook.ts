import express from "express";
import  prisma  from "@repo/db";
import { uploadToCloudinary } from "../utils/cloudinary";

const router = express.Router();


router.post("/fal", async (req, res) => {
   try {
      const { status, images, metadata } = req.body;

      const generationId = metadata?.generationId;
      if (!generationId) return res.status(400).json({ error: "Missing generation ID" });

      if (status === "completed") {
         const falImageUrl = images?.[0]?.url;
         const cloudUrl = await uploadToCloudinary(falImageUrl);

         await prisma.generation.update({
            where: { id: generationId },
            data: {
               status: "SUCCESS",
               imageUrl: cloudUrl,
            },
         });
      } else {
         await prisma.generation.update({
            where: { id: generationId },
            data: { status: "FAILED" },
         });
      }

      res.json({ ok: true });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: err});
   }
});

export default router;

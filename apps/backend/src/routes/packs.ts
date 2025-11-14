// import { Router } from "express";
// import { prisma } from "../lib/prisma";

// const router = Router();


// router.get("/", async (req, res) => {
//   const packs = await prisma.promptPack.findMany({
//     include: { prompts: true },
//   });
//   res.json(packs);
// });


// router.post("/", async (req, res) => {
//   try {
//     const { title, description, coverImage, price, prompts } = req.body;

//     if (!title || !prompts || prompts.length === 0) {
//       return res.status(400).json({ message: "Title & prompts are required" });
//     }

//     const pack = await prisma.promptPack.create({
//       data: {
//         title,
//         description,
//         coverImage,
//         price,
//         prompts: {
//           create: prompts.map((p: string) => ({
//             text: p,
//           })),
//         },
//       },
//       include: { prompts: true },
//     });

//     res.json(pack);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal error" });
//   }
// });

// export default router;

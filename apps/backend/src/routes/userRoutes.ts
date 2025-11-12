import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "@clerk/express";

const router = Router();
const prisma = new PrismaClient();

router.get("/me", requireAuth(), async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { authId: userId },
      include: {
        products: true,
        generations: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/deduct-credits", requireAuth(), async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    await prisma.user.update({
      where: { authId: userId },
      data: { credits: { decrement: 1 } },
    });

    res.json({ message: "Credit deducted" });
  } catch (err) {
    console.error("Error deducting credits:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;


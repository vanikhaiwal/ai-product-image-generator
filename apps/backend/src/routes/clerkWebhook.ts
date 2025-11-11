import express from "express";
import { Webhook } from "svix";
import { prisma } from "@repo/db";

const router = express.Router();

router.post("/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt;
  try {
    evt = wh.verify(JSON.stringify(payload), headers);
  } catch (err) {
    console.error("Webhook signature failed:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;

    await prisma.user.upsert({
      where: { authId: id },
      update: {},
      create: {
        authId: id,
        email: email_addresses[0].email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      },
    });

    console.log("New user synced to DB:", id);
  }

  res.status(200).json({ message: "ok" });
});

export default router;

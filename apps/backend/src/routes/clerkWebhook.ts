import express, { Request, Response } from "express";
import { Webhook } from "svix";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json({ type: "*/*" })); 


function getSvixHeaders(req: Request) {
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error("Missing Svix headers");
  }

  return {
    "svix-id": svix_id as string,
    "svix-timestamp": svix_timestamp as string,
    "svix-signature": svix_signature as string,
  };
}


app.post("/api/webhooks", async (req: Request, res: Response) => {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error("Missing CLERK_WEBHOOK_SECRET");

    const headers = getSvixHeaders(req);
    const payload = req.body;

    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(JSON.stringify(payload), headers);


    const eventType = (evt as any).type;
    const data = (evt as any).data;

    console.log("✅ Clerk webhook event:", eventType);

    if (eventType === "user.created") {
      const email = data.email_addresses?.[0]?.email_address ?? "";
      const name = data.first_name
        ? `${data.first_name} ${data.last_name || ""}`.trim()
        : null;

      await prisma.user.create({
        data: {
          authId: data.id,
          email,
          name,
          credits: 10, 
        },
      });

      console.log("User created in DB:", email);
    }

    if (eventType === "user.deleted") {
      await prisma.user.delete({
        where: { authId: data.id },
      });

      console.log("User deleted:", data.id);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Clerk webhook error:", err);
    res.status(400).json({ error: "Invalid webhook or signature" });
  }
});

export default app;

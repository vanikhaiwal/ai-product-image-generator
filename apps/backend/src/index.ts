import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { requireAuth } from "./middlewares/clerkAuth";
import { errorHandler } from "./middlewares/error";
import clerkWebhookRouter from "./routes/clerkWebhook";
import generateRoute from "./routes/generate";
import webhookRoute from "./routes/webhook";
import uploadRoute from "./routes/upload";



const app = express();
app.use(errorHandler);
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/webhooks", clerkWebhookRouter);

app.use("/api/generate", generateRoute);
app.use("/api/webhook", webhookRoute);
app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});


app.get("/protected", requireAuth, (req: Request, res: Response) => {
  const userId = req.auth?.userId;
  res.json({ message: `Welcome user ${userId}` });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

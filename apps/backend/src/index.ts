import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { requireAuth } from "./middlewares/clerkAuth";
import { errorHandler } from "./middlewares/error";
import clerkWebhookRouter from "./routes/clerkWebhook";
import falWebhook from "./routes/falWebhook";
import statusRoute from "./routes/status";
import userRoutes from "./routes/userRoutes";
//import packsRouter from "./routes/packs";
import generateRoute from "./routes/generate";
import cloudinaryWebhookRouter from "./routes/cloudinaryWebhook";
import uploadRoute from "./routes/upload";



const app = express();
app.use(errorHandler);
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("api/clerkWebhook", clerkWebhookRouter);
app.use("/api/generate", generateRoute);
app.use("/api/cloudinaryWebhook", cloudinaryWebhookRouter);
app.use("/api/upload", uploadRoute);
app.use("/api/users", userRoutes);
app.use("/api/generate/status", statusRoute);
app.use("/api/webhooks/fal", falWebhook);
//app.use("/packs", packsRouter);


app.get("/", (req, res) => {
  res.send("Server is running ");
});


app.get("/protected", requireAuth, (req: Request, res: Response) => {
  const userId = req.auth?.userId;
  res.json({ message: `Welcome user ${userId}` });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

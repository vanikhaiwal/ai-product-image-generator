import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import generateRoute from "./routes/generate";
import webhookRoute from "./routes/webhook";
import uploadRoute from "./routes/upload";



const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/generate", generateRoute);
app.use("/api/webhook", webhookRoute);
app.use("/api/upload", uploadRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

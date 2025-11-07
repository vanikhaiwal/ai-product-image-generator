import express from "express";
import { upload } from "../utils/fileHandler.js";
import path from "path";

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = `${process.env.SERVER_URL || "http://localhost:8000"}/uploads/${req.file.filename}`;

  return res.status(200).json({
    message: "File uploaded successfully",
    url: fileUrl,
  });
});

export default router;

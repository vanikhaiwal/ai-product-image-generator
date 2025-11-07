import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import aiRoutes from "./routes/ai.routes.ts";
import uploadRoutes from "./routes/upload.routes.ts";
// import productRoutes from "./routes/product.routes.js";
// import promptRoutes from "./routes/prompt.routes.js";
// import userRoutes from "./routes/user.routes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/ai", aiRoutes);
app.use("/api/upload", uploadRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/prompts", promptRoutes);
// app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

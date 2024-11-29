import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import { initializeFirebase } from "./firebaseConnection/config.js";
import apiRoutes from "./routes/api.js";
import helmet from "helmet";
import bodyParser from "body-parser";

// env variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(
  cors({
    origin: "*", // Allows all origins, you can narrow this down if needed
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());
// app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());

// routes
app.use("/api", apiRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

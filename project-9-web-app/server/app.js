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
const PORT = process.env.PORT || 4500;

// middleware
app.use(
  cors({
    origin: "*", // Allows all origins
    methods: ["GET", "POST"], // HTTP methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  })
);

app.use(bodyParser.json()); // for parsing application/json
// app.use(express.json());
app.use(helmet()); // for security

// routes
app.use("/api", apiRoutes);

// start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

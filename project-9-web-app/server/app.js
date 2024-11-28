import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { initializeFirebase } from "./firebaseConnection/config.js";
import apiRoutes from "./routes/api.js";
import helmet from "helmet";
import bodyParser from "body-parser";

// env variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
app.use(helmet());

// initialize firebase
initializeFirebase();

// routes
app.use("/api", apiRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
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
    origin: "*", // Allows all origins,
    origin: "http://127.0.0.1:5500", // Allows only the specified origin
    methods: ["GET", "POST"], // http methods
    allowedHeaders: ["Content-Type"], // headers to allow
  })
);

app.use(bodyParser.json()); // for parsing application/json
// app.use(express.json());
app.use(helmet()); // for security

// routes
app.use("/api", apiRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

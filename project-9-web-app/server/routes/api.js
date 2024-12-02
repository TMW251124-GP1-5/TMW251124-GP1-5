import express from "express";
import { orderHandler } from "../firebaseConnection/order.js";

// express router instance to handle the routes
const router = express.Router();

// route to handle the order request
router.post("/order", orderHandler);

export default router;

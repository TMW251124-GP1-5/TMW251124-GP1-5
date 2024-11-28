import express from "express";
import { orderHandler } from "../firebaseConnection/order.js";

const router = express.Router();

router.post("/order", orderHandler);

export default router;

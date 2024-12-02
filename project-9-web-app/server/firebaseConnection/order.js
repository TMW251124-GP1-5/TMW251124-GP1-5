import { db } from "./config.js";
// import express from "express";

// console.log("FIrestore DB Instance", db);

// orderHandler function to handle the order request
export const orderHandler = async (req, res) => {
  const {
    name,
    phoneNumber,
    deliveryAddress,
    selectPlan,
    dietaryPreference,
    addOns,
  } = req.body;

  try {
    const orderRef = db.collection("orders").doc();
    await orderRef.set({
      id: orderRef.id,
      name,
      phoneNumber,
      deliveryAddress,
      selectPlan,
      dietaryPreference,
      addOns: addOns || "None",
      createdAt: new Date().toISOString(),
    });

    res
      .status(201)
      .json({ message: "Order created successfully", id: orderRef.id });
  } catch (error) {
    console.error("Error placing order: ", error);
    res.status(500).json({ message: "Failed to place order" });
  }
  // console.log("Order Placed", req.body);
};

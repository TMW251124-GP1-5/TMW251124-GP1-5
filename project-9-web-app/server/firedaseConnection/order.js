const admin = require("firebase-admin");

async function orderHandler(req, res) {
  try {
    const {
      name,
      phoneNumber,
      deliveryAddress,
      selectPlan,
      dietaryPreference,
      addOns,
    } = req.body;

    if (!name || !phoneNumber || !deliveryAddress || !selectPlan) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const db = admin.firestore();
    const orderRef = db.collection("orders").doc();

    const newOrder = {
      name,
      phoneNumber,
      deliveryAddress,
      selectPlan,
      dietaryPreference: dietaryPreference || "None",
      addOns: addOns || "None",
      orderDate: admin.firestore.Timestamp.now(),
      status: "Pending",
    };

    const doc = await orderRef.add(newOrder);

    res
      .status(201)
      .json({ message: "Order created successfully", id: docRef.id });
  } catch (error) {
    console.error("Error placing order: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
module.exports = { orderHandler };

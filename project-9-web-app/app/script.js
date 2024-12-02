document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const orderForm = document.getElementById("orderForm");
  const confirmationSection = document.getElementById("confirmationSection");
  const customerName = document.getElementById("customerName");
  const orderPlan = document.getElementById("orderPlan");
  const orderDietary = document.getElementById("orderDietary");
  const orderAddress = document.getElementById("orderAddress");
  const orderAddOns = document.getElementById("orderAddOns");
  const totalCostDisplay = document.getElementById("totalCostDisplay");
  const planSelect = document.getElementById("plan");

  // Validation: Check if all required elements are present in the DOM
  if (
    !orderForm ||
    !confirmationSection ||
    !customerName ||
    !orderPlan ||
    !orderDietary ||
    !orderAddress ||
    !orderAddOns ||
    !totalCostDisplay ||
    !planSelect
  ) {
    console.error("One or more required elements are missing in the DOM");
    return;
  }

  // Delivery fee constant
  const deliveryFee = 10;

  // Handle order form submission
  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phoneNumber = document.getElementById("phone").value;
    const deliveryAddress = document.getElementById("address").value;
    const selectPlan = document.getElementById("plan").value;
    const dietaryPreference =
      document.getElementById("dietaryPreference").value;
    const addOns = document.getElementById("addOns").value;

    const orderData = {
      name,
      phoneNumber,
      deliveryAddress,
      selectPlan,
      dietaryPreference,
      addOns,
    };

    console.log("Order data:", orderData);

    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success: Show confirmation and clear the form
        confirmationSection.classList.remove("hidden");
        customerName.textContent = name;
        orderPlan.textContent = selectPlan;
        orderDietary.textContent = dietaryPreference;
        orderAddress.textContent = deliveryAddress;
        orderAddOns.textContent = addOns;

        // Clear form inputs after successful submission
        orderForm.reset();

        // Simulate WhatsApp/SMS notification
        sendNotification(name, phoneNumber, selectPlan);

        // Show success message
        alert("Your order has been successfully placed!");
      } else {
        alert(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  });

  //This function is to update the total cost
  function updateTotalCost() {
    const planCost = parseInt(planSelect.value, 10);

    if (!isNaN(planCost) && planCost > 0) {
      const totalCost = planCost + deliveryFee;
      totalCostDisplay.textContent = `₵${totalCost}`; // Display with Ghana cedi symbol
    } else {
      totalCostDisplay.textContent = "₵0";
    }
  }

  // Add event listener for plan selection change
  if (planSelect) {
    planSelect.addEventListener("change", updateTotalCost);
  }

  // Future Improvement: Function to simulate sending a WhatsApp/SMS notification
  function sendNotification(name, phoneNumber, plan) {
    console.log(
      `Sending SMS/WhatsApp to ${phoneNumber}: "Hello ${name}, your order for the ${plan} plan has been successfully placed."`
    );
    alert(
      `Notification sent to ${phoneNumber}: Hello ${name}, your order for the ${plan} plan has been confirmed.`
    );
  }

  // Initialize total cost display
  updateTotalCost();
});

// Future Improvement: Fetch and insert the navbar dynamically (optional feature)
document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("body").insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading navbar:", error));
});

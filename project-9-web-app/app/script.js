document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const orderForm = document.getElementById("orderForm");
  const confirmationSection = document.getElementById("confirmationSection");
  const customerName = document.getElementById("customerName");
  const orderPlan = document.getElementById("orderPlan");
  const orderDietary = document.getElementById("orderDietary");
  const orderAddress = document.getElementById("orderAddress");
  const orderAddOns = document.getElementById("orderAddOns");
  const totalCostDisplay = document.getElementById("totalCost");
  const planSelect = document.getElementById("plan");
  const paymentForm = document.getElementById("paymentForm");

  // Check if necessary elements exist before using them
  if (
    !orderForm ||
    !confirmationSection ||
    !customerName ||
    !orderPlan ||
    !orderDietary ||
    !orderAddress ||
    !orderAddOns ||
    !totalCostDisplay ||
    !planSelect ||
    !paymentForm
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
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const selectedPlan = document.getElementById("selectedPlan").value;
    const dietaryPreference =
      document.getElementById("dietaryPreference").value;
    const addOns = document.getElementById("addOns").value;

    const orderData = {
      name,
      phone,
      address,
      selectedPlan,
      dietaryPreference,
      addOns,
    };

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
        orderPlan.textContent = selectedPlan;
        orderDietary.textContent = dietaryPreference;
        orderAddress.textContent = address;
        orderAddOns.textContent = addOns;

        // Optionally clear form inputs after successful submission
        orderForm.reset();

        // Simulate WhatsApp/SMS notification
        sendNotification(name, phone, selectedPlan);

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

  // Function to update the total cost
  function updateTotalCost() {
    const planCost = parseInt(planSelect.value, 10);

    if (!isNaN(planCost) && planCost > 0) {
      const totalCost = planCost + deliveryFee;
      totalCostDisplay.textContent = `₵${totalCost}`; // Display with Ghana cedi symbol
    } else {
      totalCostDisplay.textContent = "₵0";
    }
  }

  // Event listener for plan selection change
  planSelect.addEventListener("change", updateTotalCost);

  // Handle payment form submission (for demo purposes)
  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent actual form submission
    alert("Payment successful!");
  });

  // Initialize total cost display
  updateTotalCost();
});

// Function to simulate sending a WhatsApp/SMS notification
function sendNotification(name, phone, plan) {
  console.log(
    `Sending SMS/WhatsApp to ${phone}: "Hello ${name}, your order for the ${plan} plan has been successfully placed."`
  );
  alert(
    `Notification sent to ${phone}: Hello ${name}, your order for the ${plan} plan has been confirmed.`
  );
}

// Fetch and insert the navbar dynamically (optional feature)
document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("body").insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading navbar:", error));
});

// document.getElementById('menuToggle').addEventListener('click', () => {
//   const navLinks = document.getElementById('navLinks');
//   navLinks.classList.toggle('show');
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const planSelect = document.getElementById('plan');
//   const totalCostDisplay = document.getElementById('totalCost');

//   // Delivery fee
//   const deliveryFee = 10;

//   // Update total cost when plan changes
//   planSelect.addEventListener('change', () => {
//     const planCost = parseInt(planSelect.value, 10);
//     if (!isNaN(planCost)) {
//       const totalCost = planCost + deliveryFee;
//       totalCostDisplay.textContent = `$${totalCost}`;
//     } else {
//       totalCostDisplay.textContent = '$0';
//     }
//   });

//   // Handle form submission
//   const paymentForm = document.getElementById('paymentForm');
//   paymentForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     alert('Payment successful!');
//   });
// });

// BEFORE CODE
// document.addEventListener("DOMContentLoaded", () => {
//   const orderForm = document.getElementById("orderForm");

//   orderForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const name = document.getElementById("name").value;
//     const phone = document.getElementById("phone").value;
//     const address = document.getElementById("address").value;
//     const selectedPlan = document.getElementById("selectedPlan").value;
//     const dietaryPreference =
//       document.getElementById("dietaryPreference").value;
//     const addOns = document.getElementById("addOns").value;

//     const orderData = {
//       name,
//       phone,
//       address,
//       selectedPlan,
//       dietaryPreference,
//       addOns,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         document
//           .getElementById("confirmationSection")
//           .classList.remove("hidden");
//         document.getElementById("customerName").textContent = name;
//         document.getElementById("orderPlan").textContent = selectedPlan;
//         document.getElementById("orderDietary").textContent = dietaryPreference;
//         document.getElementById("orderAddress").textContent = address;
//         document.getElementById("orderAddOns").textContent = addOns;
//       } else {
//         alert(result.message || "An error occurred. Please try again.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//       alert("An error occurred. Please try again.");
//     }
//   });

//   const planSelect = document.getElementById("plan");
//   const totalCostDisplay = document.getElementById("totalCost");

//   // Delivery fee
//   const deliveryFee = 10;

//   // Function to update total cost
//   function updateTotalCost() {
//     const planCost = parseInt(planSelect.value, 10);
//     console.log("Plan selected:", planCost); // Debugging line

//     if (!isNaN(planCost) && planCost > 0) {
//       const totalCost = planCost + deliveryFee;
//       totalCostDisplay.textContent = `₵${totalCost}`; // Displaying with Ghana cedi symbol
//     } else {
//       totalCostDisplay.textContent = "₵0";
//     }
//   }

//   // Event listener for plan selection change
//   planSelect.addEventListener("change", updateTotalCost);

//   // Handle form submission
//   const paymentForm = document.getElementById("paymentForm");
//   paymentForm.addEventListener("submit", (event) => {
//     event.preventDefault(); // Prevent form submission for demo
//     alert("Payment successful!");
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const orderForm = document.getElementById("orderForm");
//   const confirmationSection = document.getElementById("confirmationSection");
//   const customerName = document.getElementById("customerName");
//   const planName = document.getElementById("planName");
//   const orderPlan = document.getElementById("orderPlan");
//   const orderDietary = document.getElementById("orderDietary");
//   const orderAddress = document.getElementById("orderAddress");
//   const orderAddOns = document.getElementById("orderAddOns");

//   // Handle form submission
//   orderForm.addEventListener("submit", (event) => {
//     event.preventDefault(); // Prevent form submission for demo purposes

//     // Retrieve form values
//     const name = document.getElementById("name").value;
//     const phone = document.getElementById("phone").value;
//     const address = document.getElementById("address").value;
//     const selectedPlan = document.getElementById("selectedPlan").value;
//     const dietaryPreference =
//       document.getElementById("dietaryPreference").value;
//     const addOns = document.getElementById("addOns").value;

//     // Fill in confirmation message
//     customerName.textContent = name;
//     planName.textContent = selectedPlan || "Not selected";
//     orderPlan.textContent = selectedPlan || "Not selected";
//     orderDietary.textContent = dietaryPreference;
//     orderAddress.textContent = address;
//     orderAddOns.textContent = addOns || "None";

//     // Show confirmation section
//     confirmationSection.classList.remove("hidden");

//     // Simulate WhatsApp/SMS notification
//     sendNotification(name, phone, selectedPlan);
//   });
// });

// // Function to simulate sending a WhatsApp/SMS notification
// function sendNotification(name, phone, plan) {
//   console.log(
//     `Sending SMS/WhatsApp to ${phone}: "Hello ${name}, your order for the ${plan} plan has been successfully placed."`
//   );
//   alert(
//     `Notification sent to ${phone}: Hello ${name}, your order for the ${plan} plan has been confirmed.`
//   );
// }
// // script.js
// document.addEventListener("DOMContentLoaded", function () {
//   // Fetch and insert the navbar
//   fetch("navbar.html")
//     .then((response) => response.text())
//     .then((data) => {
//       // Insert the navbar at the beginning of the body element
//       document.querySelector("body").insertAdjacentHTML("afterbegin", data);
//     })
//     .catch((error) => console.error("Error loading navbar:", error));
// });

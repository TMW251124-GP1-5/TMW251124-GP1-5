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
document.addEventListener('DOMContentLoaded', () => {
  const planSelect = document.getElementById('plan');
  const totalCostDisplay = document.getElementById('totalCost');

  // Delivery fee
  const deliveryFee = 10;

  // Function to update total cost
  function updateTotalCost() {
    const planCost = parseInt(planSelect.value, 10);
    console.log('Plan selected:', planCost); // Debugging line

    if (!isNaN(planCost) && planCost > 0) {
      const totalCost = planCost + deliveryFee;
      totalCostDisplay.textContent = `₵${totalCost}`; // Displaying with Ghana cedi symbol
    } else {
      totalCostDisplay.textContent = '₵0';
    }
  }

  // Event listener for plan selection change
  planSelect.addEventListener('change', updateTotalCost);

  // Handle form submission
  const paymentForm = document.getElementById('paymentForm');
  paymentForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission for demo
    alert('Payment successful!');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const orderForm = document.getElementById('orderForm');
  const confirmationSection = document.getElementById('confirmationSection');
  const customerName = document.getElementById('customerName');
  const planName = document.getElementById('planName');
  const orderPlan = document.getElementById('orderPlan');
  const orderDietary = document.getElementById('orderDietary');
  const orderAddress = document.getElementById('orderAddress');
  const orderAddOns = document.getElementById('orderAddOns');

  // Handle form submission
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission for demo purposes

    // Retrieve form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const selectedPlan = document.getElementById('selectedPlan').value;
    const dietaryPreference =
      document.getElementById('dietaryPreference').value;
    const addOns = document.getElementById('addOns').value;

    // Fill in confirmation message
    customerName.textContent = name;
    planName.textContent = selectedPlan || 'Not selected';
    orderPlan.textContent = selectedPlan || 'Not selected';
    orderDietary.textContent = dietaryPreference;
    orderAddress.textContent = address;
    orderAddOns.textContent = addOns || 'None';

    // Show confirmation section
    confirmationSection.classList.remove('hidden');

    // Simulate WhatsApp/SMS notification
    sendNotification(name, phone, selectedPlan);
  });
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
// script.js
document.addEventListener('DOMContentLoaded', function () {
  // Fetch and insert the navbar
  fetch('navbar.html')
    .then((response) => response.text())
    .then((data) => {
      // Insert the navbar at the beginning of the body element
      document.querySelector('body').insertAdjacentHTML('afterbegin', data);
    })
    .catch((error) => console.error('Error loading navbar:', error));
});

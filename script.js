// script.js

// Get DOM elements
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("queryModal");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("queryForm");

// Open modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Validate form
  let isValid = true;
  if (!data.first_name) {
    document.getElementById("first_name_error").textContent = "First name is required.";
    isValid = false;
  } else {
    document.getElementById("first_name_error").textContent = "";
  }

  if (!data.phone) {
    document.getElementById("phone_error").textContent = "Phone number is required.";
    isValid = false;
  } else {
    document.getElementById("phone_error").textContent = "";
  }

  if (!data.category) {
    document.getElementById("category_error").textContent = "Category is required.";
    isValid = false;
  } else {
    document.getElementById("category_error").textContent = "";
  }

  if (!isValid) return;

  // Submit form data to API
  try {
    const response = await fetch("https://api.jw.in/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Form submitted successfully!");
      form.reset();
      modal.style.display = "none";
    } else {
      alert("Failed to submit form. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});
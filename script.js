/* ================= SCROLL REVEAL ================= */
window.addEventListener("scroll", () => {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const visiblePoint = 100;

    if (elementTop < windowHeight - visiblePoint) {
      el.classList.add("active");
    }
  });
});

/* ================= STUDENT FIELDS TOGGLE ================= */
const professionSelect = document.getElementById("profession");
const studentFields = document.getElementById("studentFields");

if (professionSelect && studentFields) {
  professionSelect.addEventListener("change", function () {
    const value = this.value;

    // Hindi + English safe check
    if (
      value.includes("Student") ||
      value.includes("College") ||
      value.includes("PhD")
    ) {
      studentFields.style.display = "block";
    } else {
      studentFields.style.display = "none";
    }
  });
}

/* ================= FORM SUBMIT ================= */
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Honeypot check (spam protection)
  if (form.website && form.website.value !== "") {
    return;
  }

  // Loader ON + button disable
  if (submitBtn) {
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
  }

  fetch(
   "https://script.google.com/macros/s/AKfycbyg25H2d7PeT5dl-08JnO31pSiYWeOTjmu7SCyTQ4_ZFwRwVPzbd42T6tPkOjZmOPgGhg/exec",
    {
      method: "POST",
      body: new FormData(form)
    }
  )
    .then(() => {
      form.reset();

      // Hide student fields after reset
      if (studentFields) {
        studentFields.style.display = "none";
      }

      // Show success message
      successMessage.style.display = "block";

      // Auto-hide success message after 5 sec
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    })
    .catch(() => {
      alert("Error submitting form. Please try again.");
    })
    .finally(() => {
      // Loader OFF + button enable
      if (submitBtn) {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }
    });
});

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

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

/* ================= MOBILE FLOATING BAR ================= */
function toggleMobileBar() {
  const bar = document.querySelector('.mobile-social-bar');
  if (!bar) return;

  if (window.innerWidth <= 768) {
    bar.style.display = 'flex';
  } else {
    bar.style.display = 'none';
  }
}

window.addEventListener('load', toggleMobileBar);
window.addEventListener('resize', toggleMobileBar);

/* ================= STATS COUNT ANIMATION ================= */
const counters = document.querySelectorAll('.stat h3');
let statsPlayed = false;

function animateStats() {
  if (statsPlayed) return;

  counters.forEach(counter => {
    const targetText = counter.innerText;
    const target = parseInt(targetText.replace('+','')) || 0;
    let count = 0;

    const speed = Math.max(20, target / 60);

    const updateCount = () => {
      if (count < target) {
        count += speed;
        counter.innerText = Math.floor(count) + '+';
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = targetText;
      }
    };

    updateCount();
  });

  statsPlayed = true;
}

/* ================= OBSERVER FOR STATS ================= */
const statsSection = document.querySelector('.stats');

if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(statsSection);
}

// Hide loader on load
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) loader.style.display = "none";
});
// Auto update footer year
document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


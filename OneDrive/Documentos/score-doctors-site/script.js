const CRC_LOGIN_URL = "https://www.secureclientaccess.com/";
const BOOK_CALL_URL  = "https://calendar.app.google/7B8fRJFnUAEuaPYR7";

function safeGo(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

["crcLoginBtn", "crcLoginBtn2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      safeGo(CRC_LOGIN_URL);
    });
  }
});

["bookCallBtnTop", "bookCallBtnMid", "bookCallBtnContact"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      safeGo(BOOK_CALL_URL);
    });
  }
});

const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Contact form submission (demo):", data);
    form.reset();
    if (formNote) {
      formNote.textContent =
        "Thanks! Message captured locally (demo). Next step: connect this form to Zapier → email/Sheets/CRC.";
    }
  });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const reveals = document.querySelectorAll(".reveal");
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => io.observe(el));
}

const heroBg = document.querySelector(".hero__bg");
let ticking = false;

function onScroll() {
  if (!heroBg) return;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const y = window.scrollY || 0;
      heroBg.style.transform = `translateY(${y * 0.12}px) scale(1.02)`;
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
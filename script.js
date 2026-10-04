// Theme toggle (remembers choice; falls back to system preference)
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(saved || (systemDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Mobile menu
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

// Highlight the nav link for the section in view
const links = [...navLinks.querySelectorAll("a")];
const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(s => observer.observe(s));

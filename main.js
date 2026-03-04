// =========================================================
// Libellya – JS (ultra léger)
// - Burger menu
// - Dropdown "Services" (si présent)
// - Toggle agenda
// - Year footer
// =========================================================

// Helpers
const isClickOutside = (event, elements = []) =>
  !elements.some((el) => el && el.contains(event.target))

// =========================
// Burger menu
// =========================
const burger = document.querySelector(".burger")
const menu = document.querySelector("#menu")

function closeBurgerMenu() {
  if (!burger || !menu) return
  burger.setAttribute("aria-expanded", "false")
  menu.hidden = true
}

function toggleBurgerMenu() {
  if (!burger || !menu) return
  const isOpen = burger.getAttribute("aria-expanded") === "true"
  burger.setAttribute("aria-expanded", String(!isOpen))
  menu.hidden = isOpen
}

if (burger && menu) {
  burger.addEventListener("click", toggleBurgerMenu)

  // Ferme le menu quand on clique un lien
  menu.addEventListener("click", (e) => {
    const target = e.target
    if (target && target.matches("a")) closeBurgerMenu()
  })

  // Ferme si clic en dehors
  document.addEventListener("click", (e) => {
    if (!menu.hidden && isClickOutside(e, [menu, burger])) closeBurgerMenu()
  })

  // Ferme avec ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBurgerMenu()
  })
}

// =========================
// Dropdown Services (desktop)
// (Fonctionne si tu utilises :
// .nav__dropdown .nav__dropbtn + .nav__dropdown-content)
// =========================
const dropWrap = document.querySelector(".nav__dropdown")
const dropBtn = document.querySelector(".nav__dropbtn")
const dropContent = document.querySelector(".nav__dropdown-content")

function closeDropdown() {
  if (!dropBtn || !dropContent) return
  dropBtn.setAttribute("aria-expanded", "false")
  dropContent.style.display = ""
}

function openDropdown() {
  if (!dropBtn || !dropContent) return
  dropBtn.setAttribute("aria-expanded", "true")
  dropContent.style.display = "block"
}

function toggleDropdown() {
  if (!dropBtn || !dropContent) return
  const expanded = dropBtn.getAttribute("aria-expanded") === "true"
  expanded ? closeDropdown() : openDropdown()
}

if (dropWrap && dropBtn && dropContent) {
  // Clic pour ouvrir/fermer (pratique, même desktop)
  dropBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleDropdown()
  })

  // Clique sur un lien => ferme
  dropContent.addEventListener("click", (e) => {
    const target = e.target
    if (target && target.matches("a")) closeDropdown()
  })

  // Clic extérieur => ferme
  document.addEventListener("click", (e) => {
    const isOpen = dropBtn.getAttribute("aria-expanded") === "true"
    if (isOpen && isClickOutside(e, [dropWrap])) closeDropdown()
  })

  // ESC => ferme
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown()
  })
}

// =========================
// Toggle "agenda"
// =========================
const agendaBtn = document.querySelector('[data-toggle="agenda"]')
const agenda = document.querySelector("#agenda")

if (agendaBtn && agenda) {
  agendaBtn.addEventListener("click", () => {
    const isHidden = agenda.hidden
    agenda.hidden = !isHidden
    agendaBtn.textContent = isHidden
      ? "Fermer l’option créneau"
      : "Afficher l’option créneau"
  })
}

// =========================
// Year footer
// =========================
const year = document.querySelector("#year")
if (year) year.textContent = new Date().getFullYear()


// =========================
// SCROLL REVEAL (repeat)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  items.forEach((el) => io.observe(el));
});


// =========================
// animation du titre
// =========================

const phrases = [
  "clarifie votre offre",
  "déclenche des contacts"
];

let i = 0;
const el = document.getElementById("hero-rotate");

setInterval(() => {
  el.classList.add("hero-fade-out");

  setTimeout(() => {
    i = (i + 1) % phrases.length;
    el.textContent = phrases[i];
    el.classList.remove("hero-fade-out");
    el.classList.add("hero-fade-in");
  }, 400);

}, 3500);

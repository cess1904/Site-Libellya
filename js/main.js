// =========================================================
// Libellya – JS (ultra léger)
// - Burger menu
// - Dropdown "Services"
// - Toggle agenda
// - Year footer
// - Scroll reveal
// - Animation titre (home)
// Compatible includes.js (data-include) + event "includes:loaded"
// =========================================================

// Helpers
const isClickOutside = (event, elements = []) =>
  !elements.some((el) => el && el.contains(event.target));

// =========================
// HEADER + FOOTER UI
// (à lancer après injection includes)
// =========================
function initHeaderAndFooterUI() {
  // =========================
  // Burger menu
  // =========================
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("#menu");

  function closeBurgerMenu() {
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  }

  function toggleBurgerMenu() {
    if (!burger || !menu) return;
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  }

  if (burger && menu) {
    burger.addEventListener("click", toggleBurgerMenu);

    // Ferme le menu quand on clique un lien
    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches("a")) closeBurgerMenu();
    });

    // Ferme si clic en dehors
    document.addEventListener("click", (e) => {
      if (!menu.hidden && isClickOutside(e, [menu, burger])) closeBurgerMenu();
    });

    // Ferme avec ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeBurgerMenu();
    });
  }

  // =========================
  // Dropdown Services
  // (tu en as 2 dans ton header : desktop + menu mobile)
  // =========================
  const dropdowns = document.querySelectorAll(".nav__dropdown");

  dropdowns.forEach((wrap) => {
    const btn = wrap.querySelector(".nav__dropbtn");
    const content = wrap.querySelector(".nav__dropdown-content");
    if (!btn || !content) return;

    function close() {
      btn.setAttribute("aria-expanded", "false");
      content.style.display = "";
    }

    function open() {
      btn.setAttribute("aria-expanded", "true");
      content.style.display = "block";
    }

    function toggle() {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      expanded ? close() : open();
    }

    // Clic pour ouvrir/fermer
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    });

    // Clique sur un lien => ferme
    content.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches("a")) close();
    });

    // Clic extérieur => ferme
    document.addEventListener("click", (e) => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      if (isOpen && isClickOutside(e, [wrap])) close();
    });

    // ESC => ferme
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  });

  // =========================
  // Year footer
  // =========================
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
}

// ✅ quand les includes (header/footer) sont injectés
document.addEventListener("includes:loaded", initHeaderAndFooterUI);

// ✅ fallback si une page n’a pas d’include / ou pour éviter les surprises
document.addEventListener("DOMContentLoaded", initHeaderAndFooterUI);

// =========================
// Toggle "agenda"
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const agendaBtn = document.querySelector('[data-toggle="agenda"]');
  const agenda = document.querySelector("#agenda");

  if (agendaBtn && agenda) {
    agendaBtn.addEventListener("click", () => {
      const isHidden = agenda.hidden;
      agenda.hidden = !isHidden;
      agendaBtn.textContent = isHidden
        ? "Fermer l’option créneau"
        : "Afficher l’option créneau";
    });
  }
});

// =========================
// SCROLL REVEAL (repeat)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.18 }
  );

  items.forEach((el) => io.observe(el));
});

// =========================
// animation du titre (HOME)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("hero-rotate");
  if (!el) return; // ✅ évite crash sur pages sans hero (mentions légales etc.)

  const phrases = ["clarifie votre offre", "déclenche des contacts"];
  let i = 0;

  setInterval(() => {
    el.classList.add("hero-fade-out");

    setTimeout(() => {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      el.classList.remove("hero-fade-out");
      el.classList.add("hero-fade-in");
    }, 400);
  }, 3500);
});
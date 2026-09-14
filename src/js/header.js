// Header interactivity: mobile drawer toggle, "Om Nola" submenu, and
// marking the current nav link active.
//
// The submenu opens only on click of its trigger link (not on hover of
// the header/nav) — hover-open felt like an intrusive backdrop popping
// open whenever the cursor passed near the header, so it was removed.
export function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  // Mark current page in the nav
  const path = window.location.pathname.replace(/index\.html$/, "");
  header.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href !== "/" && path.startsWith(href)) {
      a.setAttribute("aria-current", "page");
    } else if (href === "/" && path === "/") {
      a.setAttribute("aria-current", "page");
    }
  });

  // Mobile drawer
  const toggle = header.querySelector("[data-menu-toggle]");
  const drawer = header.querySelector("[data-drawer]");
  const icon = header.querySelector("[data-menu-icon]");
  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const isOpen = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      if (icon) icon.innerHTML = isOpen ? "&times;" : "&#9776;";
    });
  }

  // "Om Nola" submenu — click-to-toggle only, no hover trigger.
  const trigger = header.querySelector("[data-submenu-trigger]");
  const submenu = header.querySelector("[data-submenu]");
  if (trigger && submenu) {
    const open = () => {
      submenu.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      submenu.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    };
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      submenu.classList.contains("is-open") ? close() : open();
    });
    // Click outside the nav box closes it.
    document.addEventListener("click", (e) => {
      if (!submenu.classList.contains("is-open")) return;
      const navBox = header.querySelector(".site-header__nav-box");
      if (!navBox.contains(e.target)) close();
    });
    // Escape closes it.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && submenu.classList.contains("is-open")) close();
    });
  }
}

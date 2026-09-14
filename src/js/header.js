// Header interactivity: mobile drawer toggle, "Om Nola" submenu, and
// marking the current nav link active. Matches the behavior documented
// on the Header & Navigation frame in the NUI 1.0 Figma file:
// hamburger swaps to "×"; submenu opens beneath the nav on hover/click;
// no hover color change on links (opacity/underline feedback only).
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

  // "Om Nola" submenu (desktop hover + click for touch/keyboard)
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
    const navBox = header.querySelector(".site-header__nav-box");
    navBox.addEventListener("mouseenter", (e) => {
      if (navBox.contains(trigger)) open();
    });
    trigger.addEventListener("mouseenter", open);
    navBox.addEventListener("mouseleave", close);
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      submenu.classList.contains("is-open") ? close() : open();
    });
  }
}

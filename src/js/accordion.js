// Accordion items are native <details>/<summary> elements (see
// src/partials snippets that use .accordion-item), so expand/collapse and
// keyboard support come for free from the browser. This hook exists for
// any future JS-driven behavior (e.g. "only one open at a time") without
// having to touch every page that renders an accordion.
export function initAccordions() {
  document.querySelectorAll("[data-accordion-group]").forEach((group) => {
    const items = group.querySelectorAll("details.accordion-item");
    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (item.open) {
          items.forEach((other) => {
            if (other !== item) other.open = false;
          });
        }
      });
    });
  });
}

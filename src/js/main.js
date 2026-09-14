import "../styles/base.css";
import "../styles/components.css";
import { loadIncludes } from "./include.js";
import { initHeader } from "./header.js";
import { initAccordions } from "./accordion.js";

document.addEventListener("includes:loaded", () => {
  initHeader();
  initAccordions();
});

loadIncludes();

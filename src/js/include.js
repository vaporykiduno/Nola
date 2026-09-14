// Lightweight partial loader: fetches HTML fragments into [data-include]
// placeholders, so header/footer markup stays DRY across static pages
// without pulling in a full framework.
export async function loadIncludes() {
  const nodes = document.querySelectorAll("[data-include]");
  await Promise.all(
    Array.from(nodes).map(async (node) => {
      const src = node.getAttribute("data-include");
      try {
        const res = await fetch(src);
        node.innerHTML = await res.text();
      } catch (err) {
        console.error(`Failed to load partial: ${src}`, err);
      }
    })
  );
  document.dispatchEvent(new CustomEvent("includes:loaded"));
}

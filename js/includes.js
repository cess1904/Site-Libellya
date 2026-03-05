// =========================
// pour le header et footer 
// =========================
(async () => {
  const nodes = document.querySelectorAll("[data-include]");
  for (const node of nodes) {
    const url = node.getAttribute("data-include");
    if (!url) continue;

    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      node.innerHTML = await res.text();
    } catch (e) {
      console.error("Include failed:", url, e);
      node.innerHTML = `<!-- Include failed: ${url} -->`;
    }
  }

  document.dispatchEvent(new Event("includes:loaded"));
})();
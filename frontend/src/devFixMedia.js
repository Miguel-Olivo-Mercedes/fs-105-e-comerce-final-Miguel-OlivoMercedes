// Solo en desarrollo: reescribe <img src="/..."> y urls en estilos a VITE_MEDIA_URL
(() => {
  const MEDIA = import.meta?.env?.VITE_MEDIA_URL;
  if (!MEDIA) return;

  const fixImg = (img) => {
    try {
      if (!img || !img.src) return;
      const u = new URL(img.src, location.origin);
      if (u.origin === location.origin && u.pathname.startsWith("/")) {
        img.src = MEDIA + u.pathname + u.search;
      }
    } catch {}
  };

  const fixStyleBg = (el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (!bg || bg === "none") return;
    const m = bg.match(/url\(["']?(\/[^"')]+)["']?\)/);
    if (m && m[1]) {
      el.style.backgroundImage = `url(${MEDIA}${m[1]})`;
    }
  };

  const scan = (root = document) => {
    root.querySelectorAll("img[src^='/']").forEach(fixImg);
    root.querySelectorAll("[style*='background']").forEach(fixStyleBg);
  };

  const mo = new MutationObserver((mut) => {
    mut.forEach(({ addedNodes }) => {
      addedNodes.forEach((n) => {
        if (!(n instanceof Element)) return;
        if (n.tagName === "IMG") fixImg(n);
        scan(n);
      });
    });
  });

  window.addEventListener("DOMContentLoaded", () => {
    scan();
    mo.observe(document.documentElement, { childList: true, subtree: true });
    console.info("[devFixMedia] rewrite activo ->", MEDIA);
  });
})();

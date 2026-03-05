/* ==========================================================
   REALISATIONS — Preview vidéo "safe perf"
   ----------------------------------------------------------
   - Affiche le poster (image) par défaut => rapide
   - Charge la vidéo seulement au survol (desktop)
   - Stop + reset quand on quitte
   - Mobile : charge au touch (sans autoplay)
   ========================================================== */

document.querySelectorAll(".r-preview").forEach((video) => {
  let loaded = false;

  const loadSources = () => {
    if (loaded) return;
    loaded = true;

    const webm = video.dataset.webm;
    const mp4 = video.dataset.mp4;

    if (webm) {
      const s1 = document.createElement("source");
      s1.src = webm;
      s1.type = "video/webm";
      video.appendChild(s1);
    }
    if (mp4) {
      const s2 = document.createElement("source");
      s2.src = mp4;
      s2.type = "video/mp4";
      video.appendChild(s2);
    }

    video.load();
  };

  // Desktop : hover SUR LA VIDEO uniquement
  video.addEventListener("mouseenter", async () => {
    loadSources();
    try { await video.play(); } catch (e) {}
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });

  // Mobile : on charge au touch, sans forcer le play
  video.addEventListener("touchstart", () => {
    loadSources();
  }, { passive: true });
});
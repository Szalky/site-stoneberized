/* Stoneberized — language switch, menu, concerts list */
(function(){
  let lang = "en";
  try { lang = localStorage.getItem("lang") || ((navigator.language||"").toLowerCase().startsWith("fr") ? "fr" : "en"); } catch(e) {}
  if (!T[lang]) lang = "en";

  function renderShows(){
    const today = new Date(); today.setHours(0,0,0,0);
    const loc = lang === "fr" ? "fr-BE" : "en-GB";
    const fmt = d => d.toLocaleDateString(loc,{day:"2-digit",month:"short"}).replace(".","").toUpperCase();
    const tr = v => (v && typeof v === "object") ? (v[lang] || v.en || "") : (v || "");
    const row = s => {
      const d = new Date(s.date+"T00:00:00");
      const note = tr(s.note);
      const sub = [tr(s.city), note].filter(Boolean).join(" · ");
      return `<div class="show">
        <div class="date">${fmt(d)}<small>${d.getFullYear()}</small></div>
        <div><div class="venue">${tr(s.venue)}</div>${sub?`<div class="city">${sub}</div>`:""}</div>
        ${s.link?`<a class="tag" href="${s.link}" target="_blank" rel="noopener">${T[lang].info}</a>`:"<span></span>"}
      </div>`;
    };
    const up = SHOWS.filter(s=>new Date(s.date+"T00:00:00")>=today).sort((a,b)=>a.date.localeCompare(b.date));
    const past = SHOWS.filter(s=>new Date(s.date+"T00:00:00")<today).sort((a,b)=>b.date.localeCompare(a.date));
    if (!document.getElementById("upcoming")) return;
    document.getElementById("upcoming").innerHTML = up.length ? up.map(row).join("") : `<p class="empty">${T[lang].no_shows}</p>`;
    document.getElementById("past").innerHTML = past.map(row).join("");
    document.getElementById("past-wrap").hidden = !past.length;
  }

  function renderGallery(){
    const g = document.getElementById("gallery");
    if (!g || typeof GALLERY === "undefined") return;
    g.innerHTML = GALLERY.map((p,i) => `<figure class="slide">
      <img src="img/gallery/${p.file}" alt="Stoneberized live ${i+1}" data-i="${i}" draggable="false">
      ${p.by ? `<figcaption><span data-i18n="photo_by">${T[lang].photo_by}</span> ${p.by}</figcaption>` : ""}
    </figure>`).join("");
    let cur = 0;
    const slides = () => [...g.querySelectorAll(".slide")];
    // place each photo: centre, previous on the left, next on the right, the others hidden — endless loop
    function layout(){
      const list = slides(), n = list.length;
      if (!n) { document.getElementById("photos").hidden = true; return; }
      cur = (cur % n + n) % n;
      const gap = Math.min(g.clientWidth * 0.4, 540);
      list.forEach((s, i) => {
        let d = i - cur;
        if (d > n/2) d -= n;
        if (d < -n/2) d += n;
        if (n === 2 && d === -1) d = 1;
        const a = Math.abs(d);
        s.dataset.pos = d === 0 ? "center" : a === 1 ? "side" : "hidden";
        const x = Math.max(-2, Math.min(2, d)) * gap;
        s.style.transform = `translate(calc(-50% + ${x}px), -50%) scale(${d === 0 ? 1 : 0.74})`;
        s.style.zIndex = 10 - Math.min(a, 9);
      });
    }
    const go = k => { cur += k; layout(); };
    g.querySelectorAll("img").forEach(img => img.addEventListener("error", () => { img.closest(".slide").remove(); layout(); }));
    g.addEventListener("click", e => {
      const s = e.target.closest(".slide"); if (!s) return;
      const list = slides(), i = list.indexOf(s), n = list.length;
      let d = i - cur; if (d > n/2) d -= n; if (d < -n/2) d += n;
      if (d === 0) openLb(i); else go(d > 0 ? 1 : -1);
    });
    document.querySelector(".gal-btn.prev").addEventListener("click", () => go(-1));
    document.querySelector(".gal-btn.next").addEventListener("click", () => go(1));
    // swipe on phones
    let sx = null;
    g.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, {passive:true});
    g.addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); });
    addEventListener("resize", layout);
    layout();
    // lightbox (full screen)
    const lb = document.getElementById("lightbox"), lbImg = lb.querySelector("img");
    const imgs = () => [...g.querySelectorAll("img")];
    function openLb(i){ const list = imgs(); cur = (i + list.length) % list.length; lbImg.src = list[cur].src; lb.hidden = false; layout(); }
    lb.querySelector(".lb-close").addEventListener("click", () => lb.hidden = true);
    lb.querySelector(".lb-prev").addEventListener("click", e => { e.stopPropagation(); openLb(cur-1); });
    lb.querySelector(".lb-next").addEventListener("click", e => { e.stopPropagation(); openLb(cur+1); });
    lb.addEventListener("click", e => { if (e.target === lb) lb.hidden = true; });
    addEventListener("keydown", e => {
      if (!lb.hidden) { if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowLeft") openLb(cur-1); if (e.key === "ArrowRight") openLb(cur+1); return; }
      const r = g.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0 && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }
    });
  }
  renderGallery();

  function apply(l){
    lang = l;
    document.documentElement.lang = l;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const v = T[l][el.dataset.i18n]; if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === l));
    renderShows();
    try { localStorage.setItem("lang", l); } catch(e) {}
  }

  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => apply(b.dataset.lang)));
  apply(lang);

  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  burger.addEventListener("click", () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  document.querySelectorAll(".menu a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));
  addEventListener("scroll",()=>nav.classList.toggle("solid",scrollY>40),{passive:true});
})();

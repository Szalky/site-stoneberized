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
      <img src="img/gallery/${p.file}" alt="Stoneberized live ${i+1}" loading="lazy" data-i="${i}">
      ${p.by ? `<figcaption><span data-i18n="photo_by">${T[lang].photo_by}</span> ${p.by}</figcaption>` : ""}
    </figure>`).join("");
    g.querySelectorAll("img").forEach(img => img.addEventListener("error", () => {
      img.closest(".slide").remove();
      if (!g.querySelector(".slide")) document.getElementById("photos").hidden = true;
    }));
    const step = () => Math.max(260, g.clientWidth * 0.8);
    document.querySelector(".gal-btn.prev").addEventListener("click", () => g.scrollBy({left: -step(), behavior: "smooth"}));
    document.querySelector(".gal-btn.next").addEventListener("click", () => g.scrollBy({left: step(), behavior: "smooth"}));
    // lightbox
    const lb = document.getElementById("lightbox"), lbImg = lb.querySelector("img");
    let cur = 0;
    const imgs = () => [...g.querySelectorAll("img")];
    const show = i => { const list = imgs(); cur = (i + list.length) % list.length; lbImg.src = list[cur].src; lb.hidden = false; };
    g.addEventListener("click", e => { const im = e.target.closest("img"); if (im) show(imgs().indexOf(im)); });
    lb.querySelector(".lb-close").addEventListener("click", () => lb.hidden = true);
    lb.querySelector(".lb-prev").addEventListener("click", e => { e.stopPropagation(); show(cur-1); });
    lb.querySelector(".lb-next").addEventListener("click", e => { e.stopPropagation(); show(cur+1); });
    lb.addEventListener("click", e => { if (e.target === lb) lb.hidden = true; });
    addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowLeft") show(cur-1); if (e.key === "ArrowRight") show(cur+1); });
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

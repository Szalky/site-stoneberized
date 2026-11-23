/* Stoneberized — language switch, menu, concerts list */
(function(){
  let lang = "en";
  try { lang = localStorage.getItem("lang") || ((navigator.language||"").toLowerCase().startsWith("fr") ? "fr" : "en"); } catch(e) {}
  if (!T[lang]) lang = "en";

  function renderShows(){
    const today = new Date(); today.setHours(0,0,0,0);
    const loc = lang === "fr" ? "fr-BE" : "en-GB";
    const fmt = d => d.toLocaleDateString(loc,{day:"2-digit",month:"short"}).replace(".","").toUpperCase();
    const row = s => {
      const d = new Date(s.date+"T00:00:00");
      const note = s.note ? (s.note[lang] || s.note.en) : "";
      const sub = [s.city, note].filter(Boolean).join(" · ");
      return `<div class="show">
        <div class="date">${fmt(d)}<small>${d.getFullYear()}</small></div>
        <div><div class="venue">${s.venue}</div>${sub?`<div class="city">${sub}</div>`:""}</div>
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

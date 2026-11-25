/* Helen's Orbit — app (router, views, orbit, starfield, lightbox).
   Content lives in js/content.js — you shouldn't need to edit this file. */
(function () {
  const S = window.SITE;
  const main = document.getElementById("main");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let cleanup = [];

  /* ------------------------------------------------ icons */
  const I = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    in: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4V9.75Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    game: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 8h12a4 4 0 0 1 4 4v1a4 4 0 0 1-7 2.65L14.5 15h-5l-.5.65A4 4 0 0 1 2 13v-1a4 4 0 0 1 4-4Z"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="16" cy="11.5" r=".6" fill="currentColor"/><circle cx="17.5" cy="13.5" r=".6" fill="currentColor"/></svg>',
    dl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 19h14"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"/></svg>'
  };

  /* ------------------------------------------------ shared bits */
  const footer = () => `
    <footer class="foot">
      <p>© ${new Date().getFullYear()} ${esc(S.name)} · designed among the stars</p>
      <nav aria-label="Contact">
        <a href="mailto:${esc(S.email)}">Email</a>
        <a href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
        <a href="${esc(S.itch)}" target="_blank" rel="noopener">itch.io</a>
        <a href="${esc(S.resumePdf)}" target="_blank" rel="noopener">Resume</a>
      </nav>
    </footer>`;

  function gallery(items, cols, extraClass = "") {
    return `<div class="gallery ${extraClass}" style="--cols:${cols || 3}">${items.map(it => `
      <figure class="g-item reveal ${it.tone || ""} ${it.wide ? "wide" : ""}" data-lb="${esc(it.src)}" data-cap="${esc(it.caption || "")}" data-tone="${esc(it.tone || "")}" tabindex="0" role="button" aria-label="View ${esc(it.alt || "image")} larger">
        <img src="${esc(it.src)}" alt="${esc(it.alt || "")}" loading="lazy" decoding="async">
        ${it.caption ? `<figcaption>${esc(it.caption)}</figcaption>` : ""}
      </figure>`).join("")}</div>`;
  }

  function sections(list) {
    return (list || []).map((sec, i) => {
      const head = sec.title ? `<h2 class="h3 reveal">${esc(sec.title)}</h2>` : "";
      if (sec.type === "text") return `<section class="section"><div class="text-block reveal">${sec.title ? `<h2 class="h2">${esc(sec.title)}</h2>` : ""}<p>${esc(sec.body)}</p></div></section>`;
      if (sec.type === "flipbook") return `<section class="section">${head}<div class="flipbook reveal" data-fb="${i}"></div></section>`;
      if (sec.type === "gallery") return `<section class="section">${head}${sec.intro ? `<p class="sec-intro reveal">${esc(sec.intro)}</p>` : ""}${gallery(sec.items || [], sec.columns)}</section>`;
      if (sec.type === "newsletters") return `<section class="section">${head}${sec.intro ? `<p class="sec-intro reveal">${esc(sec.intro)}</p>` : ""}
        <div class="mail-row">${(sec.items || []).map(it => `
          <figure class="mail reveal">
            <div class="mail-bar"><i></i><i></i><i></i><span>${esc(it.subject || it.alt || "")}</span></div>
            <div class="mail-scroll" tabindex="0" aria-label="Scroll ${esc(it.alt || "newsletter")}">
              <img src="${esc(it.src)}" alt="${esc(it.alt || "")}" loading="lazy" data-lb="${esc(it.src)}" data-cap="${esc(it.caption || it.subject || "")}" data-tall="1">
            </div>
            ${it.caption ? `<figcaption>${esc(it.caption)}</figcaption>` : ""}
          </figure>`).join("")}</div>
        <p class="fb-tip">Scroll inside each email · click to open full size</p></section>`;
      if (sec.type === "carousels") return `<section class="section">${head}${sec.intro ? `<p class="sec-intro reveal">${esc(sec.intro)}</p>` : ""}
        <div class="carousel-row">${(sec.items || []).map(c => `
          <figure class="carousel reveal">
            <div class="car-track">${c.slides.map((s, k) => `<img src="${esc(s)}" alt="${esc(c.title)} — slide ${k + 1}" loading="lazy" data-lb="${esc(s)}" data-cap="${esc(c.title)} · ${k + 1}/${c.slides.length}">`).join("")}</div>
            <button class="car-btn prev" aria-label="Previous slide">‹</button><button class="car-btn next" aria-label="Next slide">›</button>
            <div class="car-dots">${c.slides.map((_, k) => `<i class="${k ? "" : "on"}"></i>`).join("")}</div>
            <figcaption><strong>${esc(c.title)}</strong>${c.caption ? ` — ${esc(c.caption)}` : ""}</figcaption>
          </figure>`).join("")}</div></section>`;
      return "";
    }).join("");
  }

  /* ------------------------------------------------ views */
  const views = {
    home() {
      return {
        world: "home",
        html: `
        <section class="home view">
          <div class="orbit-stage" id="orbit">
            <svg class="orbit-svg" aria-hidden="true"></svg>
            <div class="core">
              <div class="core-orb"><canvas class="core-canvas"></canvas><div class="core-light"></div></div>
              <h1 class="core-title">Helen's<br>Orbit</h1>
            </div>
            <svg class="orbit-front" aria-hidden="true"></svg>
            <a class="planet p-art" href="#/art" data-warp="#a7d9d0"><span class="planet-body"></span><span class="planet-label">Art</span></a>
            <a class="planet p-games" href="#/games" data-warp="#cfe0ff"><span class="planet-body"></span><span class="planet-label">Games</span></a>
            <a class="planet p-graphics" href="#/graphics" data-warp="#ffe2a0"><span class="planet-body"></span><span class="planet-label">Graphics</span></a>
            <a class="planet p-me" href="#/me" data-warp="#efe6ff"><span class="planet-body"></span><span class="planet-label">Me</span></a>
          </div>
          <div class="home-foot">
            <div class="home-intro">
              <div class="roles">${S.roles.map(esc).join(" · ")}</div>
              <p>${esc(S.tagline)}</p>
            </div>
            <div class="home-hint"><i></i>Choose a planet to explore</div>
          </div>
        </section>`,
        mount: mountOrbit
      };
    },

    me() {
      const R = S.resume;
      const entry = e => `
        <article class="entry">
          <div class="entry-top">
            <h4 class="entry-role">${e.link ? `<a href="${esc(e.link)}">${esc(e.role)}<span class="arrow">↗</span></a>` : esc(e.role)}</h4>
            ${e.dates ? `<span class="entry-date">${esc(e.dates)}</span>` : ""}
          </div>
          ${e.org ? `<p class="entry-org">${esc(e.org)}</p>` : ""}
          <ul>${e.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
        </article>`;
      const routes = ["#/graphics", "#/games", "#/art"];
      return {
        world: "me",
        html: `
        <div class="view page">
          <div class="wrap">
            <section class="me-hero">
              <div>
                <p class="me-hello reveal">${esc(S.about.hello)}</p>
                <ul class="me-roles">${S.roles.map((r, i) => `<li class="reveal" style="--d:${.12 * (i + 1)}s"><a href="${routes[i]}">${esc(r)}</a></li>`).join("")}</ul>
                <div class="btn-row reveal" style="--d:.5s">
                  <a class="btn solid" href="${esc(S.resumePdf)}" target="_blank" rel="noopener">${I.dl} Download resume</a>
                  <a class="btn" href="mailto:${esc(S.email)}">${I.mail} Say hello</a>
                </div>
              </div>
              <div class="me-figure reveal" style="--d:.2s">
                <img class="avatar" src="assets/img/me-avatar.webp" alt="Line-art self portrait of Helen">
                <svg class="cloud" viewBox="0 0 400 170" aria-hidden="true">
                  <defs>
                    <linearGradient id="cloudFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stop-color="#ffd9c7"/><stop offset=".3" stop-color="#ffb8dc"/>
                      <stop offset=".6" stop-color="#c9b6ff"/><stop offset="1" stop-color="#9fd8ff"/>
                    </linearGradient>
                    <radialGradient id="cloudGlow" cx=".45" cy=".35" r=".6">
                      <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
                    </radialGradient>
                    <filter id="cloudSoft" x="-20%" y="-40%" width="140%" height="180%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="13" result="soft"/>
                      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="n"/>
                      <feColorMatrix in="n" type="saturate" values="0" result="g"/>
                      <feComponentTransfer in="g" result="g2"><feFuncA type="linear" slope=".22"/></feComponentTransfer>
                      <feComposite in="g2" in2="soft" operator="in" result="grain"/>
                      <feMerge><feMergeNode in="soft"/><feMergeNode in="grain"/></feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#cloudSoft)">
                    <g fill="url(#cloudFill)">
                      <ellipse cx="200" cy="112" rx="168" ry="34"/>
                      <circle cx="118" cy="96" r="44"/><circle cx="182" cy="74" r="58"/>
                      <circle cx="252" cy="84" r="50"/><circle cx="306" cy="104" r="34"/><circle cx="76" cy="112" r="28"/>
                    </g>
                    <ellipse cx="190" cy="78" rx="96" ry="40" fill="url(#cloudGlow)"/>
                  </g>
                </svg>
              </div>
            </section>

            <section class="statement">
              <span class="eyebrow reveal">Why I design</span>
              ${S.about.statement.map((p, i) => `<p class="reveal" style="--d:${i * .1}s">${esc(p)}</p>`).join("")}
            </section>

            <section class="resume" id="resume">
              <div class="resume-head reveal">
                <div><span class="eyebrow">Resume${R.headline ? " · " + esc(R.headline) : ""}</span><h2 class="h2">Experience &amp; education</h2></div>
                <a class="btn" href="${esc(S.resumePdf)}" target="_blank" rel="noopener">${I.dl} PDF</a>
              </div>
              <div class="resume-grid">
                <div>
                  <div class="card glass reveal"><h3 class="h3">Experience</h3>${R.experience.map(entry).join("")}</div>
                  ${R.projects && R.projects.length ? `<div class="card glass reveal"><h3 class="h3">Projects</h3>${R.projects.map(entry).join("")}</div>` : ""}
                </div>
                <div>
                  <div class="card glass reveal"><h3 class="h3">Education</h3>${R.education.map(e => `
                    <article class="entry">
                      <div class="entry-top"><h4 class="entry-role">${esc(e.degree)}</h4><span class="entry-date">${esc(e.dates)}</span></div>
                      <p class="entry-org">${esc(e.school)}</p>${e.note ? `<ul><li>${esc(e.note)}</li></ul>` : ""}
                    </article>`).join("")}</div>
                  <div class="card glass reveal"><h3 class="h3">Skills</h3>${R.skills.map(g => `
                    <div class="skill-group"><p class="skill-label">${esc(g.label)}</p><ul class="chips">${g.items.map(s => `<li>${esc(s)}</li>`).join("")}</ul></div>`).join("")}</div>
                  <div class="card glass reveal"><h3 class="h3">Contact</h3>
                    <ul class="contact-list">
                      <li><a href="mailto:${esc(S.email)}">${I.mail}${esc(S.email)}</a></li>
                      <li><a href="${esc(S.linkedin)}" target="_blank" rel="noopener">${I.in}LinkedIn</a></li>
                      <li><a href="${esc(S.itch)}" target="_blank" rel="noopener">${I.game}itch.io</a></li>
                      <li><span>${I.pin}${esc(S.location)}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <div class="join reveal"><a href="#/"><img src="assets/img/me-hand-star.webp" alt=""><span>Join me in orbit</span></a></div>
          </div>
          ${footer()}
        </div>`
      };
    },

    games() {
      return {
        world: "games",
        html: `
        <div class="view page">
          <div class="wrap">
            <header class="world-head"><h1 class="display reveal">Games</h1>
              <p class="lede reveal">Printed puzzle books, mobile claw machines and flashlight-lit caves — art direction, illustration and character work for games made with brilliant teams.</p></header>
            <div class="game-row">
              ${S.games.map((g, i) => `
              <a class="game-card reveal" style="--d:${i * .12}s" href="#/games/${esc(g.slug)}">
                <div class="game-art"><img src="${esc(g.cover)}" alt="${esc(g.title)} cover art"></div>
                <div class="game-info"><h3>${esc(g.title)}</h3><div class="k">${esc(g.kicker)}</div><p>${esc(g.summary.split(/(?<=[.?!])\s/)[0])}</p><span class="more">View project</span></div>
              </a>`).join("")}
            </div>
          </div>
          ${footer()}
        </div>`
      };
    },

    graphics() {
      const order = ["alphabet-garden", "social-media", "lune-noire", "fabrx-studio", "emotions"];
      const list = order.map(s => S.graphics.find(g => g.slug === s)).filter(Boolean)
        .concat(S.graphics.filter(g => !order.includes(g.slug)));
      return {
        world: "graphics",
        mount: mountMoons,
        html: `
        <div class="view page">
          <div class="wrap">
            <header class="world-head"><h1 class="display reveal">Graphics</h1>
              <p class="lede reveal">Books, brands, campaigns and type experiments — each one a small world held up to the light.</p></header>
            <div class="sun-system reveal" aria-label="Graphics projects">
              <div class="gold-planet" aria-hidden="true">
                <div class="gp-halo"></div>
                <i class="gp-spark s1"></i><i class="gp-spark s2"></i><i class="gp-spark s3"></i><i class="gp-spark s4"></i>
                <div class="gp-tilt">
                  <div class="gp-orbit o1"><span class="gp-moon"></span></div>
                  <div class="gp-orbit o2"><span class="gp-moon"></span></div>
                  <div class="gp-sphere"><div class="gp-surface"></div><div class="gp-light"></div></div>
                </div>
              </div>
              ${list.slice(0, 5).map((g, i) => `
                <a class="moon" href="#/graphics/${esc(g.slug)}">
                  <span class="moon-body">${g.cover ? `<img src="${esc(g.cover)}" alt="">` : ""}</span>
                  <span class="moon-label">${esc(g.planet || g.title)}</span>
                </a>`).join("")}
            </div>
            <div class="proj-grid">
              ${list.map((g, i) => `
              <a class="proj-card glass reveal" style="--d:${(i % 3) * .1}s" href="#/graphics/${esc(g.slug)}">
                <div class="proj-thumb ${g.cover ? "" : "logo-only"}"><img src="${esc(g.cover || g.logo)}" alt="" loading="lazy"></div>
                <div class="proj-body"><div class="k">${esc(g.planet || g.kicker)}</div><h3>${esc(g.title)}</h3></div>
              </a>`).join("")}
            </div>
          </div>
          ${footer()}
        </div>`
      };
    },

    art() {
      const A = S.art;
      return {
        world: "art",
        html: `
        <div class="view page">
          <div class="wrap">
            <header class="world-head"><h1 class="display reveal">${esc(A.title)}</h1>
              <p class="lede reveal">${esc(A.summary)}</p></header>
            ${(A.sections || []).map(sec => sec.type === "gallery" ? gallery(sec.items, 2, "art-gallery") : sections([sec])).join("")}
          </div>
          ${footer()}
        </div>`
      };
    },

    project(collection, slug) {
      const list = collection === "games" ? S.games : S.graphics;
      const idx = list.findIndex(p => p.slug === slug);
      const p = list[idx];
      if (!p) return null;
      const prev = list[(idx - 1 + list.length) % list.length], next = list[(idx + 1) % list.length];
      const label = collection === "games" ? "Games" : "Graphics";
      const empty = !(p.sections && p.sections.length);
      return {
        world: collection,
        data: p,
        html: `
        <div class="view page">
          <div class="wrap">
            <a class="back" href="#/${collection}">${label}</a>
            <header class="proj-head">
              <div>
                <div class="proj-kicker reveal">${esc(p.kicker || "")}</div>
                <h1 class="proj-title reveal">${p.logo ? `<img class="proj-logo ${p.logoTone || ""}" src="${esc(p.logo)}" alt="${esc(p.title)}">` : esc(p.title)}</h1>
              </div>
              <div class="reveal" style="--d:.15s">
                <p class="proj-summary">${esc(p.summary || (empty ? "A new body of work — currently in progress." : ""))}</p>
                ${p.meta && p.meta.length ? `<dl class="meta">${p.meta.map(m => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join("")}</dl>` : ""}
                ${p.links && p.links.length ? `<div class="btn-row">${p.links.map(l => `<a class="btn solid" href="${esc(l.url)}" target="_blank" rel="noopener">${I.ext} ${esc(l.label)}</a>`).join("")}</div>` : ""}
              </div>
            </header>
            ${empty ? `<div class="soon glass reveal"><div class="orb-sm"></div><p>New work is entering orbit soon.</p></div>` : sections(p.sections)}
            <nav class="next-proj" aria-label="More projects">
              <a href="#/${collection}/${esc(prev.slug)}"><span>← Previous</span><strong>${esc(prev.title)}</strong></a>
              <a href="#/${collection}/${esc(next.slug)}"><span>Next →</span><strong>${esc(next.title)}</strong></a>
            </nav>
          </div>
          ${footer()}
        </div>`,
        mount: () => {
          main.querySelectorAll("[data-fb]").forEach(el => {
            const sec = p.sections[+el.dataset.fb];
            const fb = Flipbook.mount(el, { pages: sec.pages, ratio: sec.ratio, title: sec.title || p.title });
            if (fb) cleanup.push(fb.destroy);
          });
          main.querySelectorAll(".carousel").forEach(c => {
            const track = c.querySelector(".car-track"), dots = [...c.querySelectorAll(".car-dots i")];
            const go = d => track.scrollBy({ left: d * track.clientWidth, behavior: "smooth" });
            c.querySelector(".prev").onclick = () => go(-1);
            c.querySelector(".next").onclick = () => go(1);
            track.addEventListener("scroll", () => {
              const k = Math.round(track.scrollLeft / track.clientWidth);
              dots.forEach((d, i) => d.classList.toggle("on", i === k));
              c.classList.toggle("at-start", k === 0);
              c.classList.toggle("at-end", k === dots.length - 1);
            }, { passive: true });
            c.classList.add("at-start");
          });
        }
      };
    }
  };

  /* ------------------------------------------------ router */
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    let v;
    if (!parts.length) v = views.home();
    else if (parts[0] === "me") v = views.me();
    else if (parts[0] === "art") v = views.art();
    else if ((parts[0] === "games" || parts[0] === "graphics") && parts[1]) v = views.project(parts[0], parts[1]);
    else if (parts[0] === "games") v = views.games();
    else if (parts[0] === "graphics") v = views.graphics();
    if (!v) v = views.home();
    return v;
  }

  let first = true, navId = 0;
  const runCleanup = () => { const fns = cleanup; cleanup = []; fns.forEach(fn => { try { fn && fn(); } catch (e) {} }); };
  // debounced resize helper: runs fn at most once per animation frame burst, and is removed on navigation
  function onResize(fn) {
    let t = 0;
    const h = () => { clearTimeout(t); t = setTimeout(fn, 120); };
    window.addEventListener("resize", h);
    cleanup.push(() => { clearTimeout(t); window.removeEventListener("resize", h); });
  }
  function render() {
    const id = ++navId;
    runCleanup();
    const v = route();
    const swap = () => {
      if (id !== navId) return;           // a newer navigation happened while this one was fading out
      runCleanup();
      document.body.dataset.world = v.world;
      main.innerHTML = v.html;
      window.scrollTo(0, 0);
      document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", location.hash.startsWith("#/" + a.dataset.nav)));
      const titleBits = { home: "", me: "Me", games: "Games", graphics: "Graphics", art: "Art" };
      document.title = (v.data ? v.data.title + " — " : titleBits[v.world] ? titleBits[v.world] + " — " : "") + "Helen's Orbit";
      v.mount && v.mount();
      observeReveals();
      if (!first) main.focus({ preventScroll: true });
      first = false;
    };
    const old = main.firstElementChild;
    if (old && !reduce && !first) {
      old.classList.add("leaving");
      setTimeout(swap, 280);
    } else swap();
    document.body.classList.remove("menu-open");
    document.querySelector(".menu-btn").setAttribute("aria-expanded", "false");
  }
  window.addEventListener("hashchange", render);

  /* ------------------------------------------------ reveal on scroll */
  let io;
  function observeReveals() {
    io && io.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: .05 });
    main.querySelectorAll(".reveal").forEach(el => io.observe(el));
  }

  /* ------------------------------------------------ orbit */
  function mountOrbit() {
    const stage = document.getElementById("orbit");
    const svg = stage.querySelector(".orbit-svg");
    const front = stage.querySelector(".orbit-front");
    const core = stage.querySelector(".core");
    const P = {
      me: { el: stage.querySelector(".p-me"), ring: 0, a: 2.75, speed: .055 },
      games: { el: stage.querySelector(".p-games"), ring: 0, a: -.42, speed: .055 },
      art: { el: stage.querySelector(".p-art"), ring: 1, a: 3.75, speed: .035 },
      graphics: { el: stage.querySelector(".p-graphics"), ring: 1, a: .62, speed: .035 }
    };
    let W, H, cx, cy, rings, coreR, narrow;
    function measure() {
      W = stage.clientWidth; H = stage.clientHeight; cx = W / 2; cy = H / 2;
      coreR = core.offsetWidth / 2;
      narrow = W < 640;
      const base = Math.min(W, H * 1.55);
      rings = narrow
        ? [{ rx: W * .46, ry: coreR * .5, tilt: -10 }, { rx: W * .44, ry: H * .40, tilt: 10 }]
        : [{ rx: base * .40, ry: Math.min(base * .15, coreR * .58), tilt: -14 }, { rx: base * .47, ry: base * .29, tilt: 9 }];
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.innerHTML = `
        <circle cx="${cx}" cy="${cy}" r="${coreR * 1.18}" class="faint"/>
        <circle cx="${cx}" cy="${cy}" r="${coreR * 1.32}"/>
        ${rings.map((r, i) => `<ellipse cx="${cx}" cy="${cy}" rx="${r.rx}" ry="${r.ry}" transform="rotate(${r.tilt} ${cx} ${cy})" ${i ? 'class="faint"' : ""}/>`).join("")}`;
      // the near half of the inner ring is redrawn above the core, so the ring wraps around the planet
      const r0 = rings[0], t0 = r0.tilt * Math.PI / 180;
      const sx = cx + r0.rx * Math.cos(t0), sy = cy + r0.rx * Math.sin(t0);
      const ex = cx - r0.rx * Math.cos(t0), ey = cy - r0.rx * Math.sin(t0);
      front.setAttribute("viewBox", `0 0 ${W} ${H}`);
      front.innerHTML = `<path d="M ${sx} ${sy} A ${r0.rx} ${r0.ry} ${r0.tilt} 0 1 ${ex} ${ey}"/>`;
      Object.values(P).forEach(p => {
        p.el.classList.toggle("label-top", narrow);
        p.el.classList.remove("label-left"); p.left = false;
        p.bw = p.el.firstElementChild.offsetWidth; p.w = p.el.offsetWidth; p.h = p.el.offsetHeight;
      });
    }
    let paused = false, last = performance.now(), raf;
    function place(dt) {
      Object.values(P).forEach(p => {
        if (!paused && !reduce) p.a += p.speed * dt;
        const r = rings[p.ring], t = r.tilt * Math.PI / 180;
        const x0 = r.rx * Math.cos(p.a), y0 = r.ry * Math.sin(p.a);
        const x = cx + x0 * Math.cos(t) - y0 * Math.sin(t);
        const y = cy + x0 * Math.sin(t) + y0 * Math.cos(t);
        const behind = Math.sin(p.a) < 0;
        const depth = .86 + .14 * (Math.sin(p.a) + 1) / 2;
        const el = p.el, bw = p.bw;
        // anchor on the planet body's center (sizes cached in measure())
        let ox = bw / 2, oy = bw / 2;
        if (narrow) { ox = p.w / 2; oy = p.h - bw / 2; }
        else {
          const labelW = p.w - bw / 2;
          let left = x < cx;
          if (!left && x + labelW > W - 10) left = true;
          if (left && x - labelW < 10) left = false;
          if (left !== p.left) { el.classList.toggle("label-left", left); p.left = left; }
          if (left) ox = p.w - bw / 2;
        }
        el.style.transform = `translate3d(${(x - ox).toFixed(1)}px, ${(y - oy).toFixed(1)}px, 0) scale(${depth.toFixed(3)})`;
        if (behind !== p.behind) { el.classList.toggle("behind", behind); p.behind = behind; }
      });
    }
    function tick(now) { const dt = Math.min(.05, (now - last) / 1000); last = now; place(dt); raf = requestAnimationFrame(tick); }
    measure(); place(0);
    raf = requestAnimationFrame(tick);
    const planet = renderPlanet(stage.querySelector(".core-canvas"));
    cleanup.push(planet.stop);
    onResize(() => { measure(); place(0); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (stage.isConnected) { measure(); place(0); } });
    Object.values(P).forEach(p => {
      p.el.addEventListener("mouseenter", () => paused = true);
      p.el.addEventListener("mouseleave", () => paused = false);
      p.el.addEventListener("focus", () => paused = true);
      p.el.addEventListener("blur", () => paused = false);
      p.el.addEventListener("click", e => warp(e, p.el));
    });
    cleanup.push(() => cancelAnimationFrame(raf));
  }

  /* Graphics: project moons orbit the golden planet on a tilted ellipse.
     Same base size for every moon; depth scaling makes the near side larger, far side smaller. */
  function mountMoons() {
    const sys = main.querySelector(".sun-system");
    const planet = sys && sys.querySelector(".gold-planet");
    if (!planet) return;
    const moons = [...sys.querySelectorAll(".moon")];
    const n = moons.length;
    const state = moons.map((el, i) => ({ el, a: -Math.PI / 2 + (i - (n - 1) / 2) * (2 * Math.PI / n) }));
    let cx, cy, rx, ry, tilt = -8 * Math.PI / 180, paused = false, last = performance.now(), raf;
    function measure() {
      const W = sys.clientWidth, H = sys.clientHeight;
      cx = W / 2; cy = planet.offsetTop + planet.offsetHeight / 2;
      rx = Math.min(W * .44, 520);
      ry = Math.max(20, Math.min(rx * .34, cy - 60, H - cy - 40));
      state.forEach(m => { m.bh = m.el.firstElementChild.offsetHeight; });
    }
    function place(dt) {
      for (const m of state) {
        if (!paused && !reduce) m.a += .045 * dt;
        const x0 = rx * Math.cos(m.a), y0 = ry * Math.sin(m.a);
        const x = cx + x0 * Math.cos(tilt) - y0 * Math.sin(tilt);
        const y = cy + x0 * Math.sin(tilt) + y0 * Math.cos(tilt);
        const depth = (Math.sin(m.a) + 1) / 2;          // 0 = far side, 1 = near side
        const sc = .62 + .5 * depth;
        m.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, ${-m.bh / 2}px) scale(${sc.toFixed(3)})`;
        m.el.style.opacity = (.55 + .45 * depth).toFixed(3);
        const far = depth < .5;
        if (far !== m.far) { m.far = far; m.el.style.zIndex = far ? 1 : 4; m.el.classList.toggle("far", far); }
      }
    }
    function tick(now) { const dt = Math.min(.05, (now - last) / 1000); last = now; place(dt); raf = requestAnimationFrame(tick); }
    measure(); place(0); raf = requestAnimationFrame(tick);
    onResize(() => { measure(); place(0); });
    moons.forEach(el => {
      el.addEventListener("mouseenter", () => paused = true);
      el.addEventListener("mouseleave", () => paused = false);
      el.addEventListener("focus", () => paused = true);
      el.addEventListener("blur", () => paused = false);
    });
    cleanup.push(() => cancelAnimationFrame(raf));
  }

  /* Home planet: an equirectangular pastel world texture mapped onto a lit sphere, drawn per pixel.
     Runs at ~30fps, pauses when off screen or when the tab is hidden, and fully tears down on navigation. */
  function renderPlanet(canvas) {
    let stopped = false, raf = 0, io = null, rt = 0, onR = null, visible = true;
    const stop = () => {
      stopped = true; cancelAnimationFrame(raf); raf = 0; clearTimeout(rt);
      io && io.disconnect(); onR && window.removeEventListener("resize", onR);
    };
    const load = src => new Promise((res, rej) => { const i = new Image(); i.decoding = "async"; i.onload = () => res(i); i.onerror = rej; i.src = src; });
    Promise.all([load("assets/img/planet-surface.webp"), load("assets/img/planet-clouds.webp")]).then(([surf, cloud]) => {
      if (stopped || !canvas.isConnected) return;
      const pix = img => { const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0); return x.getImageData(0, 0, c.width, c.height).data; };
      const TW = surf.width, TH = surf.height, tex = pix(surf), cl = pix(cloud);
      const ctx = canvas.getContext("2d");
      let N = 0, out, map;
      const tilt = -20 * Math.PI / 180, ct = Math.cos(tilt), st = Math.sin(tilt);
      const L = [-.52, -.5, .69]; // light from upper-left, towards viewer
      function build() {
        const want = Math.min(400, Math.round(canvas.clientWidth * Math.min(1.5, devicePixelRatio || 1))) || 300;
        if (want === N) return false;
        N = want; canvas.width = canvas.height = N;
        out = ctx.createImageData(N, N);
        const R = N / 2, max = N * N;
        const idx = new Int32Array(max), u = new Float32Array(max), v = new Int32Array(max),
              shade = new Float32Array(max), fres = new Float32Array(max), edge = new Uint8ClampedArray(max);
        let k = 0;
        for (let py = 0; py < N; py++) for (let px = 0; px < N; px++) {
          const nx = (px + .5 - R) / R, ny = (py + .5 - R) / R, r = Math.hypot(nx, ny);
          if (r > 1 + 1 / R) continue;
          const z = Math.sqrt(Math.max(0, 1 - Math.min(1, r) ** 2));
          const sx = nx * ct + ny * st, sy = -nx * st + ny * ct;
          const lat = Math.asin(Math.max(-1, Math.min(1, sy))), lon = Math.atan2(sx, z);
          idx[k] = (py * N + px) * 4;
          u[k] = (lon / (2 * Math.PI) + .5) * TW;
          v[k] = Math.min(TH - 1, Math.max(0, Math.floor((lat / Math.PI + .5) * TH))) * TW;
          shade[k] = .42 + .72 * Math.max(0, nx * L[0] + ny * L[1] + z * L[2]);
          fres[k] = Math.pow(1 - z, 2.2) * .75;
          edge[k] = Math.max(0, Math.min(1, (1 - r) * R + .5)) * 255;
          k++;
        }
        map = { n: k, idx, u, v, shade, fres, edge };
        return true;
      }
      let off = 0, last = performance.now(), lastDraw = 0;
      function paint() {
        const coff = (off * 1.3) % TW;                  // clouds drift a little faster
        const d = out.data, { n, idx, u, v, shade, fres, edge } = map;
        for (let k = 0; k < n; k++) {
          const row = v[k];
          const t = (row + ((u[k] + off) % TW | 0)) << 2;
          const c = (row + ((u[k] + coff) % TW | 0)) << 2;
          const sh = shade[k], ca = cl[c + 3] * (1 / 255) * (.65 + .35 * sh), f = fres[k];
          let r = tex[t] * sh, g = tex[t + 1] * sh, b = tex[t + 2] * sh;
          const cb = 255 * Math.min(1.15, .55 + .6 * sh);
          r += (cb - r) * ca; g += (cb * .97 - g) * ca; b += (cb - b) * ca;
          r += (255 - r) * f; g += (214 - g) * f; b += (255 - b) * f;   // pink-lavender haze at the limb
          const o = idx[k];
          d[o] = r; d[o + 1] = g; d[o + 2] = b; d[o + 3] = edge[k];
        }
        ctx.putImageData(out, 0, 0);
      }
      function frame(now) {
        raf = 0;
        if (stopped || !visible) return;
        const dt = Math.min(.1, (now - last) / 1000); last = now;
        off = (off + dt * TW / 70) % TW;               // one turn ≈ 70 s
        if (now - lastDraw >= 32) { lastDraw = now; paint(); }   // ~30fps is plenty for a slow spin
        raf = requestAnimationFrame(frame);
      }
      const start = () => { if (!raf && !stopped && visible && !reduce) { last = performance.now(); raf = requestAnimationFrame(frame); } };
      build(); paint();
      canvas.classList.add("ready");
      io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : (cancelAnimationFrame(raf), raf = 0); });
      io.observe(canvas);
      onR = () => { clearTimeout(rt); rt = setTimeout(() => { if (!stopped && build()) paint(); }, 150); };
      window.addEventListener("resize", onR);
      start();
    }).catch(() => {});
    return { stop };
  }

  function warp(e, el) {
    if (reduce) return;
    e.preventDefault();
    const w = document.querySelector(".warp");
    const r = el.firstElementChild.getBoundingClientRect();
    w.style.left = r.left + r.width / 2 + "px";
    w.style.top = r.top + r.height / 2 + "px";
    w.style.setProperty("--warp", el.dataset.warp || "#fff");
    w.classList.remove("go"); void w.offsetWidth; w.classList.add("go");
    setTimeout(() => { location.hash = el.getAttribute("href"); }, 260);
  }

  /* ------------------------------------------------ lightbox */
  const lb = document.querySelector(".lightbox");
  const lbImg = lb.querySelector("img"), lbCap = lb.querySelector("figcaption"), lbFig = lb.querySelector(".lb-figure"), lbCount = lb.querySelector(".lb-count");
  let lbItems = [], lbI = 0, lastFocus;
  function openLb(el) {
    lbItems = [...main.querySelectorAll("[data-lb]")];
    lbI = lbItems.indexOf(el);
    lastFocus = el;
    showLb(); lb.hidden = false; document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function showLb() {
    const el = lbItems[lbI];
    lbImg.src = el.dataset.lb;
    lbImg.alt = (el.tagName === "IMG" ? el : el.querySelector("img")).alt;
    lbCap.textContent = el.dataset.cap || "";
    lbFig.classList.toggle("paper", el.dataset.tone === "paper");
    lbFig.classList.toggle("tall", !!el.dataset.tall);
    lbFig.scrollTop = 0;
    lbCount.textContent = `${lbI + 1} / ${lbItems.length}`;
  }
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
  const stepLb = d => { lbI = (lbI + d + lbItems.length) % lbItems.length; showLb(); };
  main.addEventListener("click", e => { const f = e.target.closest("[data-lb]"); if (f) openLb(f); });
  main.addEventListener("keydown", e => { const f = e.target.closest("[data-lb]"); if (f && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openLb(f); } });
  lb.querySelector(".lb-close").onclick = closeLb;
  lb.querySelector(".lb-prev").onclick = () => stepLb(-1);
  lb.querySelector(".lb-next").onclick = () => stepLb(1);
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") stepLb(1);
    if (e.key === "ArrowLeft") stepLb(-1);
  });
  let lsx = null;
  lb.addEventListener("pointerdown", e => lsx = e.clientX);
  lb.addEventListener("pointerup", e => { if (lsx != null && Math.abs(e.clientX - lsx) > 50) stepLb(e.clientX < lsx ? 1 : -1); lsx = null; });

  /* ------------------------------------------------ chrome */
  const topbar = document.querySelector(".topbar");
  window.addEventListener("scroll", () => topbar.classList.toggle("scrolled", scrollY > 20), { passive: true });
  const menuBtn = document.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open);
  });

  /* ------------------------------------------------ starfield
     Stars are drawn once into three canvas layers; twinkle (opacity) and parallax (transform)
     are CSS/compositor-only, so nothing is redrawn per frame. */
  (function stars() {
    const sky = document.querySelector(".sky");
    const old = document.getElementById("stars");
    const wrap = document.createElement("div");
    wrap.className = "stars";
    const layers = [0, 1, 2].map(i => { const c = document.createElement("canvas"); c.className = "star-layer l" + i; wrap.appendChild(c); return c; });
    old.replaceWith(wrap);
    let w = 0, h = 0;
    function draw() {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const W = window.innerWidth, H = window.innerHeight;
      // mobile browsers resize while scrolling (URL bar); only redraw when the size really changes
      if (Math.abs(W - w) < 2 && H <= h + 120 && h) return;
      w = W; h = Math.max(H, h);
      const pad = 40, cw = w + pad * 2, ch = h + pad * 2;
      const total = Math.round(cw * ch / 2600);
      layers.forEach((c, li) => {
        c.width = cw * dpr; c.height = ch * dpr;
        c.style.width = cw + "px"; c.style.height = ch + "px";
        const x = c.getContext("2d"); x.setTransform(dpr, 0, 0, dpr, 0, 0); x.fillStyle = "#fff";
        const n = Math.round(total / 3);
        for (let i = 0; i < n; i++) {
          const sx = Math.random() * cw, sy = Math.random() * ch, r = Math.random() ** 3 * 1.6 + .25;
          x.globalAlpha = .45 + Math.random() * .55;
          x.beginPath(); x.arc(sx, sy, r, 0, 6.283); x.fill();
          if (r > 1.2) { x.globalAlpha = .18; x.beginPath(); x.arc(sx, sy, r * 3, 0, 6.283); x.fill(); }
        }
      });
    }
    let rt = 0;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(draw, 200); });
    draw();
    if (reduce) return;
    // gentle parallax, batched to one write per frame
    let mx = 0, my = 0, queued = false;
    window.addEventListener("pointermove", e => {
      mx = e.clientX / window.innerWidth - .5; my = e.clientY / window.innerHeight - .5;
      if (queued) return; queued = true;
      requestAnimationFrame(() => {
        queued = false;
        layers.forEach((c, i) => { const z = (i + 1) * 5; c.style.transform = `translate3d(${(mx * z).toFixed(1)}px, ${(my * z).toFixed(1)}px, 0)`; });
      });
    }, { passive: true });
    // occasional shooting star (a single CSS-animated element)
    const shoot = document.createElement("i");
    shoot.className = "shooting-star";
    sky.appendChild(shoot);
    (function next() {
      setTimeout(() => {
        if (!document.hidden) {
          const dir = Math.random() > .5 ? 1 : -1;
          shoot.style.setProperty("--x", (15 + Math.random() * 70) + "vw");
          shoot.style.setProperty("--y", (5 + Math.random() * 30) + "vh");
          shoot.style.setProperty("--dir", dir);
          shoot.classList.remove("go"); void shoot.offsetWidth; shoot.classList.add("go");
        }
        next();
      }, 6000 + Math.random() * 9000);
    })();
  })();

  render();
})();

/* Flipbook — a dependency-free page-turning book.
   Usage: Flipbook.mount(element, { pages: [url, url, ...], ratio: pageWidth/pageHeight, title })
   Page 1 = front cover (alone, on the right). Then spreads 2–3, 4–5, …
   Each spread is two identical, fixed-size page slots; a single leaf animates
   over them while turning, so pages always line up edge to edge.
   Desktop: two-page spreads. Phones: one page at a time. */
(function () {
  const SINGLE_BELOW = 640;
  const DURATION = 900;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resolvePages(spec) {
    if (Array.isArray(spec)) return spec;
    if (spec && spec.folder && spec.count) {
      const pad = spec.pad ?? 2, ext = spec.ext || "jpg", start = spec.start ?? 1;
      return Array.from({ length: spec.count }, (_, i) => `${spec.folder.replace(/\/$/, "")}/${String(i + start).padStart(pad, "0")}.${ext}`);
    }
    return [];
  }

  function mount(root, opts) {
    const pages = resolvePages(opts.pages);
    const ratio = opts.ratio || 0.75;
    const P = pages.length;
    if (!P) { root.innerHTML = '<p class="fb-tip">No pages yet.</p>'; return; }

    root.classList.add("fb");
    root.tabIndex = 0;
    root.setAttribute("role", "region");
    root.setAttribute("aria-label", (opts.title || "Flip book") + " — use arrow keys to turn pages");
    root.innerHTML = `
      <div class="fb-stage"><div class="fb-book"></div></div>
      <div class="fb-controls">
        <button class="fb-btn fb-prev" aria-label="Previous page">‹</button>
        <input class="fb-range" type="range" min="0" value="0" aria-label="Jump to page">
        <button class="fb-btn fb-next" aria-label="Next page">›</button>
        <span class="fb-count" aria-live="polite"></span>
      </div>
      <p class="fb-tip">Click or swipe the pages · ← → keys</p>`;
    const book = root.querySelector(".fb-book");
    const range = root.querySelector(".fb-range");
    const count = root.querySelector(".fb-count");
    const prevBtn = root.querySelector(".fb-prev");
    const nextBtn = root.querySelector(".fb-next");

    const cache = new Set();
    const warm = n => { const src = pages[n - 1]; if (src && !cache.has(src)) { cache.add(src); const i = new Image(); i.src = src; } };
    const setImg = (slot, n) => {
      const src = n >= 1 && n <= P ? pages[n - 1] : null;
      slot.classList.toggle("empty", !src);
      slot.innerHTML = src ? `<img src="${src}" alt="Page ${n}" draggable="false">` : "";
    };

    let mode = null, cur = 0, anim = null, animDone = null;

    function size() {
      const W = root.clientWidth || root.parentElement.clientWidth;
      const maxH = Math.min(window.innerHeight * 0.68, 680);
      const spread = mode === "spread" ? 2 : 1;
      const bw = Math.floor(Math.min(W, maxH * spread * ratio) / 2) * 2; // even px → crisp gutter
      book.style.setProperty("--bw", bw + "px");
      book.style.setProperty("--bh", Math.round(bw / (spread * ratio)) + "px");
    }

    /* ---------- spread mode ---------- */
    let L, R, maxS;
    const leftOf = s => (s > 0 ? 2 * s : 0);
    const rightOf = s => 2 * s + 1;

    function buildSpread(start) {
      mode = "spread"; root.classList.remove("single");
      maxS = Math.floor(P / 2);
      book.innerHTML = `<div class="fb-page left"></div><div class="fb-page right"></div><div class="fb-gutter"></div>`;
      [L, R] = book.querySelectorAll(".fb-page");
      L.addEventListener("click", () => prev());
      R.addEventListener("click", () => next());
      range.max = maxS;
      cur = Math.max(0, Math.min(maxS, start));
      size(); paint(); status();
    }
    function paint() {
      setImg(L, leftOf(cur)); setImg(R, rightOf(cur));
      book.classList.toggle("at-start", cur === 0);
      book.classList.toggle("at-end", cur === maxS && !(rightOf(cur) <= P));
      for (let k = -2; k <= 3; k++) warm(leftOf(cur) + k);
    }
    function status() {
      range.value = cur;
      prevBtn.disabled = cur === 0;
      nextBtn.disabled = cur === maxS;
      const l = leftOf(cur), r = rightOf(cur);
      if (cur === 0) count.textContent = `Cover · ${P} pages`;
      else if (r > P) count.textContent = l === P ? "Back cover" : `${l} / ${P}`;
      else count.textContent = `${l}–${r} / ${P}`;
    }

    // complete an in-flight turn immediately and synchronously (Animation.finish() fires onfinish later,
    // which could overwrite the pages of a newer turn)
    function finish() {
      if (!anim) return;
      const done = animDone;
      anim.onfinish = null; anim.cancel(); anim = null; animDone = null;
      done && done();
    }

    function goSpread(target) {
      target = Math.max(0, Math.min(maxS, target));
      finish();
      if (target === cur) return;
      const from = cur, fwd = target > from;
      cur = target; status();
      if (reduce) { paint(); return; }

      // the leaf that turns: forward = old right page → new left page; back = old left → new right
      const leaf = document.createElement("div");
      leaf.className = "fb-leaf " + (fwd ? "fwd" : "back");
      const front = document.createElement("div"); front.className = "fb-face front";
      const back = document.createElement("div"); back.className = "fb-face back";
      setImg(front, fwd ? rightOf(from) : leftOf(from));
      setImg(back, fwd ? leftOf(target) : rightOf(target));
      leaf.append(front, back);
      book.appendChild(leaf);

      // reveal the page underneath straight away
      if (fwd) setImg(R, rightOf(target)); else setImg(L, leftOf(target));
      // the book recentres when opening from / closing to a cover
      book.classList.toggle("at-start", target === 0);
      book.classList.toggle("at-end", target === maxS && rightOf(target) > P);

      const deg = fwd ? -180 : 180;
      anim = leaf.animate(
        [{ transform: "rotateY(0deg)" }, { transform: `rotateY(${deg / 2}deg)`, offset: .5 }, { transform: `rotateY(${deg}deg)` }],
        { duration: DURATION, easing: "cubic-bezier(.45,.05,.25,1)", fill: "forwards" }
      );
      leaf.querySelectorAll(".fb-face").forEach(f => f.animate(
        [{ "--shade": 0 }, { "--shade": 1, offset: .5 }, { "--shade": 0 }], { duration: DURATION, fill: "forwards" }));
      animDone = () => {
        if (fwd) setImg(L, leftOf(target)); else setImg(R, rightOf(target));
        leaf.remove(); paint();
      };
      anim.onfinish = () => { const done = animDone; anim = null; animDone = null; done && done(); };
    }

    /* ---------- single-page mode ---------- */
    let mono;
    function buildSingle(startPage) {
      mode = "single"; root.classList.add("single");
      book.classList.remove("at-start", "at-end");
      book.innerHTML = `<div class="fb-mono"></div>`;
      mono = book.firstChild;
      range.max = P - 1;
      cur = Math.max(0, Math.min(P - 1, startPage));
      mono.innerHTML = `<div class="pg"><img src="${pages[cur]}" alt="Page ${cur + 1}" draggable="false"></div>`;
      mono.addEventListener("click", e => {
        const r = mono.getBoundingClientRect();
        (e.clientX - r.left < r.width * 0.33) ? prev() : next();
      });
      size(); statusSingle();
    }
    function statusSingle() {
      range.value = cur;
      prevBtn.disabled = cur === 0; nextBtn.disabled = cur === P - 1;
      count.textContent = cur === 0 ? `Cover · ${P} pages` : `${cur + 1} / ${P}`;
      warm(cur + 2); warm(cur + 3);
    }
    function goSingle(target) {
      target = Math.max(0, Math.min(P - 1, target));
      if (target === cur) return;
      const forward = target > cur;
      const old = mono.querySelector(".pg:last-child");
      const pg = document.createElement("div");
      pg.className = "pg";
      pg.innerHTML = `<img src="${pages[target]}" alt="Page ${target + 1}" draggable="false">`;
      mono.insertBefore(pg, old);
      if (reduce) old.remove();
      else {
        old.classList.add(forward ? "out-next" : "out-prev");
        old.addEventListener("animationend", () => old.remove(), { once: true });
      }
      cur = target; statusSingle();
    }

    /* ---------- shared ---------- */
    const next = () => (mode === "spread" ? goSpread(cur + 1) : goSingle(cur + 1));
    const prev = () => (mode === "spread" ? goSpread(cur - 1) : goSingle(cur - 1));
    prevBtn.onclick = prev; nextBtn.onclick = next;
    range.oninput = () => (mode === "spread" ? goSpread(+range.value) : goSingle(+range.value));

    root.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") { next(); e.preventDefault(); }
      if (e.key === "ArrowLeft") { prev(); e.preventDefault(); }
    });

    let sx = null, sy = null;
    book.addEventListener("pointerdown", e => { sx = e.clientX; sy = e.clientY; });
    book.addEventListener("pointerup", e => {
      if (sx == null) return;
      const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? next() : prev();
        book.addEventListener("click", ev => ev.stopPropagation(), { capture: true, once: true });
      }
    });

    function choose() {
      const want = root.clientWidth < SINGLE_BELOW ? "single" : "spread";
      if (want === mode) { size(); return; }
      finish();
      if (want === "single") buildSingle(mode === "spread" ? Math.max(0, leftOf(cur) - 1) : 0);
      else buildSpread(mode === "single" ? Math.floor((cur + 1) / 2) : 0);
    }
    choose();
    const ro = new ResizeObserver(() => choose());
    ro.observe(root);
    return { next, prev, destroy: () => { ro.disconnect(); if (anim) { anim.onfinish = null; anim.cancel(); anim = null; } } };
  }

  window.Flipbook = { mount, resolvePages };
})();

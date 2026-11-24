/* HavenHostKit welcome book maker.
   Pick a cover and a style, answer a few friendly questions, download a
   finished 32-page printable book. Everything runs in this browser and
   autosaves to localStorage. Nothing is sent anywhere. */
(function () {
  "use strict";
  const F = window.FIELDS, H = window.HHK;
  const LS_KEY = "hhk-filler-v1";
  const LS_STEP = "hhk-filler-step";
  const $ = (id) => document.getElementById(id);
  const stage = $("stage"), backBtn = $("back"), nextBtn = $("next"), nextLbl = $("next-label");
  const statusEl = $("status"), previewEl = $("preview"), sideEl = $("preview-side");
  const peekBtn = $("peek"), peekThumb = $("peek-thumb"), scrim = $("scrim");

  /* ---------- screens ---------- */
  const stepById = {};
  F.steps.forEach((s) => (stepById[s.id] = s));
  const META = {
    look: { label: "Pick your look", cheer: "Let's go" },
    property: { label: "The basics", cheer: "Great start", eyebrow: "Step 2 · The basics",
      title: "A few <em>basics</em>", lede: "Just enough for the cover, the welcome letter and the contact page.", next: "Next: WiFi and arrival" },
    access: { label: "WiFi and arrival", cheer: "Nice, two down", eyebrow: "Step 3 · WiFi and arrival",
      title: "WiFi and <em>getting in</em>", lede: "The first things every guest looks for. Type them once, we repeat them everywhere they belong.", next: "Next: house rules" },
    home: { label: "House rules", cheer: "Halfway there", eyebrow: "Step 4 · House rules and home",
      title: "House rules, <em>kindly put</em>", lede: "Already filled in with friendly defaults. Change only what is different at your place.", next: "Next: safety" },
    safety: { label: "Safety net", cheer: "Almost there", eyebrow: "Step 5 · Safety and nearby help",
      title: "Help, <em>close by</em>", lede: "For the emergency page. Hopefully never needed, always appreciated. All optional.", next: "Next: local favorites" },
    picks: { label: "Local favorites", cheer: "Last little bit", eyebrow: "Step 6 · Your local favorites",
      title: "The places you <em>love</em>", lede: "Where you would send a friend. We started you off with examples, so swap in your own or skip it.", next: "Finish my book" },
    review: { label: "Ready to print", cheer: "All done" },
  };
  const screens = [{ kind: "look", id: "look" }];
  F.steps.forEach((s) => screens.push({ kind: "fields", id: s.id, step: s }));
  screens.push({ kind: "picks", id: "picks" }, { kind: "review", id: "review" });
  const TOTAL = screens.length;

  /* ---------- state + autosave ---------- */
  function defaults() {
    const v = { picks: {}, cover: "editorial", theme: "heritage" };
    for (const step of F.steps) for (const f of step.fields) v[f.key] = f.default || "";
    for (const p of F.picks) v.picks[p.key] = Object.assign({}, p.defaults);
    return v;
  }
  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      const v = JSON.parse(raw);
      const d = defaults();
      for (const k in d) if (v[k] === undefined) v[k] = d[k];
      for (const pk in d.picks) v.picks[pk] = Object.assign({}, d.picks[pk], (v.picks || {})[pk]);
      return v;
    } catch (e) { return null; }
  }
  let values = load() || defaults();
  let saveT = 0;
  function save() {
    clearTimeout(saveT);
    saveT = setTimeout(() => {
      try { localStorage.setItem(LS_KEY, JSON.stringify(values)); } catch (e) {}
    }, 120);
  }
  let cur = 0;
  try { cur = Math.min(Math.max(parseInt(localStorage.getItem(LS_STEP), 10) || 0, 0), TOTAL - 2); } catch (e) {}
  if (!String(values.property_name || "").trim()) cur = 0;
  let pvPage = "cover";

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const val = (key, fallback) => values[key] ? esc(values[key]) : '<span class="val">' + esc(fallback) + "</span>";
  const themeOf = (id) => H.THEMES.find((t) => t.id === id) || H.THEMES[0];

  /* ---------- theme: restyle the whole app ---------- */
  function applyTheme(id) {
    const t = themeOf(id), c = t.c, r = document.documentElement.style;
    const map = { ink: "--ink", paper: "--paper", accent: "--accent", accent2: "--accent2", gold: "--gold", goldTx: "--gold-tx",
      tint: "--tint", hair: "--hair", mute: "--mute", onInk: "--on-ink" };
    for (const k in map) r.setProperty(map[k], c[k]);
    r.setProperty("--font-display", "'" + t.css.display + "', Georgia, serif");
    r.setProperty("--display-wt", t.css.reg);
    r.setProperty("--display-semi", t.css.semi);
    r.setProperty("--font-body", "'" + t.css.body + "', system-ui, sans-serif");
    document.documentElement.dataset.theme = t.id;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", c.paper);
  }

  /* ---------- progress ---------- */
  const track = $("progress-track");
  track.innerHTML = screens.map(() => "<span></span>").join("");
  function renderProgress() {
    const m = META[screens[cur].id];
    $("progress-label").textContent = (cur + 1) + " of " + TOTAL + " · " + m.label;
    const cheer = $("progress-cheer");
    if (cheer.textContent !== m.cheer) {
      cheer.textContent = m.cheer;
      cheer.classList.remove("pop"); void cheer.offsetWidth; cheer.classList.add("pop");
    }
    [...track.children].forEach((s, i) => {
      s.className = i < cur ? "done" : i === cur ? (cur === TOTAL - 1 ? "done" : "now") : "";
    });
  }

  /* ---------- render ---------- */
  let dir = "fwd";
  function render() {
    const sc = screens[cur];
    document.body.classList.toggle("wide", sc.kind === "look");
    document.body.classList.toggle("final", sc.kind === "review");
    backBtn.classList.toggle("hidden", cur === 0);
    $("actionbar").classList.toggle("hidden", sc.kind === "review");
    statusEl.textContent = "";
    renderProgress();
    const scr = document.createElement("div");
    scr.className = "screen" + (dir === "back" ? " back" : "");
    if (sc.kind === "look") renderLook(scr);
    else if (sc.kind === "fields") renderFields(scr, sc.step);
    else if (sc.kind === "picks") renderPicks(scr);
    else renderReview(scr);
    [...scr.children].forEach((el, i) => el.style.setProperty("--i", Math.min(i, 8)));
    stage.replaceChildren(scr);
    nextLbl.textContent = sc.kind === "look" ? "Looks great, next" : (META[sc.id].next || "Next");
    renderPreview();
    try { localStorage.setItem(LS_STEP, String(cur)); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (sc.kind === "review") celebrate();
  }

  // ---- step 1: name, style, cover ----
  function renderLook(scr) {
    scr.innerHTML =
      '<div class="look-hero"><div class="fan" id="fan" aria-hidden="true"><div class="fan-card l"></div><div class="fan-card r"></div><div class="fan-card m"></div></div>' +
      '<div class="look-copy"><div class="eyebrow">Takes about five minutes</div>' +
      "<h1>First, pick your <em>cover</em></h1>" +
      '<p class="lede">Type your place\'s name and watch every cover try it on.</p>' +
      '<div class="name-field"><label for="in-property_name">What do guests call your place?</label>' +
      '<input id="in-property_name" type="text" autocomplete="off" maxlength="60" placeholder="e.g. Seabreeze Cottage" value="' + esc(values.property_name) + '"></div></div></div>' +
      '<div class="section-label"><h3>Pick a style</h3><small>Colors and fonts, for the app and the book</small></div>' +
      '<div class="themes" id="themes" role="radiogroup" aria-label="Style"></div>' +
      '<div class="section-label"><h3>Pick a cover</h3><small>Tap one, it is all yours</small></div>' +
      '<div class="covers" id="covers" role="radiogroup" aria-label="Cover"></div>';
    const themesEl = scr.querySelector("#themes"), coversEl = scr.querySelector("#covers");
    for (const t of H.THEMES) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "theme-card" + (values.theme === t.id ? " on" : "");
      b.setAttribute("role", "radio"); b.setAttribute("aria-checked", values.theme === t.id);
      b.dataset.id = t.id;
      b.style.setProperty("--tp", t.c.paper); b.style.setProperty("--ti", t.c.ink);
      b.innerHTML = '<span class="tick"></span><span class="sw"><i style="background:' + t.c.ink + '"></i><i style="background:' + t.c.accent +
        '"></i><i style="background:' + t.c.gold + '"></i><i style="background:' + t.c.accent2 + '"></i></span>' +
        '<span class="tc-body"><span class="aa" style="font-family:\'' + t.css.display + "';font-weight:" + t.css.reg + '">Aa<span style="color:' +
        t.c.accent + '">.</span></span><span class="tn">' + esc(t.name) + '</span><span class="tb">' + esc(t.blurb) + "</span></span>";
      b.addEventListener("click", () => {
        values.theme = t.id; save(); applyTheme(t.id);
        themesEl.querySelectorAll(".theme-card").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); });
        drawGallery(); renderPreview();
      });
      themesEl.appendChild(b);
    }
    for (const c of H.COVERS) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "cover-card" + (values.cover === c.id ? " on" : "");
      b.setAttribute("role", "radio"); b.setAttribute("aria-checked", values.cover === c.id);
      b.dataset.id = c.id;
      b.innerHTML = '<span class="tick"></span><span class="art"></span><span class="cap"><span class="cn">' + esc(c.name) +
        '</span><span class="cb">' + esc(c.blurb) + "</span></span>";
      b.addEventListener("click", () => {
        values.cover = c.id; save();
        coversEl.querySelectorAll(".cover-card").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); });
        drawGallery(); renderPreview();
      });
      coversEl.appendChild(b);
    }
    const inp = scr.querySelector("#in-property_name");
    inp.addEventListener("input", () => {
      values.property_name = inp.value; inp.classList.remove("missing"); save(); scheduleGallery();
    });
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); inp.blur(); } });
    drawGallery(scr);
  }
  let galT = 0;
  function scheduleGallery() { cancelAnimationFrame(galT); galT = requestAnimationFrame(() => { drawGallery(); renderPreview(); }); }
  function drawGallery(root) {
    root = root || stage;
    const fan = root.querySelector("#fan");
    if (fan) {
      const ids = H.COVERS.map((c) => c.id), i = Math.max(0, ids.indexOf(values.cover));
      const pick = { m: ids[i], l: ids[(i + ids.length - 1) % ids.length], r: ids[(i + 1) % ids.length] };
      for (const k in pick) fan.querySelector(".fan-card." + k).innerHTML = H.coverSVG(Object.assign({}, values, { cover: pick[k] }));
    }
    root.querySelectorAll(".cover-card").forEach((b) => {
      const v = Object.assign({}, values, { cover: b.dataset.id });
      b.querySelector(".art").innerHTML = H.coverSVG(v, 'role="img" aria-label="' + esc(b.querySelector(".cn").textContent) + ' cover"');
    });
  }

  // ---- form steps ----
  function fieldEl(f) {
    const wrap = document.createElement("label");
    wrap.className = "field";
    wrap.innerHTML = '<span class="field-label">' + esc(f.label) + (f.required ? ' <span class="req">Needed</span>' : "") + "</span>" +
      (f.help ? '<span class="field-help">' + esc(f.help) + "</span>" : "") +
      '<span class="input-wrap"><input id="in-' + f.key + '" data-key="' + f.key + '" type="text" autocomplete="off" value="' +
      esc(values[f.key]) + '"><span class="ok"></span></span>';
    const iw = wrap.querySelector(".input-wrap"), inp = wrap.querySelector("input");
    const mark = () => iw.classList.toggle("filled", !!String(inp.value).trim());
    mark();
    inp.addEventListener("input", () => { values[f.key] = inp.value; inp.classList.remove("missing"); mark(); save(); schedulePreview(); });
    return wrap;
  }
  function header(scr, m) {
    scr.insertAdjacentHTML("beforeend", '<div class="eyebrow">' + esc(m.eyebrow) + "</div><h2>" + m.title + '</h2><p class="lede">' + esc(m.lede) + "</p>");
  }
  function renderFields(scr, step) {
    header(scr, META[step.id]);
    const fields = step.fields.filter((f) => f.key !== "property_name");
    const req = fields.filter((f) => f.required), opt = fields.filter((f) => !f.required);
    if (req.length) {
      const g = document.createElement("div"); g.className = "card-group";
      req.forEach((f) => g.appendChild(fieldEl(f)));
      scr.appendChild(g);
    }
    if (opt.length) {
      const h = document.createElement("div"); h.className = "optional-head";
      h.innerHTML = req.length
        ? "<strong>Nice extras</strong><span>Optional. Anything you skip keeps a friendly default or a fill-in line.</span>"
        : "<strong>All optional</strong><span>Fill what you know. Skip the rest.</span>";
      scr.appendChild(h);
      const g = document.createElement("div"); g.className = "card-group two-up";
      opt.forEach((f) => g.appendChild(fieldEl(f)));
      scr.appendChild(g);
    }
    wireEnter(scr);
  }
  function wireEnter(scr) {
    const inputs = [...scr.querySelectorAll("input")];
    inputs.forEach((inp, i) => inp.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (inputs[i + 1] && inputs[i + 1].offsetParent) inputs[i + 1].focus(); else nextBtn.click();
    }));
  }
  const PICK_LABELS = { name: "Place name", distance: "Distance from your place", description: "Why you love it",
    order: "Your favorite order", hours: "Hours" };
  function renderPicks(scr) {
    header(scr, META.picks);
    F.picks.forEach((p, idx) => {
      const d = document.createElement("details");
      d.className = "pick"; if (idx === 0) d.open = true;
      const pk = values.picks[p.key];
      d.innerHTML = '<summary><span class="pin">' + (idx + 1) + '</span><span class="pk-t"><small>' + esc(p.label) + "</small><b>" +
        esc(pk.name || "Add a place") + '</b></span><span class="chev"></span></summary><div class="pk-body"></div>';
      const body = d.querySelector(".pk-body"), title = d.querySelector(".pk-t b");
      for (const sub of F.pick_subfields) {
        const f = { key: "pk-" + p.key + "-" + sub, label: PICK_LABELS[sub] };
        const wrap = document.createElement("label");
        wrap.className = "field";
        wrap.innerHTML = '<span class="field-label">' + esc(f.label) + '</span><span class="input-wrap"><input id="' + f.key +
          '" type="text" autocomplete="off" value="' + esc(pk[sub] || "") + '"><span class="ok"></span></span>';
        const inp = wrap.querySelector("input"), iw = wrap.querySelector(".input-wrap");
        iw.classList.toggle("filled", !!String(inp.value).trim());
        inp.addEventListener("input", () => {
          values.picks[p.key][sub] = inp.value; iw.classList.toggle("filled", !!inp.value.trim());
          if (sub === "name") title.textContent = inp.value || "Add a place";
          save();
        });
        body.appendChild(wrap);
      }
      scr.appendChild(d);
    });
    wireEnter(scr);
  }

  // ---- finish ----
  function countFacts() {
    const raw = JSON.stringify(window.BOOK);
    let spots = 0;
    for (const step of F.steps) for (const f of step.fields) {
      if (!String(values[f.key] || "").trim()) continue;
      for (const ph of f.ph) spots += raw.split(ph).length - 1;
    }
    let nameCount = 0;
    if (String(values.property_name || "").trim()) {
      nameCount = raw.split("[Property Name]").length - 1 + 30 + 3; // pages + footers + cover + back cover
      spots += 33;
    }
    for (const p of F.picks) if ((values.picks[p.key] || {}).name) spots += 1;
    return { spots, nameCount };
  }
  function renderReview(scr) {
    const facts = countFacts(), t = themeOf(values.theme), cv = H.COVERS.find((c) => c.id === values.cover) || H.COVERS[0];
    scr.className += " finale";
    scr.innerHTML =
      '<div class="eyebrow">Ready to print</div>' +
      "<h1>Your book is <em>ready</em></h1>" +
      '<p class="lede" style="margin:0 auto">' + esc(cv.name) + " cover in " + esc(t.name) + ". Every page is filled in and laid out, ready for the printer.</p>" +
      '<div class="stage3d"><div class="book"><div class="back"></div><div class="pages"></div><div class="face">' +
      H.coverSVG(values, 'role="img" aria-label="Your finished cover"') + '</div></div><div class="book-shadow"></div></div>' +
      '<div class="facts"><div class="fact"><b data-n="32">0</b><span>pages, ready to print</span></div>' +
      '<div class="fact"><b data-n="' + facts.spots + '">0</b><span>spots filled with your details</span></div>' +
      '<div class="fact"><b data-n="' + facts.nameCount + '">0</b><span>times your name shows up</span></div></div>' +
      '<button class="btn primary dl" id="download"><span class="bar"></span><span class="lbl">Download my book</span><span class="arrow-r" aria-hidden="true"></span></button>' +
      '<p class="after" id="after">A US Letter PDF. Print it at home or at any print shop.</p>' +
      '<div class="change"><button class="chip" data-go="0">Change cover or style</button>' +
      '<button class="chip" data-go="1">Edit my details</button></div>' +
      '<div class="summary"><details><summary>Check your details <span class="chev"></span></summary><div class="rows" id="rows"></div></details></div>' +
      '<div class="tipnote"><b>A little tip</b>Print one copy for the binder and keep the PDF as your master. Changed the WiFi password? Come back, update it here and download a fresh book. Your answers will be waiting.</div>';
    // summary rows grouped by step, each with a jump-back
    let rows = "";
    screens.forEach((s, i) => {
      if (s.kind !== "fields" && s.kind !== "picks") return;
      let r = "";
      if (s.kind === "fields") {
        for (const f of s.step.fields) if (values[f.key]) r += '<div class="row"><span>' + esc(f.label) + "</span><span>" + esc(values[f.key]) + "</span></div>";
      } else {
        for (const p of F.picks) { const pk = values.picks[p.key] || {}; if (pk.name) r += '<div class="row"><span>' + esc(p.label) + "</span><span>" + esc(pk.name) + "</span></div>"; }
      }
      rows += '<div class="grp"><b>' + esc(META[s.id].label) + '</b><button data-go="' + i + '">Edit</button></div>' + r;
    });
    scr.querySelector("#rows").innerHTML = rows;
    scr.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(parseInt(b.dataset.go, 10))));
    scr.querySelector("#download").addEventListener("click", download);
    // count-up
    setTimeout(() => scr.querySelectorAll(".fact b").forEach((b) => countUp(b, parseInt(b.dataset.n, 10))), 700);
  }
  function countUp(el, n) {
    const t0 = performance.now(), dur = 900;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(n * e);
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function celebrate() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = $("confetti"), c = themeOf(values.theme).c;
    const cols = [c.accent, c.gold, c.accent2, c.ink];
    box.innerHTML = "";
    for (let i = 0; i < 70; i++) {
      const s = document.createElement("i");
      if (i % 3 === 0) s.className = "c";
      s.style.left = (Math.random() * 100) + "vw";
      s.style.background = cols[i % cols.length];
      s.style.setProperty("--x", ((Math.random() - 0.5) * 30) + "vw");
      s.style.setProperty("--r", (Math.random() * 900 - 450) + "deg");
      s.style.setProperty("--d", (2.2 + Math.random() * 1.8) + "s");
      s.style.setProperty("--w", (Math.random() * 0.9) + "s");
      box.appendChild(s);
    }
    setTimeout(() => { box.innerHTML = ""; }, 5200);
  }
  function download() {
    const btn = $("download"), lbl = btn.querySelector(".lbl"), after = $("after");
    if (btn.classList.contains("busy")) return;
    btn.classList.remove("done"); btn.classList.add("busy");
    lbl.textContent = "Binding your 32 pages";
    setTimeout(() => {
      try {
        const doc = H.generateBook(values);
        const name = (values.property_name || "my").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-welcome-book.pdf";
        doc.save(name);
        btn.classList.remove("busy"); btn.classList.add("done");
        lbl.textContent = "Downloaded. Download again?";
        after.textContent = "Saved as " + name + ". Enjoy the first guest who says wow.";
        celebrate();
      } catch (e) {
        btn.classList.remove("busy");
        lbl.textContent = "Try again";
        after.textContent = "Something went wrong building the book. Your answers are safe, so give it another tap.";
        if (window.console) console.error(e);
      }
    }, 60);
  }

  /* ---------- live preview ---------- */
  let pvT = 0;
  function schedulePreview() { cancelAnimationFrame(pvT); pvT = requestAnimationFrame(renderPreview); }
  function renderPreview() {
    peekThumb.innerHTML = H.coverSVG(values, 'aria-hidden="true"');
    if (pvPage === "cover") {
      previewEl.innerHTML = H.coverSVG(values, 'role="img" aria-label="Cover preview"');
      return;
    }
    const foot = '<div class="foot">' + val("property_name", "Your Place") + "&nbsp;&nbsp;·&nbsp;&nbsp;" + (pvPage === "glance" ? 3 : 4) + "</div>";
    if (pvPage === "glance") {
      const rows = [
        ["Check-in", val("checkin_time", "4:00 PM")], ["Checkout", val("checkout_time", "11:00 AM")],
        ["WiFi network", val("wifi_network", "Your network")], ["WiFi password", val("wifi_password", "Your password")],
        ["Door and key", val("entry", "See arrival page")], ["Parking", val("parking", "See arrival page")],
        ["Quiet hours", val("quiet_start", "10:00 PM") + " to " + val("quiet_end", "8:00 AM")],
        ["Host phone", val("host_phone", "Your phone")],
      ];
      previewEl.innerHTML = '<div class="pv"><div class="k">The Essentials</div><h4>The essentials, all in one place</h4><div class="rule"></div>' +
        rows.map(([k, v]) => '<div class="kv"><b>' + k + "</b><span>" + v + "</span></div>").join("") + foot + "</div>";
    } else {
      previewEl.innerHTML = '<div class="pv"><div class="k">Stay Connected</div><h4>WiFi and getting connected</h4><div class="rule"></div>' +
        "<p>The WiFi is fast and unlimited, and it works on the porch too.</p>" +
        '<div class="wifi-box"><small>Network</small><div class="big">' + val("wifi_network", "Your network") +
        '</div><small>Password</small><div class="big">' + val("wifi_password", "Your password") + "</div></div>" +
        "<p>The router is " + val("router_location", "in the living room") +
        ". If the connection drops, unplug it, count to ten, and plug it back in.</p>" + foot + "</div>";
    }
  }
  document.querySelectorAll(".preview-tabs button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll(".preview-tabs button").forEach((x) => x.classList.toggle("active", x === b));
    pvPage = b.dataset.page; renderPreview();
  }));
  function openSheet(open) {
    sideEl.classList.toggle("open", open); scrim.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  peekBtn.addEventListener("click", () => openSheet(true));
  scrim.addEventListener("click", () => openSheet(false));
  $("sheet-close").addEventListener("click", () => openSheet(false));

  /* ---------- navigation ---------- */
  function requiredMissing() {
    const sc = screens[cur];
    const keys = sc.kind === "look" ? ["property_name"]
      : sc.kind === "fields" ? sc.step.fields.filter((f) => f.required && f.key !== "property_name").map((f) => f.key) : [];
    const missing = keys.filter((k) => !String(values[k] || "").trim());
    missing.forEach((k) => { const el = $("in-" + k); if (el) { el.classList.remove("missing"); void el.offsetWidth; el.classList.add("missing"); } });
    if (missing.length) { const el = $("in-" + missing[0]); if (el) el.focus({ preventScroll: true }); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }
    return missing;
  }
  function go(i) {
    openSheet(false);
    dir = i < cur ? "back" : "fwd";
    cur = Math.max(0, Math.min(TOTAL - 1, i));
    render();
  }
  nextBtn.addEventListener("click", () => {
    const missing = requiredMissing();
    if (missing.length) {
      statusEl.textContent = screens[cur].kind === "look"
        ? "Give your place a name first, it goes right on the cover."
        : "Just the ones marked Needed, then we keep going.";
      return;
    }
    if (cur < TOTAL - 1) go(cur + 1);
  });
  backBtn.addEventListener("click", () => { if (cur > 0) go(cur - 1); });

  applyTheme(values.theme);
  render();
})();

/* HavenHostKit filler — guided form, autosave, live preview, download.
   Everything runs in this browser. Answers autosave to localStorage. */
(function () {
  "use strict";
  const F = window.FIELDS;
  const LS_KEY = "hhk-filler-v1";
  const stepsEl = document.getElementById("steps");
  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");
  const dlBtn = document.getElementById("download");
  const statusEl = document.getElementById("status");
  const labelEl = document.getElementById("progress-label");
  const barEl = document.getElementById("progress-bar");
  const previewEl = document.getElementById("preview");

  // screens: the 4 field steps + local picks + review
  const screens = F.steps.map((s, i) => ({ kind: "fields", step: s, idx: i }));
  screens.push({ kind: "picks" });
  screens.push({ kind: "review" });
  const TOTAL = screens.length;

  let values = load() || defaults();
  let cur = 0;
  let pvPage = "cover";

  function defaults() {
    const v = { picks: {} };
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
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(values)); } catch (e) {}
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>""]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }
  function val(key, fallback) {
    const v = values[key];
    return v ? esc(v) : '<span class="val">' + esc(fallback) + "</span>";
  }

  /* ---------- render current screen ---------- */
  function render() {
    const sc = screens[cur];
    labelEl.textContent = "Step " + (cur + 1) + " of " + TOTAL;
    barEl.style.width = ((cur + 1) / TOTAL * 100) + "%";
    backBtn.classList.toggle("hidden", cur === 0);
    nextBtn.classList.toggle("hidden", sc.kind === "review");
    dlBtn.classList.toggle("hidden", sc.kind !== "review");
    statusEl.textContent = "";
    if (sc.kind === "fields") renderFields(sc);
    else if (sc.kind === "picks") renderPicks();
    else renderReview();
    renderPreview();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function fieldInput(f) {
    const wrap = document.createElement("div");
    const id = "in-" + f.key;
    wrap.innerHTML =
      '<label for="' + id + '">' + esc(f.label) +
      (f.required ? ' <span class="req">*</span>' : "") +
      (f.help ? "<small>" + esc(f.help) + "</small>" : "") +
      '<input id="' + id + '" data-key="' + f.key + '" type="text" ' +
      'value="' + esc(values[f.key]) + '" autocomplete="off"></label>';
    wrap.querySelector("input").addEventListener("input", (e) => {
      values[f.key] = e.target.value;
      e.target.classList.remove("missing");
      save(); renderPreview();
    });
    return wrap;
  }

  function renderFields(sc) {
    stepsEl.innerHTML = "";
    const div = document.createElement("div");
    div.className = "step";
    div.innerHTML = '<div class="kicker">HavenHostKit</div><h2>' + esc(sc.step.title) +
      '</h2><p class="blurb">' + esc(sc.step.blurb) + "</p>";
    for (const f of sc.step.fields) div.appendChild(fieldInput(f));
    stepsEl.appendChild(div);
  }

  function renderPicks() {
    stepsEl.innerHTML = "";
    const div = document.createElement("div");
    div.className = "step";
    div.innerHTML = '<div class="kicker">HavenHostKit</div><h2>Your Local Picks</h2>' +
      '<p class="blurb">The places you would send a friend. All optional — ' +
      "fill what you know, skip the rest.</p>";
    for (const p of F.picks) {
      const fs = document.createElement("fieldset");
      fs.className = "pick";
      fs.innerHTML = "<legend>" + esc(p.label) + "</legend>";
      const labels = { name: "Place name", distance: "Distance from your place",
        description: "Why you love it (a sentence or two)", order: "Your favorite order",
        hours: "Hours" };
      for (const sub of F.pick_subfields) {
        const id = "pk-" + p.key + "-" + sub;
        const l = document.createElement("label");
        l.setAttribute("for", id);
        l.textContent = labels[sub];
        const inp = document.createElement("input");
        inp.id = id; inp.type = "text"; inp.autocomplete = "off";
        inp.value = (values.picks[p.key] || {})[sub] || "";
        inp.addEventListener("input", (e) => {
          values.picks[p.key][sub] = e.target.value;
          save(); renderPreview();
        });
        l.appendChild(inp);
        fs.appendChild(l);
      }
      div.appendChild(fs);
    }
    stepsEl.appendChild(div);
  }

  function renderReview() {
    stepsEl.innerHTML = "";
    const div = document.createElement("div");
    div.className = "step";
    let rows = "";
    for (const step of F.steps) for (const f of step.fields) {
      if (values[f.key]) rows += '<div class="review-row"><b>' + esc(f.label) +
        "</b><span>" + esc(values[f.key]) + "</span></div>";
    }
    for (const p of F.picks) {
      const pk = values.picks[p.key] || {};
      if (pk.name) rows += '<div class="review-row"><b>' + esc(p.label) +
        "</b><span>" + esc(pk.name) + "</span></div>";
    }
    div.innerHTML = '<div class="kicker">HavenHostKit</div><h2>Looks good?</h2>' +
      '<p class="blurb">Check your details, then download your finished book. ' +
      "It has all 32 pages, ready to print.</p>" + rows +
      '<div class="done-note">Tip: print one copy for the binder and keep the ' +
      "PDF as your master. Changed your WiFi password later? Come back, update " +
      "it here, and download a fresh book.</div>";
    stepsEl.appendChild(div);
  }

  /* ---------- live preview ---------- */
  function renderPreview() {
    const addr = [values.street_address, values.city, values.state].filter(Boolean).join(", ");
    if (pvPage === "cover") {
      previewEl.innerHTML =
        '<div class="pv pv-cover"><div class="monogram">H<span>K</span></div>' +
        '<div class="welcome">WELCOME TO</div><h3>' +
        val("property_name", "Your Property") + '</h3><div class="goldrule"></div>' +
        '<div class="tagline">Your Guide to a Comfortable Stay</div>' +
        '<div class="prop">' + val("property_name", "Your Property") + "</div>" +
        '<div class="addr">' + (addr ? esc(addr) : '<span class="val">Your address</span>') + "</div>" +
        '<div class="by">Prepared with care for our guests by ' + val("host_name", "you") +
        "</div></div>";
    } else if (pvPage === "glance") {
      const rows = [
        ["Check-in", val("checkin_time", "4:00 PM")], ["Checkout", val("checkout_time", "11:00 AM")],
        ["WiFi network", val("wifi_network", "Your network")], ["WiFi password", val("wifi_password", "Your password")],
        ["Door / key", val("entry", "See arrival page")], ["Parking", val("parking", "See arrival page")],
        ["Quiet hours", val("quiet_start", "10:00 PM") + " to " + val("quiet_end", "8:00 AM")],
        ["Host phone", val("host_phone", "Your phone")],
      ];
      previewEl.innerHTML = '<div class="pv"><div class="kicker">The Essentials</div>' +
        "<h3>The essentials, all in one place</h3><div class='rule'></div>" +
        rows.map(([k, v]) => '<div class="kv"><b>' + k + "</b><span>" + v + "</span></div>").join("") +
        "</div>";
    } else {
      previewEl.innerHTML = '<div class="pv"><div class="kicker">Stay Connected</div>' +
        "<h3>WiFi and getting connected</h3><div class='rule'></div>" +
        "<p>The WiFi is fast and unlimited, and it works on the porch too.</p>" +
        '<div class="pv-wifi-box"><div>Network</div><div class="big">' +
        val("wifi_network", "Your network") + '</div><div style="margin-top:8px">Password</div>' +
        '<div class="big">' + val("wifi_password", "Your password") + "</div></div>" +
        "<p>Router is " + val("router_location", "in the living room") +
        ". If the connection drops, unplug it, count to ten, and plug it back in.</p></div>";
    }
  }
  document.querySelectorAll(".preview-tabs button").forEach((b) => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".preview-tabs button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      pvPage = b.dataset.page;
      renderPreview();
    });
  });

  /* ---------- navigation ---------- */
  function requiredMissing() {
    const sc = screens[cur];
    if (sc.kind !== "fields") return [];
    const missing = [];
    for (const f of sc.step.fields) {
      if (f.required && !String(values[f.key] || "").trim()) {
        missing.push(f.key);
        const inp = document.getElementById("in-" + f.key);
        if (inp) inp.classList.add("missing");
      }
    }
    return missing;
  }
  nextBtn.addEventListener("click", () => {
    const missing = requiredMissing();
    if (missing.length) {
      statusEl.textContent = "Just the starred bits on this screen, then we can keep going.";
      return;
    }
    if (cur < TOTAL - 1) { cur++; render(); }
  });
  backBtn.addEventListener("click", () => { if (cur > 0) { cur--; render(); } });
  dlBtn.addEventListener("click", () => {
    statusEl.textContent = "Building your book…";
    setTimeout(() => {
      try {
        const doc = window.HHK.generateBook(values);
        const name = (values.property_name || "my").toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-welcome-book.pdf";
        doc.save(name);
        statusEl.textContent = "Done! Your printable book is downloading.";
      } catch (e) {
        statusEl.textContent = "Something went wrong building the book. Your answers are saved — try again.";
      }
    }, 30);
  });

  render();
})();

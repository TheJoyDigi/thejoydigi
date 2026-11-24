/* HavenHostKit · client-side book renderer.
   A faithful port of the v2 Python engine (build_v2.py) to jsPDF:
   same 32-page structure, same layout rules, now themeable:
   - THEMES: palette + display face, applied to every page.
   - COVERS: six cover compositions, described once as a vector "scene"
     that renders both to the PDF (jsPDF) and to SVG for the app's live
     gallery and preview, so what the host picks is what prints.
   Runs entirely in the browser. No data leaves the device. */
(function () {
  "use strict";
  const PW = 612, PH = 792, MARG = 54, CW = PW - 2 * MARG, TOP = 58, BOT = PH - 52;

  /* ---------- themes ---------- */
  const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  // pdf: jsPDF [family, style] per role. css: the same faces for the app/SVG.
  const THEMES = [
    { id: "heritage", name: "Heritage", blurb: "Evergreen ink, cream and terracotta",
      pdf: { reg: ["fraunces", "normal"], ital: ["fraunces", "italic"], semi: ["frauncessemi", "normal"], bold: ["fraunces", "bold"] },
      css: { display: "Fraunces", reg: 400, semi: 600, italic: true, body: "Inter" },
      c: { ink: "#1A2E28", paper: "#FAF6F0", accent: "#C67B5C", accent2: "#8A9B8E", gold: "#C9A86A",
           goldTx: "#A07C3E", tint: "#E9E9E2", hair: "#CED6CC", mute: "#5C6C64", onInk: "#FAF6F0", onInkSoft: "#D6D0C4" } },
    { id: "sunwashed", name: "Sunwashed", blurb: "Sand, coral and sea glass",
      pdf: { reg: ["dmserif", "normal"], ital: ["dmserif", "italic"], semi: ["dmserif", "normal"], bold: ["dmserif", "normal"] },
      css: { display: "DM Serif Display", reg: 400, semi: 400, italic: true, body: "DM Sans" },
      c: { ink: "#1F3A4D", paper: "#FBF3E8", accent: "#E2674A", accent2: "#4C9BA8", gold: "#F0B544",
           goldTx: "#B0532F", tint: "#F5E6D3", hair: "#E9D9C4", mute: "#5A6870", onInk: "#FBF3E8", onInkSoft: "#C7D5DB" } },
    { id: "timber", name: "Timber", blurb: "Bark, moss and lantern light",
      pdf: { reg: ["zilla", "normal"], ital: ["zilla", "italic"], semi: ["zillasemi", "normal"], bold: ["zillasemi", "normal"] },
      css: { display: "Zilla Slab", reg: 400, semi: 600, italic: true, body: "Work Sans" },
      c: { ink: "#2B211A", paper: "#F4EDE1", accent: "#B4452F", accent2: "#647D4C", gold: "#D9A24A",
           goldTx: "#8E6322", tint: "#E8DFCD", hair: "#D7CBB4", mute: "#6A5D50", onInk: "#F4EDE1", onInkSoft: "#CFC1AA" } },
    { id: "noir", name: "Noir & Gold", blurb: "Charcoal, ivory and brushed gold",
      pdf: { reg: ["cormorant", "normal"], ital: ["cormorant", "italic"], semi: ["cormorantb", "normal"], bold: ["cormorantb", "normal"] },
      css: { display: "Cormorant Garamond", reg: 500, semi: 700, italic: true, body: "Montserrat" },
      c: { ink: "#1D1D1F", paper: "#F7F3EC", accent: "#A6814B", accent2: "#6F7E88", gold: "#C6A673",
           goldTx: "#8A6A3B", tint: "#EDE7DB", hair: "#DCD4C5", mute: "#67625A", onInk: "#F7F3EC", onInkSoft: "#BEB6A8" } },
    { id: "citrus", name: "Citrus Pop", blurb: "Plum, tangerine and lagoon teal",
      pdf: { reg: ["bricolage", "normal"], ital: ["bricolage", "normal"], semi: ["bricolagex", "normal"], bold: ["bricolagex", "normal"] },
      css: { display: "Bricolage Grotesque", reg: 600, semi: 800, italic: false, body: "DM Sans" },
      c: { ink: "#2E1B45", paper: "#FFF7EC", accent: "#FF6A3D", accent2: "#14A396", gold: "#FFC23D",
           goldTx: "#C2441B", tint: "#FFEAD3", hair: "#F2DCC2", mute: "#6C5E78", onInk: "#FFF7EC", onInkSoft: "#DCCFE8" } },
  ];
  const themeById = (id) => THEMES.find((t) => t.id === id) || THEMES[0];

  // live palette + display faces (set per book by setTheme)
  let INK, CREAM, TERRA, SAGE, GOLD, GOLD_TX, SAGE_TINT, HAIR, MUTE, ON_INK, ON_INK_SOFT, DF, STYLE_FONT, STYLE_COLOR;
  function setTheme(theme) {
    const c = {};
    for (const k in theme.c) c[k] = hex(theme.c[k]);
    INK = c.ink; CREAM = c.paper; TERRA = c.accent; SAGE = c.accent2; GOLD = c.gold; GOLD_TX = c.goldTx;
    SAGE_TINT = c.tint; HAIR = c.hair; MUTE = c.mute; ON_INK = c.onInk; ON_INK_SOFT = c.onInkSoft;
    DF = theme.pdf;
    STYLE_FONT = {
      reg: ["inter", "normal"], bold: ["inter", "bold"], ital: ["inter", "italic"],
      med: ["intermed", "normal"], semi: ["intersemi", "normal"],
      ph: ["intersemi", "normal"], phb: ["inter", "bold"],
      serif: DF.reg, serifb: DF.bold, serifi: DF.ital, serifsemi: DF.semi,
    };
    STYLE_COLOR = { ph: TERRA, phb: TERRA };
    return c;
  }
  function setF(doc, f) { doc.setFont(f[0], f[1]); }
  setTheme(THEMES[0]);

  function tokenize(text, base) {
    base = base || "reg";
    const tokens = [];
    const parts = String(text).split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\])/g).filter(Boolean);
    for (let part of parts) {
      let style = base;
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        style = "bold"; part = part.slice(2, -2);
      } else if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        style = "ital"; part = part.slice(1, -1);
      } else if (part.startsWith("[") && part.endsWith("]")) {
        const st = base === "bold" ? "phb" : "ph";
        for (const w of part.split(" ")) if (w) tokens.push([w, st]);
        continue;
      }
      const subs = part.split(/(\[[^\]]+\])/g).filter(Boolean);
      for (const s of subs) {
        let st = style;
        if (s.startsWith("[") && s.endsWith("]")) st = style === "bold" ? "phb" : "ph";
        for (const w of s.split(" ")) if (w) tokens.push([w, st]);
      }
    }
    return tokens;
  }

  class Flow {
    constructor(doc) { this.doc = doc; }
    width(word, style, size) {
      const [fam, st] = STYLE_FONT[style];
      this.doc.setFont(fam, st); this.doc.setFontSize(size);
      return this.doc.getTextWidth(word);
    }
    wrap(tokens, size, width) {
      const space = this.width(" ", "reg", size);
      const lines = []; let cur = [], curw = 0;
      for (const [w, st] of tokens) {
        const ww = this.width(w, st, size);
        const add = cur.length ? ww + space : ww;
        if (cur.length && curw + add > width) { lines.push(cur); cur = [[w, st]]; curw = ww; }
        else { cur.push([w, st]); curw += add; }
      }
      if (cur.length) lines.push(cur);
      return lines;
    }
    drawLines(lines, x, y, size, lh, color, align, width) {
      color = color || INK; align = align || "L"; width = width || CW;
      const space = this.width(" ", "reg", size);
      for (const line of lines) {
        const lw = line.reduce((s, [w, st]) => s + this.width(w, st, size), 0) + space * (line.length - 1);
        let cx = align === "L" ? x : x + (width - lw) / 2;
        for (const [w, st] of line) {
          const [fam, fst] = STYLE_FONT[st];
          this.doc.setFont(fam, fst); this.doc.setFontSize(size);
          const c = STYLE_COLOR[st] || color;
          this.doc.setTextColor(c[0], c[1], c[2]);
          const ww = this.width(w, st, size);
          this.doc.text(w, cx, y + size * 0.92);
          cx += ww + space;
        }
        y += lh;
      }
      this.doc.setTextColor(INK[0], INK[1], INK[2]);
      return y;
    }
    para(text, x, y, width, o) {
      o = o || {};
      const size = o.size || 10.5, lh = o.lh || size * 1.52;
      const lines = this.wrap(tokenize(text, o.base || "reg"), size, width);
      let y2;
      if (!o.measure) y2 = this.drawLines(lines, x, y, size, lh, o.color || INK, o.align || "L", width);
      else y2 = y + lines.length * lh;
      return y2 + (o.space_after != null ? o.space_after : 7);
    }
  }

  function bg(doc, color) {
    color = color || CREAM;
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(0, 0, PW, PH, "F");
  }
  function setC(doc, c) { doc.setTextColor(c[0], c[1], c[2]); }

  function headerBlock(f, doc, kicker, headline, y, headlineSize) {
    y = y || TOP; headlineSize = headlineSize || 27;
    doc.setFont("intersemi", "normal"); doc.setFontSize(8.5); setC(doc, GOLD_TX);
    doc.text(kicker.toUpperCase(), MARG, y + 8, { charSpace: 1.6 });
    y += 16;
    const lines = f.wrap(tokenize(headline, "serif"), headlineSize, CW);
    let yy = y;
    for (const line of lines) {
      let cx = MARG;
      for (const [w] of line) {
        const ital = w.startsWith("[") || w.endsWith("]");
        setF(doc, ital ? DF.ital : DF.reg); doc.setFontSize(headlineSize);
        setC(doc, INK);
        const ww = doc.getTextWidth(w);
        doc.text(w, cx, yy + headlineSize * 0.92);
        cx += ww + f.width(" ", "serif", headlineSize);
      }
      yy += headlineSize * 1.18;
    }
    y = yy + 8;
    doc.setDrawColor(SAGE[0], SAGE[1], SAGE[2]); doc.setLineWidth(0.9);
    doc.line(MARG, y, PW - MARG, y);
    return y + 16;
  }

  function footerNum(doc, n, prop) {
    doc.setFont("inter", "normal"); doc.setFontSize(8); setC(doc, SAGE);
    const t = prop + "   ·   " + n;
    doc.text(t, (PW - doc.getTextWidth(t)) / 2, PH - 30);
    setC(doc, INK);
  }

  function label(f, doc, text, x, y, size, measure) {
    size = size || 8.5;
    if (!measure) {
      doc.setFont("intersemi", "normal"); doc.setFontSize(size); setC(doc, GOLD_TX);
      doc.text(text.toUpperCase(), x, y + size * 0.9, { charSpace: 1.5 });
      setC(doc, INK);
    }
    return y + size + 5;
  }

  function cardHeight(f, card, width, size) {
    size = size || 9.4;
    const nl = f.wrap(tokenize(card[0], "serifsemi"), 12, width);
    let h = nl.length * 15.5 + 13.5;
    const dl = f.wrap(tokenize(card[3]), size, width);
    h += dl.length * (size * 1.45) + 12;
    return h;
  }
  function drawCard(f, doc, card, x, y, width, size) {
    size = size || 9.4;
    const lines = f.wrap(tokenize(card[0], "serifsemi"), 12, width);
    let yy = y;
    for (const line of lines) {
      let cx = x;
      for (const [w] of line) {
        setF(doc, DF.semi); doc.setFontSize(12);
        setC(doc, (w.startsWith("[") || w.endsWith("]")) ? TERRA : INK);
        const ww = doc.getTextWidth(w);
        doc.text(w, cx, yy + 11);
        cx += ww + f.width(" ", "serifsemi", 12);
      }
      yy += 15.5;
    }
    doc.setFont("intersemi", "normal"); doc.setFontSize(7.4); setC(doc, GOLD_TX);
    const catT = card[1].toUpperCase();
    doc.text(catT, x, yy + 7.5);
    const cw = doc.getTextWidth(catT) + 7;
    doc.setFontSize(8.2); setC(doc, TERRA);
    doc.text(card[2], x + cw, yy + 7.5);
    setC(doc, INK);
    yy += 13.5;
    const dl = f.wrap(tokenize(card[3]), size, width);
    yy = f.drawLines(dl, x, yy, size, size * 1.45);
    yy += 5;
    doc.setDrawColor(HAIR[0], HAIR[1], HAIR[2]); doc.setLineWidth(0.6);
    doc.line(x, yy, x + width, yy);
    return yy + 7;
  }
  function renderCards(f, doc, cards, x, y, width, measure) {
    const colw = (width - 16) / 2;
    const cols = [y, y], xs = [x, x + colw + 16];
    for (const card of cards) {
      const c = cols[0] <= cols[1] ? 0 : 1;
      const h = cardHeight(f, card, colw);
      if (!measure) drawCard(f, doc, card, xs[c], cols[c], colw);
      cols[c] += h;
    }
    return Math.max(cols[0], cols[1]) + 2;
  }

  function renderBlocks(f, doc, blocks, x, y, width, size, measure) {
    const lh = size * 1.52;
    for (const b of blocks) {
      const kind = b.t;
      if (kind === "intro") {
        y = f.para(b.x, x, y, width, { size: size + 0.4, lh: lh + 1, base: "ital", color: MUTE, space_after: 10, measure });
      } else if (kind === "subhead") {
        if (!measure) y = label(f, doc, b.x, x, y + 3, 8.6, false);
        else y += 3 + 8.6 + 5;
        y += 1;
      } else if (kind === "para") {
        y = f.para(b.x, x, y, width, { size, lh, space_after: 7, measure });
      } else if (kind === "bullets") {
        for (const it of b.x) {
          const lines = f.wrap(tokenize(it), size, width - 16);
          if (!measure) {
            doc.setFillColor(TERRA[0], TERRA[1], TERRA[2]);
            doc.rect(x + 1, y + size * 0.42, 4.2, 4.2, "F");
            f.drawLines(lines, x + 16, y, size, lh);
          }
          y += lines.length * lh + 2.5;
        }
        y += 5;
      } else if (kind === "numbers") {
        b.x.forEach((it, i) => {
          const lines = f.wrap(tokenize(it), size, width - 22);
          if (!measure) {
            setF(doc, DF.semi); doc.setFontSize(size + 1.5); setC(doc, TERRA);
            doc.text((i + 1) + ".", x, y + size * 0.95);
            setC(doc, INK);
            f.drawLines(lines, x + 22, y, size, lh);
          }
          y += lines.length * lh + 2.5;
        });
        y += 5;
      } else if (kind === "checks") {
        for (const it of b.x) {
          const lines = f.wrap(tokenize(it), size, width - 20);
          if (!measure) {
            doc.setDrawColor(TERRA[0], TERRA[1], TERRA[2]); doc.setLineWidth(1.1);
            doc.rect(x + 0.5, y + 1.5, 8.5, 8.5, "D");
            f.drawLines(lines, x + 20, y, size, lh);
          }
          y += lines.length * lh + 3.5;
        }
        y += 5;
      } else if (kind === "kv") {
        for (const [lab, val] of b.x) {
          const vlines = f.wrap(tokenize(val), size, width - 168);
          if (!measure) {
            label(f, doc, lab, x, y + 1, 7.8, false);
            f.drawLines(vlines, x + 168, y, size, lh);
            const yy = y + Math.max(vlines.length * lh, 13);
            doc.setDrawColor(HAIR[0], HAIR[1], HAIR[2]); doc.setLineWidth(0.6);
            doc.line(x, yy + 1.5, x + width, yy + 1.5);
          }
          y += Math.max(vlines.length * lh, 13) + 5.5;
        }
        y += 4;
      } else if (kind === "callout") {
        const hh = renderBlocks(f, doc, b.x, x + 16, y, width - 32, size, true) - y;
        const total = hh + 20; // matches the v2 engine's callout height exactly
        if (!measure) {
          doc.setFillColor(SAGE_TINT[0], SAGE_TINT[1], SAGE_TINT[2]);
          doc.rect(x, y, width, total, "F");
          doc.setFillColor(TERRA[0], TERRA[1], TERRA[2]);
          doc.rect(x, y, 3, total, "F");
          let yy = y + 11;
          if (b.title) yy = label(f, doc, b.title, x + 16, yy, 8.4, false) + 1;
          renderBlocks(f, doc, b.x, x + 16, yy, width - 32, size, false);
        }
        y += total + 9;
      } else if (kind === "cards") {
        y = renderCards(f, doc, b.x, x, y, width, measure);
      }
    }
    return y;
  }

  /* ---------- substitution: enter once, fill everywhere ---------- */
  function sanitize(v) {
    if (v == null) return "";
    return String(v).replace(/[\n\r]/g, " ").replace(/\[/g, "(").replace(/\]/g, ")")
      .replace(/"/g, "'").replace(/\\/g, "/").trim();
  }

  function substituteBook(values) {
    const book = JSON.parse(JSON.stringify(window.BOOK));
    const F = window.FIELDS;
    const vals = {};
    const keyByPh = {};
    for (const step of F.steps) for (const f of step.fields) {
      const v = sanitize(values[f.key]);
      if (v) vals[f.key] = v;
      for (const ph of f.ph) keyByPh[ph] = f.key;
    }
    const subText = (s) => {
      if (typeof s !== "string") return s;
      let out = s;
      if (vals.parking) out = out.replace(/\[Parking Instructions, for example:[^\n]*\]/g, vals.parking);
      if (vals.city) out = out.replace(/\[Tap Water Answer, for example:[^\n]*\]/g, "Tap water is safe to drink in " + vals.city);
      const pairs = [];
      for (const ph in keyByPh) if (vals[keyByPh[ph]]) pairs.push([ph, vals[keyByPh[ph]]]);
      pairs.sort((a, b) => b[0].length - a[0].length);
      for (const [ph, v] of pairs) out = out.split(ph).join(v);
      return out;
    };
    // local picks: card-scoped
    const picksIn = values.picks || {};
    const pickByPh = {};
    for (const p of F.picks) {
      const pin = picksIn[p.key] || {};
      const name = sanitize(pin.name);
      if (name) pickByPh[p.name_ph] = {
        name, distance: sanitize(pin.distance), description: sanitize(pin.description),
        order: sanitize(pin.order), hours: sanitize(pin.hours),
      };
    }
    for (const page of book.pages) {
      page.headline = subText(page.headline);
      for (const b of page.blocks) {
        if (b.t === "intro" || b.t === "para" || b.t === "subhead") b.x = subText(b.x);
        else if (b.t === "bullets" || b.t === "numbers" || b.t === "checks") b.x = b.x.map(subText);
        else if (b.t === "kv") b.x = b.x.map(([l, v]) => [l, subText(v)]);
        else if (b.t === "callout") for (const inner of b.x) {
          if (inner.t === "para") inner.x = subText(inner.x);
          if (inner.t === "numbers") inner.x = inner.x.map(subText);
        }
        else if (b.t === "cards") {
          b.x = b.x.map((card) => {
            const pv = pickByPh[card[0]];
            if (pv) {
              let desc = card[3];
              if (pv.description) desc = desc.replace(/\[Short Description[^\]]*\]/g, pv.description);
              if (pv.order) desc = desc.split("[Favorite Order]").join(pv.order);
              if (pv.hours) desc = desc.split("[Hours]").join(pv.hours);
              return [pv.name, card[1], pv.distance || card[2], subText(desc)];
            }
            return [subText(card[0]), card[1], subText(card[2]), subText(card[3])];
          });
        }
      }
    }
    return book;
  }

  /* ======================================================================
     COVERS. Each cover is a function that builds a vector scene in PDF
     points (612 x 792, y down). The same scene draws into jsPDF for the
     book and into SVG for the app, with identical text metrics (both use
     jsPDF's font measurement), so the gallery is a true preview.
     ====================================================================== */
  const mix = (a, b, t) => a.map((x, i) => Math.round(x + (b[i] - x) * t));
  const K = 0.5523;

  // font roles available to covers
  function roleFont(theme, role) {
    const p = theme.pdf;
    return ({
      display: p.reg, displayI: p.ital, displayS: p.semi,
      sans: ["inter", "normal"], sansS: ["intersemi", "normal"], sansB: ["inter", "bold"], sansI: ["inter", "italic"],
    })[role];
  }
  function roleCss(theme, role) {
    const c = theme.css;
    if (role === "display") return [c.display, c.reg, "normal"];
    if (role === "displayI") return [c.display, c.reg, c.italic ? "italic" : "normal"];
    if (role === "displayS") return [c.display, c.semi, "normal"];
    return ["Inter", { sans: 400, sansS: 600, sansB: 700, sansI: 400 }[role], role === "sansI" ? "italic" : "normal"];
  }

  class Scene {
    constructor(theme, measureDoc) {
      this.theme = theme; this.doc = measureDoc; this.items = [];
    }
    w(str, role, size, cs) {
      const f = roleFont(this.theme, role);
      this.doc.setFont(f[0], f[1]); this.doc.setFontSize(size);
      return this.doc.getTextWidth(str) + (cs || 0) * Math.max(0, str.length - 1);
    }
    rect(x, y, w, h, o) { this.items.push(Object.assign({ t: "rect", x, y, w, h }, o)); }
    circle(cx, cy, r, o) { this.items.push(Object.assign({ t: "circle", cx, cy, r }, o)); }
    path(d, o) { this.items.push(Object.assign({ t: "path", d }, o)); }
    text(s, x, y, role, size, fill, o) {
      this.items.push(Object.assign({ t: "text", s: String(s), x, y, role, size, fill }, o));
    }
    // align: "L" | "C" | "R" around x (C: x is the centre, R: x is the right edge)
    textA(s, x, y, role, size, fill, align, o) {
      const cs = (o && o.cs) || 0;
      const w = this.w(String(s), role, size, cs);
      const lx = align === "C" ? x - w / 2 : align === "R" ? x - w : x;
      this.text(s, lx, y, role, size, fill, o);
      return w;
    }
    // fit text into <= maxLines lines of <= width, largest size first;
    // lines are balanced so a two-line name never strands a short word.
    fit(str, role, maxSize, minSize, width, maxLines, o) {
      o = o || {};
      const csr = o.csr || 0;
      const words = String(str).split(/\s+/).filter(Boolean);
      const wrapAt = (size, width) => {
        const cs = size * csr, lines = []; let cur = "";
        for (const wd of words) {
          const tryS = cur ? cur + " " + wd : wd;
          if (cur && this.w(tryS, role, size, cs) > width) { lines.push(cur); cur = wd; } else cur = tryS;
        }
        if (cur) lines.push(cur);
        return lines;
      };
      const ok = (lines, size) => lines.every((l) => this.w(l, role, size, size * csr) <= width + 0.01);
      let size = maxSize, lines = wrapAt(size, width);
      const maxH = o.maxH || Infinity, lhr = o.lh || 1.1;
      for (; size >= minSize; size -= 1) {
        lines = wrapAt(size, width);
        if (lines.length <= maxLines && ok(lines, size) && lines.length * size * lhr <= maxH) break;
      }
      if (size < minSize) { size = minSize; lines = wrapAt(size, width); }
      // balance: shrink the wrap width while the line count holds
      if (lines.length > 1) {
        let lo = width * 0.4, hi = width;
        for (let i = 0; i < 12; i++) {
          const mid = (lo + hi) / 2, l2 = wrapAt(size, mid);
          if (l2.length === lines.length && ok(l2, size)) hi = mid; else lo = mid;
        }
        const l2 = wrapAt(size, hi);
        if (l2.length === lines.length) lines = l2;
      }
      return { size, lines, lh: size * lhr, cs: size * csr };
    }
    // draw a fitted block; y is the first baseline
    block(fb, x, y, role, fill, align, o) {
      fb.lines.forEach((l, i) => this.textA(l, x, y + i * fb.lh, role, fb.size, fill, align, Object.assign({ cs: fb.cs }, o)));
      return y + (fb.lines.length - 1) * fb.lh;
    }
  }

  // path helpers (absolute coords). d = [["M",x,y],["L",x,y],["C",x1,y1,x2,y2,x,y],["Z"]]
  function archPath(cx, cy, r, yBottom) {
    return [["M", cx - r, yBottom], ["L", cx - r, cy],
      ["C", cx - r, cy - K * r, cx - K * r, cy - r, cx, cy - r],
      ["C", cx + K * r, cy - r, cx + r, cy - K * r, cx + r, cy],
      ["L", cx + r, yBottom], ["Z"]];
  }
  function wavePath(yTop, amp, wl, phase, yBottom) {
    const d = [["M", -10, yBottom], ["L", -10, yTop]];
    let x = -10 - phase;
    d.push(["L", x, yTop]);
    let up = true;
    while (x < PW + 10) {
      const nx = x + wl / 2, a = up ? -amp : amp;
      d.push(["C", x + wl / 6, yTop + a, nx - wl / 6, yTop + a, nx, yTop]);
      x = nx; up = !up;
    }
    d.push(["L", x, yBottom], ["Z"]);
    return d;
  }
  function pinePath(cx, base, h, w) {
    // apex, three stepped tiers, a short trunk, mirrored
    const trunkH = h * 0.08, top = base - h, body = h - trunkH;
    const R = [];
    [[0.36, 0.5], [0.67, 0.76], [1.0, 1.0]].forEach(([yf, wf], i) => {
      const y = top + body * yf, hw = (w / 2) * wf;
      R.push([cx + hw, y]);
      if (i < 2) R.push([cx + hw * 0.48, y]);
    });
    const d = [["M", cx, top]];
    for (const [x, y] of R) d.push(["L", x, y]);
    const tw = Math.max(w * 0.06, 1.5);
    d.push(["L", cx + tw, base - trunkH], ["L", cx + tw, base], ["L", cx - tw, base], ["L", cx - tw, base - trunkH]);
    for (const [x, y] of R.slice().reverse()) d.push(["L", 2 * cx - x, y]);
    d.push(["Z"]);
    return d;
  }
  function initials(name) {
    const stop = /^(the|a|an|at|of|on|by|and|la|le|el)$/i;
    const ws = String(name).split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));
    const sig = ws.filter((w) => !stop.test(w));
    const pick = (sig.length ? sig : ws).slice(0, 2).map((w) => w.replace(/[^A-Za-z0-9]/g, "")[0] || "");
    return (pick.join("") || "H").toUpperCase();
  }

  function coverInfo(v) {
    const name = v.property_name || "Your Place";
    const place = [v.city, v.state].filter(Boolean).join(", ");
    const addr = [v.street_address, v.city, v.state].filter(Boolean).join(", ");
    return { name, place, addr, host: v.host_name || "", season: v.season || "" };
  }

  const COVERS = [
    { id: "editorial", name: "Classic Editorial", blurb: "Deep ink, a giant initial and a gold rule", draw: coverEditorial },
    { id: "colorblock", name: "Bold Colorblock", blurb: "Oversized type on big fields of color", draw: coverColorblock },
    { id: "coastal", name: "Coastal", blurb: "A low sun over rolling water", draw: coverCoastal },
    { id: "cabin", name: "Cabin Badge", blurb: "Night sky, pines and a ribbon badge", draw: coverCabin },
    { id: "luxe", name: "Minimal Luxe", blurb: "Hairline frame, spaced capitals, quiet gold", draw: coverLuxe },
    { id: "arch", name: "Sunset Arch", blurb: "A retro rainbow arch, warm and sunny", draw: coverArch },
  ];
  const coverById = (id) => COVERS.find((c) => c.id === id) || COVERS[0];

  function coverEditorial(S, c, v) {
    const I = coverInfo(v);
    S.rect(0, 0, PW, PH, { fill: c.ink });
    // giant ghost initial, bleeding off the right edge
    const ini = initials(I.name)[0];
    const gw = S.w(ini, "display", 600);
    S.text(ini, PW - gw * 0.78, 500, "display", 600, c.onInk, { opacity: 0.06 });
    S.rect(24, 24, PW - 48, PH - 48, { stroke: c.gold, lw: 0.6, opacity: 0.55 });
    // monogram from the property's own initials
    S.rect(MARG, MARG, 48, 48, { stroke: c.gold, lw: 1 });
    const mono = initials(I.name);
    const a = mono[0], b = mono[1] || "";
    const wa = S.w(a, "display", 19), wb = b ? S.w(b, "display", 19) : 0;
    let mx = MARG + 24 - (wa + wb + (b ? 1 : 0)) / 2;
    S.text(a, mx, MARG + 31, "display", 19, c.onInk);
    if (b) S.text(b, mx + wa + 1, MARG + 31, "display", 19, c.accent);
    S.textA("GUEST GUIDE", PW - MARG, MARG + 20, "sansS", 8, c.gold, "R", { cs: 2.4 });
    if (I.season) S.textA(I.season.toUpperCase(), PW - MARG, MARG + 34, "sans", 8, c.onInkSoft, "R", { cs: 1.6 });
    // bottom-anchored title stack
    const fb = S.fit(I.name, "display", 68, 30, CW, 3, { lh: 1.04 });
    const tagY = 628, ruleY = tagY - 34, lastBase = ruleY - 26;
    const firstBase = lastBase - (fb.lines.length - 1) * fb.lh;
    S.textA("WELCOME TO", MARG, firstBase - fb.size * 0.92 - 14, "sansS", 9.5, c.gold, "L", { cs: 2.6 });
    S.block(fb, MARG, firstBase, "display", c.onInk, "L");
    S.rect(MARG, ruleY, 120, 1.4, { fill: c.gold });
    S.text("Your guide to a comfortable stay", MARG, tagY, "displayI", 16.5, c.onInkSoft);
    // editorial footer
    S.rect(MARG, 668, CW, 0.6, { fill: c.gold, opacity: 0.45 });
    if (I.addr) {
      S.textA("WHERE", MARG, 692, "sansS", 7.5, c.gold, "L", { cs: 1.8 });
      S.block(S.fit(I.addr, "sans", 10.5, 7.5, 250, 2, { lh: 1.35 }), MARG, 709, "sans", c.onInk, "L");
    }
    S.textA("YOUR HOSTS", 340, 692, "sansS", 7.5, c.gold, "L", { cs: 1.8 });
    const hf = S.fit(I.host ? "Prepared with care by " + I.host : "Prepared with care for you", "sans", 10.5, 7.5, 218, 2, { lh: 1.35 });
    S.block(hf, 340, 709, "sans", c.onInk, "L");
  }

  function coverColorblock(S, c, v) {
    const I = coverInfo(v);
    S.rect(0, 0, PW, PH, { fill: c.paper });
    S.rect(0, 0, PW, 520, { fill: c.accent });
    S.textA("WELCOME TO", MARG, 96, "sansB", 11, c.ink, "L", { cs: 3 });
    const words = I.name.split(/\s+/).filter(Boolean);
    const fb = S.fit(I.name, "displayS", 150, 40, CW, Math.min(Math.max(words.length, 1), 4), { lh: 0.94, maxH: 330 });
    const last = 452, first = last - (fb.lines.length - 1) * fb.lh;
    S.block(fb, MARG - fb.size * 0.04, first, "displayS", c.ink, "L");
    // sticker circle straddling the color edge
    S.circle(482, 548, 84, { fill: c.accent2 });
    S.circle(482, 548, 72, { stroke: c.paper, lw: 1, opacity: 0.6 });
    S.textA("GUEST", 482, 545, "sansB", 13, c.paper, "C", { cs: 3 });
    S.textA("GUIDE", 482, 563, "sansB", 13, c.paper, "C", { cs: 3 });
    S.circle(392, 612, 13, { fill: c.gold });
    S.rect(MARG, 566, 46, 6, { fill: c.ink });
    S.text("Your guide to a", MARG, 612, "displayI", 25, c.ink);
    S.text("comfortable stay", MARG, 642, "displayI", 25, c.ink);
    S.rect(0, 708, PW, 84, { fill: c.ink });
    if (I.addr) S.block(S.fit(I.addr, "sansS", 10, 7.5, 300, 1), MARG, 755, "sansS", c.onInk, "L");
    if (I.host) S.textA("Hosted by " + I.host, PW - MARG, 755, "sans", 10, c.onInkSoft, "R");
  }

  function coverCoastal(S, c, v) {
    const I = coverInfo(v);
    S.rect(0, 0, PW, PH, { fill: c.paper });
    // sun + halo rings
    S.circle(306, 452, 210, { stroke: c.gold, lw: 1, opacity: 0.22 });
    S.circle(306, 452, 172, { stroke: c.gold, lw: 1.4, opacity: 0.45 });
    S.circle(306, 452, 132, { fill: c.gold });
    // gulls
    for (const [x, y, s] of [[424, 350, 1], [454, 368, 0.72], [192, 372, 0.62]]) {
      S.path([["M", x - 12 * s, y], ["C", x - 8 * s, y - 7 * s, x - 3 * s, y - 6 * s, x, y],
        ["C", x + 3 * s, y - 6 * s, x + 8 * s, y - 7 * s, x + 12 * s, y]], { stroke: c.ink, lw: 1.5, opacity: 0.55 });
    }
    // rolling water, light to deep
    const sea = c.accent2;
    const bands = [
      [452, 9, 150, 10, mix(sea, c.paper, 0.62)], [500, 11, 190, 60, mix(sea, c.paper, 0.38)],
      [566, 12, 230, 20, sea], [652, 13, 260, 90, mix(sea, c.ink, 0.38)],
    ];
    for (const [y, a, wl, ph, col] of bands) S.path(wavePath(y, a, wl, ph, PH + 10), { fill: col });
    S.textA("WELCOME TO", 306, 100, "sansS", 9.5, c.ink, "C", { cs: 3.2, opacity: 0.75 });
    const fb = S.fit(I.name, "display", 60, 28, 480, 2, { lh: 1.06 });
    const yEnd = S.block(fb, 306, 132 + fb.size * 0.78, "display", c.ink, "C");
    S.textA("Your guide to a comfortable stay", 306, yEnd + 36, "displayI", 16, c.ink, "C", { opacity: 0.8 });
    if (I.addr) S.block(S.fit(I.addr, "sansS", 10, 7.5, 460, 1), 306, 724, "sansS", c.paper, "C", { cs: 0.4 });
    if (I.host) S.textA("Hosted with care by " + I.host, 306, 744, "sans", 9.5, c.paper, "C", { opacity: 0.82 });
  }

  function coverCabin(S, c, v) {
    const I = coverInfo(v);
    S.rect(0, 0, PW, PH, { fill: c.ink });
    // stars and a crescent moon
    const stars = [[96, 92, 1.6], [168, 150, 1], [232, 76, 1.3], [318, 118, 0.9], [402, 70, 1.5], [520, 178, 1.1],
      [90, 228, 1.1], [548, 300, 1.4], [70, 380, 0.9], [560, 440, 1], [140, 520, 1.2], [470, 210, 0.8], [372, 160, 1.2]];
    for (const [x, y, r] of stars) S.circle(x, y, r, { fill: c.gold, opacity: 0.8 });
    S.circle(486, 112, 22, { fill: c.gold });
    S.circle(496, 104, 20, { fill: c.ink });
    // badge
    const bx = 306, by = 344;
    S.circle(bx, by, 156, { fill: mix(c.ink, c.accent2, 0.22) });
    S.circle(bx, by, 156, { stroke: c.gold, lw: 2.2 });
    S.circle(bx, by, 145, { stroke: c.gold, lw: 0.7, opacity: 0.7 });
    S.path(pinePath(bx, by - 92, 34, 26), { fill: c.gold });
    S.textA("WELCOME TO", bx, by - 66, "sansB", 9, c.gold, "C", { cs: 3 });
    // ribbon with the name
    const fb = S.fit(I.name, "displayS", 40, 18, 330, 2, { lh: 1.08 });
    const maxW = Math.max.apply(null, fb.lines.map((l) => S.w(l, "displayS", fb.size, fb.cs)));
    const rw = Math.min(Math.max(maxW + 64, 240), 420), rh = fb.lines.length * fb.lh + 24;
    const rx = bx - rw / 2, ry = by - rh / 2 + 4;
    const dark = mix(c.accent, c.ink, 0.4);
    for (const s of [-1, 1]) {
      const ex = s < 0 ? rx - 34 : rx + rw + 34, ix = s < 0 ? rx + 10 : rx + rw - 10;
      S.path([["M", ix, ry + 12], ["L", ex, ry + 12], ["L", ex + s * -14, ry + 12 + rh / 2], ["L", ex, ry + 12 + rh],
        ["L", ix, ry + 12 + rh], ["Z"]], { fill: dark });
    }
    S.rect(rx, ry, rw, rh, { fill: c.accent });
    S.rect(rx + 5, ry + 5, rw - 10, rh - 10, { stroke: c.onInk, lw: 0.6, opacity: 0.45 });
    S.block(fb, bx, ry + 12 + fb.size * 0.8, "displayS", c.onInk, "C");
    if (I.place) S.textA(I.place.toUpperCase(), bx, ry + rh + 34, "sansB", 9, c.onInk, "C", { cs: 2.6 });
    S.textA("A GUIDE FOR OUR GUESTS", bx, ry + rh + 52, "sans", 7.5, c.onInkSoft, "C", { cs: 2 });
    // forest
    const back = mix(c.ink, c.accent2, 0.5), front = mix(c.ink, c.accent2, 0.26);
    const trees1 = [[30, 150], [78, 118], [128, 164], [184, 128], [246, 104], [300, 138], [356, 110], [414, 150], [470, 120], [522, 160], [580, 126]];
    for (const [x, h] of trees1) S.path(pinePath(x, 742, h, h * 0.62), { fill: back });
    const trees2 = [[54, 104], [104, 82], [158, 118], [222, 90], [278, 70], [332, 96], [392, 84], [446, 112], [500, 88], [556, 116]];
    for (const [x, h] of trees2) S.path(pinePath(x, 748, h, h * 0.62), { fill: front });
    S.rect(0, 734, PW, 58, { fill: mix(c.ink, [0, 0, 0], 0.25) });
    S.textA(I.host ? "Prepared with care by " + I.host : "Prepared with care for you", bx, 753, "sansI", 9.5, c.onInkSoft, "C");
    S.rect(22, 22, PW - 44, PH - 44, { stroke: c.gold, lw: 1.2 });
    S.rect(29, 29, PW - 58, PH - 58, { stroke: c.gold, lw: 0.5, opacity: 0.6 });
  }

  function coverLuxe(S, c, v) {
    const I = coverInfo(v);
    S.rect(0, 0, PW, PH, { fill: c.paper });
    S.rect(34, 34, PW - 68, PH - 68, { stroke: c.gold, lw: 0.7 });
    S.rect(40, 40, PW - 80, PH - 80, { stroke: c.gold, lw: 0.35, opacity: 0.8 });
    // diamond and flanking hairlines
    S.path([["M", 306, 150], ["L", 312, 156], ["L", 306, 162], ["L", 300, 156], ["Z"]], { fill: c.gold });
    S.rect(236, 155.6, 52, 0.7, { fill: c.gold });
    S.rect(324, 155.6, 52, 0.7, { fill: c.gold });
    // gold roundel monogram
    S.circle(306, 236, 38, { stroke: c.gold, lw: 0.8 });
    S.circle(306, 236, 33, { stroke: c.gold, lw: 0.35 });
    S.textA(initials(I.name), 306, 244, "displayI", 24, c.goldTx, "C", { cs: 0.5 });
    S.textA("WELCOME TO", 306, 340, "sans", 9, c.mute, "C", { cs: 4.6 });
    const fb = S.fit(I.name.toUpperCase(), "display", 50, 18, 440, 3, { lh: 1.2, csr: 0.12 });
    const yEnd = S.block(fb, 306, 356 + fb.size * 0.82, "display", c.ink, "C");
    S.rect(282, yEnd + 32, 48, 0.9, { fill: c.gold });
    S.textA("A guide to your stay", 306, yEnd + 70, "displayI", 19, c.mute, "C");
    if (I.place) S.textA(I.place.toUpperCase(), 306, 668, "sansS", 8.5, c.ink, "C", { cs: 3.4 });
    if (I.host) S.textA(("Hosted by " + I.host).toUpperCase(), 306, 688, "sans", 7.5, c.mute, "C", { cs: 2.6 });
    S.path([["M", 306, 702], ["L", 310, 706], ["L", 306, 710], ["L", 302, 706], ["Z"]], { fill: c.gold });
  }

  function coverArch(S, c, v) {
    const I = coverInfo(v);
    S.rect(0, 0, PW, PH, { fill: c.paper });
    const cx = 306, cy = 316, base = 548;
    const cols = [c.accent, mix(c.accent, c.gold, 0.5), c.gold, mix(c.gold, c.paper, 0.55), c.paper];
    let r = 180;
    for (const col of cols) { S.path(archPath(cx, cy, r, base), { fill: col }); r -= 26; }
    // half sun sitting on the horizon inside the arch
    const sr = 38;
    S.path([["M", cx - sr, base], ["C", cx - sr, base - K * sr, cx - K * sr, base - sr, cx, base - sr],
      ["C", cx + K * sr, base - sr, cx + sr, base - K * sr, cx + sr, base], ["Z"]], { fill: c.accent });
    S.rect(MARG, base, CW, 2, { fill: c.ink });
    // little sparkles
    for (const [x, y, s] of [[104, 186, 9], [520, 236, 7], [470, 120, 5]]) {
      S.path([["M", x, y - s], ["L", x + s * 0.25, y - s * 0.25], ["L", x + s, y], ["L", x + s * 0.25, y + s * 0.25],
        ["L", x, y + s], ["L", x - s * 0.25, y + s * 0.25], ["L", x - s, y], ["L", x - s * 0.25, y - s * 0.25], ["Z"]], { fill: c.accent });
    }
    S.textA("WELCOME TO", cx, 598, "sansB", 9.5, c.accent, "C", { cs: 3.2 });
    const fb = S.fit(I.name, "displayS", 54, 24, 500, 2, { lh: 1.04 });
    const yEnd = S.block(fb, cx, 612 + fb.size * 0.8, "displayS", c.ink, "C");
    const sub = [I.place, I.host ? "hosted by " + I.host : ""].filter(Boolean).join("  ·  ") || "Your guide to a comfortable stay";
    const sf = S.fit(sub, "sans", 10.5, 7.5, 480, 1);
    S.block(sf, cx, Math.min(yEnd + 30, 750), "sans", c.mute, "C");
  }

  /* ---------- scene renderers ---------- */
  const gsCache = new WeakMap();
  function opacityOn(doc, o) {
    let m = gsCache.get(doc);
    if (!m) { m = {}; gsCache.set(doc, m); }
    const k = String(o);
    if (!m[k]) m[k] = new doc.GState({ opacity: o, "stroke-opacity": o });
    doc.setGState(m[k]);
  }
  function drawScene(doc, scene) {
    for (const it of scene.items) {
      const op = it.opacity != null && it.opacity < 1;
      if (op) opacityOn(doc, it.opacity);
      if (it.fill) doc.setFillColor(it.fill[0], it.fill[1], it.fill[2]);
      if (it.stroke) { doc.setDrawColor(it.stroke[0], it.stroke[1], it.stroke[2]); doc.setLineWidth(it.lw || 1); }
      const style = it.fill && it.stroke ? "FD" : it.fill ? "F" : "S";
      if (it.t === "rect") doc.rect(it.x, it.y, it.w, it.h, style);
      else if (it.t === "circle") doc.circle(it.cx, it.cy, it.r, style);
      else if (it.t === "path") {
        doc.setLineJoin("round"); doc.setLineCap("round");
        const ops = it.d.map((p) => p[0] === "M" ? { op: "m", c: [p[1], p[2]] } : p[0] === "L" ? { op: "l", c: [p[1], p[2]] }
          : p[0] === "C" ? { op: "c", c: p.slice(1) } : { op: "h", c: [] });
        doc.path(ops);
        if (style === "F") doc.fill(); else if (style === "S") doc.stroke(); else doc.fillStroke();
        doc.setLineJoin("miter"); doc.setLineCap("butt");
      } else if (it.t === "text") {
        setF(doc, roleFont(scene.theme, it.role)); doc.setFontSize(it.size);
        doc.setTextColor(it.fill[0], it.fill[1], it.fill[2]);
        doc.text(it.s, it.x, it.y, it.cs ? { charSpace: it.cs } : undefined);
      }
      if (op) opacityOn(doc, 1);
    }
  }
  const rgb = (c) => "rgb(" + c.join(",") + ")";
  const xesc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  function sceneToSVG(scene, attrs) {
    const n = (x) => Math.round(x * 100) / 100;
    let out = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 792" ' + (attrs || "") + ">";
    for (const it of scene.items) {
      const op = it.opacity != null && it.opacity < 1 ? ' opacity="' + it.opacity + '"' : "";
      const paint = ' fill="' + (it.fill ? rgb(it.fill) : "none") + '"' +
        (it.stroke ? ' stroke="' + rgb(it.stroke) + '" stroke-width="' + (it.lw || 1) + '"' : "");
      if (it.t === "rect") out += '<rect x="' + n(it.x) + '" y="' + n(it.y) + '" width="' + n(it.w) + '" height="' + n(it.h) + '"' + paint + op + "/>";
      else if (it.t === "circle") out += '<circle cx="' + n(it.cx) + '" cy="' + n(it.cy) + '" r="' + n(it.r) + '"' + paint + op + "/>";
      else if (it.t === "path") out += '<path d="' + it.d.map((p) => p[0] + (p.length > 1 ? p.slice(1).map(n).join(" ") : "")).join("") +
        '"' + paint + ' stroke-linejoin="round" stroke-linecap="round"' + op + "/>";
      else if (it.t === "text") {
        const [fam, wt, st] = roleCss(scene.theme, it.role);
        out += '<text x="' + n(it.x) + '" y="' + n(it.y) + "\" font-family=\"'" + fam + "'\" font-size=\"" + it.size +
          '" font-weight="' + wt + '" font-style="' + st + '" fill="' + rgb(it.fill) + '"' +
          (it.cs ? ' letter-spacing="' + n(it.cs) + '"' : "") + op + ' style="white-space:pre">' + xesc(it.s) + "</text>";
      }
    }
    return out + "</svg>";
  }

  let measureDoc = null;
  function getMeasureDoc() {
    if (!measureDoc) {
      const { jsPDF } = window.jspdf;
      measureDoc = new jsPDF({ unit: "pt", format: "letter" });
      registerFonts(measureDoc, null);
    }
    return measureDoc;
  }
  function buildCover(values, doc, fallbackName) {
    const theme = themeById(values.theme), cover = coverById(values.cover);
    const c = {};
    for (const k in theme.c) c[k] = hex(theme.c[k]);
    const S = new Scene(theme, doc || getMeasureDoc());
    const v = cleanValues(values);
    if (!v.property_name && fallbackName) v.property_name = fallbackName;
    cover.draw(S, c, v);
    return S;
  }
  // SVG of a cover for the app (values may be partial; empty name shows "Your Place")
  function coverSVG(values, attrs) { return sceneToSVG(buildCover(values), attrs); }

  function backCover(doc, v) {
    doc.addPage(); bg(doc, INK);
    let y = 268;
    doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.rect((PW - 120) / 2, y, 120, 1.4, "F");
    y += 30;
    setF(doc, DF.reg); doc.setFontSize(24); setC(doc, ON_INK);
    const t = "We are here if you need us";
    doc.text(t, (PW - doc.getTextWidth(t)) / 2, y + 22);
    y += 58;
    const addr = [v.street_address, v.city, v.state, v.zip].filter(Boolean).join(", ");
    for (const [txt, sz, col, fam] of [
      [v.property_name || "[Property Name]", 13, TERRA, DF.semi],
      [addr || "[Street Address], [City], [State] [ZIP]", 11, ON_INK_SOFT, ["inter", "normal"]],
    ]) {
      setF(doc, fam); doc.setFontSize(sz); setC(doc, col);
      doc.text(txt, (PW - doc.getTextWidth(txt)) / 2, y + sz);
      y += sz + 12;
    }
    y += 8;
    for (const [lab, val] of [
      ["Host", v.host_name || "[Host Name]"], ["Phone", v.host_phone || "[Host Phone]"],
      ["Email", v.host_email || "[Host Email]"], ["Website", v.host_website || "[Host Website]"],
      ["WiFi", (v.wifi_network || "[WiFi Network]") + "  /  " + (v.wifi_password || "[WiFi Password]")],
    ]) {
      doc.setFont("intersemi", "normal"); doc.setFontSize(8); setC(doc, GOLD);
      doc.text(lab.toUpperCase(), PW / 2 - 118, y + 9);
      doc.setFont("inter", "normal"); doc.setFontSize(11); setC(doc, ON_INK);
      doc.text(val, PW / 2 - 52, y + 10);
      y += 21;
    }
    y += 14;
    setF(doc, DF.semi); doc.setFontSize(13); setC(doc, TERRA);
    const em = "Emergency: 911";
    doc.text(em, (PW - doc.getTextWidth(em)) / 2, y + 12);
    y += 40;
    setF(doc, DF.ital); doc.setFontSize(12.5); setC(doc, ON_INK_SOFT);
    const th = "Thank you for choosing " + (v.property_name || "[Property Name]") + ".";
    doc.text(th, (PW - doc.getTextWidth(th)) / 2, y + 12);
    doc.setFont("intersemi", "normal"); doc.setFontSize(8.5); setC(doc, TERRA);
    const sw = "S T A Y   W E L L .";
    doc.text(sw, (PW - doc.getTextWidth(sw)) / 2, PH - 64, { charSpace: 2.2 });
    setC(doc, INK);
  }

  // Inter is always embedded; theme display faces only when that theme is
  // used (theme null = register everything, for the app's measuring doc).
  const FONT_REG = {
    _base: [["inter", "inter", "normal"], ["interB", "inter", "bold"], ["interI", "inter", "italic"],
      ["interMed", "intermed", "normal"], ["interSemi", "intersemi", "normal"]],
    heritage: [["fraunces", "fraunces", "normal"], ["frauncesB", "fraunces", "bold"], ["frauncesI", "fraunces", "italic"],
      ["frauncesSemi", "frauncessemi", "normal"]],
    sunwashed: [["dmserif", "dmserif", "normal"], ["dmserifI", "dmserif", "italic"]],
    timber: [["zilla", "zilla", "normal"], ["zillaI", "zilla", "italic"], ["zillaSemi", "zillasemi", "normal"]],
    noir: [["cormorant", "cormorant", "normal"], ["cormorantI", "cormorant", "italic"], ["cormorantB", "cormorantb", "normal"]],
    citrus: [["bricolage", "bricolage", "normal"], ["bricolageX", "bricolagex", "normal"]],
  };
  function registerFonts(doc, themeId) {
    const F = window.FONTS;
    const add = ([key, fam, style]) => { doc.addFileToVFS(F[key].file, F[key].b64); doc.addFont(F[key].file, fam, style); };
    FONT_REG._base.forEach(add);
    for (const t of THEMES) if (themeId == null || t.id === themeId) FONT_REG[t.id].forEach(add);
  }

  function cleanValues(values) {
    const v = {};
    for (const k in values) if (k !== "picks") v[k] = sanitize(values[k]);
    return v;
  }

  function generateBook(values) {
    const { jsPDF } = window.jspdf;
    const theme = themeById(values.theme);
    const doc = new jsPDF({ unit: "pt", format: "letter", compress: true });
    registerFonts(doc, theme.id);
    setTheme(theme);
    const book = substituteBook(values);
    const v = cleanValues(values);
    const f = new Flow(doc);
    const prop = v.property_name || "[Property Name]";
    for (const page of book.pages) {
      const n = page.n;
      if (n === 1) {
        doc.addPage();
        drawScene(doc, buildCover(values, doc, "[Property Name]"));
        setC(doc, INK);
        continue;
      }
      if (n === 32) { backCover(doc, v); continue; }
      const blocks = page.blocks;
      let chosen = null;
      for (const size of [10.5, 10.0, 9.6, 9.2]) {
        let yy = measureHeader(f, page.headline);
        yy = renderBlocks(f, doc, blocks.filter(b => b.t !== "emergency"), MARG, yy, CW, size, true);
        if (blocks.some(b => b.t === "emergency")) yy += 52;
        if (yy <= BOT) { chosen = size; break; }
      }
      const size = chosen || 9.2;
      doc.addPage(); bg(doc);
      let y = headerBlock(f, doc, book.kickers[n] || "", page.headline);
      if (n === 19) {
        setF(doc, DF.reg); doc.setFontSize(44); setC(doc, TERRA);
        doc.text("03", PW - MARG - 62, TOP + 6); setC(doc, INK);
      }
      if (n === 31) {
        doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]); doc.setLineWidth(1.0);
        doc.rect(30, 30, PW - 60, PH - 60, "D");
      }
      const real = [];
      for (const b of blocks) {
        if (b.t === "emergency") {
          doc.setFillColor(TERRA[0], TERRA[1], TERRA[2]);
          doc.rect(MARG, y, CW, 40, "F");
          setF(doc, DF.bold); doc.setFontSize(17); setC(doc, CREAM);
          doc.text("Emergency: call 911 first", MARG + 16, y + 27);
          setC(doc, INK);
          y += 52;
          continue;
        }
        real.push(b);
      }
      y = renderBlocks(f, doc, real, MARG, y, CW, size, false);
      footerNum(doc, n, prop);
    }
    // remove the initial blank page jsPDF creates
    if (doc.getNumberOfPages() === 33) doc.deletePage(1);
    return doc;
  }

  function measureHeader(f, headline) {
    let y = TOP + 16;
    const lines = f.wrap(tokenize(headline, "serif"), 27, CW);
    y += lines.length * 27 * 1.18 + 8;
    return y + 16;
  }

  window.HHK = {
    generateBook, substituteBook, sanitize, coverSVG, initials,
    THEMES: THEMES.map((t) => ({ id: t.id, name: t.name, blurb: t.blurb, css: t.css, c: t.c })),
    COVERS: COVERS.map((c) => ({ id: c.id, name: c.name, blurb: c.blurb })),
  };
})();

/* HavenHostKit — client-side book renderer.
   A faithful port of the v2 Python engine (build_v2.py) to jsPDF:
   same design system, same 32-page structure, same layout rules.
   Runs entirely in the browser. No data leaves the device. */
(function () {
  "use strict";
  const INK = [26, 46, 40], CREAM = [250, 246, 240], TERRA = [198, 123, 92],
        SAGE = [138, 155, 142], GOLD = [201, 168, 106], GOLD_TX = [160, 124, 62],
        SAGE_TINT = [233, 233, 226], HAIR = [206, 214, 204], MUTE = [92, 108, 100];
  const PW = 612, PH = 792, MARG = 54, CW = PW - 2 * MARG, TOP = 58, BOT = PH - 52;

  const STYLE_FONT = {
    reg: ["inter", "normal"], bold: ["inter", "bold"], ital: ["inter", "italic"],
    med: ["intermed", "normal"], semi: ["intersemi", "normal"],
    ph: ["intersemi", "normal"], phb: ["inter", "bold"],
    serif: ["fraunces", "normal"], serifb: ["fraunces", "bold"],
    serifi: ["fraunces", "italic"], serifsemi: ["frauncessemi", "normal"],
  };
  const STYLE_COLOR = { ph: TERRA, phb: TERRA };

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
        doc.setFont("fraunces", ital ? "italic" : "normal"); doc.setFontSize(headlineSize);
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
        doc.setFont("frauncessemi", "normal"); doc.setFontSize(12);
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
            doc.setFont("frauncessemi", "normal"); doc.setFontSize(size + 1.5); setC(doc, TERRA);
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

  function coverPage(doc, page, v) {
    doc.addPage(); bg(doc, INK);
    doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]); doc.setLineWidth(1.0);
    doc.rect(MARG, MARG, 46, 46, "D");
    doc.setFont("fraunces", "normal"); doc.setFontSize(17); setC(doc, CREAM);
    doc.text("H", MARG + 9, MARG + 30);
    setC(doc, TERRA); doc.text("K", MARG + 24, MARG + 30);
    let y = 448;
    doc.setFont("intersemi", "normal"); doc.setFontSize(9.5); setC(doc, GOLD_TX);
    doc.text("W E L C O M E   T O", MARG, y, { charSpace: 2.4 });
    y += 14;
    doc.setFont("fraunces", "normal"); doc.setFontSize(41); setC(doc, CREAM);
    const name = page.headline.replace(/^Welcome to\s*/, "");
    doc.text(name, MARG, y + 40);
    y += 62;
    doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]); doc.rect(MARG, y, 120, 1.4, "F");
    y += 26;
    doc.setFont("fraunces", "italic"); doc.setFontSize(15.5); doc.setTextColor(232, 226, 214);
    doc.text("Your Guide to a Comfortable Stay", MARG, y);
    y += 44;
    const f = new Flow(doc);
    y = f.para(v.property_name || "[Property Name]", MARG, y, CW, { size: 11, base: "serifsemi", color: TERRA, space_after: 2 });
    const addr = [v.street_address, v.city, v.state].filter(Boolean).join(", ");
    y = f.para(addr || "[Street Address], [City], [State]", MARG, y, CW, { size: 11, color: [214, 208, 196], space_after: 16 });
    y = f.para("Prepared with care for our guests by " + (v.host_name || "[Host Name]"), MARG, y, CW, { size: 10.5, color: [190, 184, 172], space_after: 2 });
    if (v.season) f.para("Season of your stay: " + v.season, MARG, y, CW, { size: 10.5, color: [190, 184, 172], space_after: 0 });
    setC(doc, INK);
  }

  function backCover(doc, v) {
    doc.addPage(); bg(doc, INK);
    let y = 268;
    doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.rect((PW - 120) / 2, y, 120, 1.4, "F");
    y += 30;
    doc.setFont("fraunces", "normal"); doc.setFontSize(24); setC(doc, CREAM);
    const t = "We are here if you need us";
    doc.text(t, (PW - doc.getTextWidth(t)) / 2, y + 22);
    y += 58;
    const addr = [v.street_address, v.city, v.state, v.zip].filter(Boolean).join(", ");
    for (const [txt, sz, col, fam] of [
      [v.property_name || "[Property Name]", 13, TERRA, "frauncessemi"],
      [addr || "[Street Address], [City], [State] [ZIP]", 11, [214, 208, 196], "inter"],
    ]) {
      doc.setFont(fam, "normal"); doc.setFontSize(sz); setC(doc, col);
      doc.text(txt, (PW - doc.getTextWidth(txt)) / 2, y + sz);
      y += sz + 12;
    }
    y += 8;
    for (const [lab, val] of [
      ["Host", v.host_name || "[Host Name]"], ["Phone", v.host_phone || "[Host Phone]"],
      ["Email", v.host_email || "[Host Email]"], ["Website", v.host_website || "[Host Website]"],
      ["WiFi", (v.wifi_network || "[WiFi Network]") + "  /  " + (v.wifi_password || "[WiFi Password]")],
    ]) {
      doc.setFont("intersemi", "normal"); doc.setFontSize(8); setC(doc, GOLD_TX);
      doc.text(lab.toUpperCase(), PW / 2 - 118, y + 9);
      doc.setFont("inter", "normal"); doc.setFontSize(11); setC(doc, CREAM);
      doc.text(val, PW / 2 - 52, y + 10);
      y += 21;
    }
    y += 14;
    doc.setFont("frauncessemi", "normal"); doc.setFontSize(13); setC(doc, TERRA);
    const em = "Emergency: 911";
    doc.text(em, (PW - doc.getTextWidth(em)) / 2, y + 12);
    y += 40;
    doc.setFont("fraunces", "italic"); doc.setFontSize(12.5); doc.setTextColor(214, 208, 196);
    const th = "Thank you for choosing " + (v.property_name || "[Property Name]") + ".";
    doc.text(th, (PW - doc.getTextWidth(th)) / 2, y + 12);
    doc.setFont("intersemi", "normal"); doc.setFontSize(8.5); setC(doc, TERRA);
    const sw = "S T A Y   W E L L .";
    doc.text(sw, (PW - doc.getTextWidth(sw)) / 2, PH - 64, { charSpace: 2.2 });
    setC(doc, INK);
  }

  function registerFonts(doc) {
    const F = window.FONTS;
    const add = (key, fam, style) => {
      doc.addFileToVFS(F[key].file, F[key].b64);
      doc.addFont(F[key].file, fam, style);
    };
    add("fraunces", "fraunces", "normal"); add("frauncesB", "fraunces", "bold");
    add("frauncesI", "fraunces", "italic"); add("frauncesSemi", "frauncessemi", "normal");
    add("frauncesSemiI", "frauncessemi", "italic");
    add("inter", "inter", "normal"); add("interB", "inter", "bold"); add("interI", "inter", "italic");
    add("interMed", "intermed", "normal"); add("interSemi", "intersemi", "normal");
  }

  function cleanValues(values) {
    const v = {};
    for (const k in values) if (k !== "picks") v[k] = sanitize(values[k]);
    return v;
  }

  function generateBook(values) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt", format: "letter", compress: true });
    registerFonts(doc);
    const book = substituteBook(values);
    const v = cleanValues(values);
    const f = new Flow(doc);
    const prop = v.property_name || "[Property Name]";
    for (const page of book.pages) {
      const n = page.n;
      if (n === 1) { coverPage(doc, page, v); continue; }
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
        doc.setFont("fraunces", "normal"); doc.setFontSize(44); setC(doc, TERRA);
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
          doc.setFont("fraunces", "bold"); doc.setFontSize(17); setC(doc, CREAM);
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

  window.HHK = { generateBook, substituteBook, sanitize };
})();

/* ============================================================
   app.js — shared chrome & behaviours for every page
   ============================================================ */

/* ---- config ----
   EDIT-MODE PASSPHRASE (stored as a SHA-256 hash so the literal word
   isn't in the source). Default passphrase is:  satwik-iisc
   To change it: run  echo -n "your-new-pass" | shasum -a 256
   and paste the hash below. NOTE: this is a deterrent, not real
   security on a static host — see README. The real gate is that only
   you can commit to the repository. */
const EDIT_HASH = "88f86a8293a4fb4d38985995662d409dad006cbf7ab054704112491558121651";

/* ---------------- icon set ---------------- */
const I = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .3.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-7-6.1 7H1.6l8.2-9.4L1 2h7l4.8 6.4Zm-2.4 18h1.9L7.6 4H5.6Z"/></svg>',
  cell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/><circle cx="7.5" cy="9" r="1.2" fill="currentColor" stroke="none" opacity=".5"/><circle cx="16" cy="15" r="1" fill="currentColor" stroke="none" opacity=".5"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>'
};

/* ---------------- generative H&E placeholder ----------------
   Deterministic "histology field" SVG so empty cards look like
   stained tissue, not generic stock imagery. */
function mulberry(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function strHash(str) { let h = 2166136261; for (let i = 0; i < (str||"x").length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function placeholderSVG(seed, w = 600, h = 380) {
  const r = mulberry(strHash(seed));
  const eo = ["#F4DBE5", "#EFC9D7", "#F6E3EA", "#E9BFD0"];
  const he = ["#4A2C7A", "#5C3A9A", "#3A2160", "#7E4FA8"];
  const bg = eo[Math.floor(r() * eo.length)];
  let cells = "";
  const n = 26 + Math.floor(r() * 14);
  for (let i = 0; i < n; i++) {
    const cx = r() * w, cy = r() * h, rad = 7 + r() * 16, col = he[Math.floor(r() * he.length)];
    const rot = Math.floor(r() * 180);
    cells += `<g transform="rotate(${rot} ${cx.toFixed(1)} ${cy.toFixed(1)})"><ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rad.toFixed(1)}" ry="${(rad*0.72).toFixed(1)}" fill="${col}" opacity="${(0.32+r()*0.4).toFixed(2)}"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(rad*0.32).toFixed(1)}" fill="${col}" opacity="0.85"/></g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><rect width="${w}" height="${h}" fill="${bg}"/>${cells}</svg>`;
}
function mediaHTML(src, seed) {
  if (src) return `<img src="${escapeAttr(src)}" alt="" loading="lazy">`;
  return placeholderSVG(seed);
}
function portraitHTML(src) {
  if (src) return `<img src="${escapeAttr(src)}" alt="Satwik Mahapatra">`;
  // stylised single-cell portrait placeholder
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="pg" cx="42%" cy="38%"><stop offset="0%" stop-color="#F6E3EA"/><stop offset="100%" stop-color="#E4BBCD"/></radialGradient></defs><rect width="300" height="300" fill="url(#pg)"/><ellipse cx="150" cy="155" rx="78" ry="92" fill="#5C3A9A" opacity=".22"/><circle cx="150" cy="150" r="46" fill="#4A2C7A" opacity=".55"/><circle cx="150" cy="150" r="20" fill="#321C56"/><circle cx="120" cy="120" r="9" fill="#4A2C7A" opacity=".4"/><circle cx="186" cy="178" r="7" fill="#4A2C7A" opacity=".4"/><circle cx="178" cy="116" r="5" fill="#1E8C73" opacity=".5"/></svg>`;
}

function escapeAttr(s) { return String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
function escapeHTML(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function qs(name) { return new URLSearchParams(location.search).get(name); }

/* ---------------- custom cell cursor ---------------- */
function initCursor() {
  if (window.matchMedia("(pointer: fine)").matches === false) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.body.classList.add("has-cursor");
  const cell = document.createElement("div"); cell.className = "cell-cursor";
  const trail = document.createElement("div"); trail.className = "cell-nucleus-trail";
  document.body.append(cell, trail);
  let mx = innerWidth / 2, my = innerHeight / 2, tx = mx, ty = my;
  addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; cell.style.transform = `translate(${mx}px,${my}px)`; });
  (function loop() { tx += (mx - tx) * 0.18; ty += (my - ty) * 0.18; trail.style.transform = `translate(${tx}px,${ty}px)`; requestAnimationFrame(loop); })();
  const hov = "a,button,input,textarea,select,.card,.masonry img,[role=button],[contenteditable=true]";
  addEventListener("mouseover", e => { if (e.target.closest(hov)) document.body.classList.add("cursor-hover"); });
  addEventListener("mouseout", e => { if (e.target.closest(hov)) document.body.classList.remove("cursor-hover"); });
}

/* ---------------- nav + footer ---------------- */
const NAV = [
  ["index.html", "About"],
  ["projects.html", "Projects"],
  ["blog.html", "Blog"],
  ["cv.html", "CV"],
  ["campus.html", "Campus Life"],
  ["contact.html", "Contact"]
];
function renderChrome() {
  const here = location.pathname.split("/").pop() || "index.html";
  const detailMap = { "project.html": "projects.html", "post.html": "blog.html" };
  const activeFile = detailMap[here] || here;
  const nav = document.getElementById("site-nav");
  if (nav) {
    nav.className = "nav";
    nav.innerHTML = `<div class="nav-inner">
      <a class="brand" href="index.html">${I.cell.replace('<svg', '<svg class="mark"')}<span>Satwik&nbsp;Mahapatra</span></a>
      <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false"><span></span></button>
      <ul class="nav-links" id="navLinks">
        ${NAV.map(([f, t]) => `<li><a href="${f}" class="${f === activeFile ? "active" : ""}">${t}</a></li>`).join("")}
      </ul></div>`;
    const tgl = nav.querySelector("#navToggle"), links = nav.querySelector("#navLinks");
    tgl.addEventListener("click", () => { const o = links.classList.toggle("open"); tgl.setAttribute("aria-expanded", o); });
  }
  const foot = document.getElementById("site-footer");
  if (foot) {
    const c = DataStore.data.contact;
    foot.className = "footer";
    foot.innerHTML = `<div class="wrap footer-grid">
      <div>
        <a class="brand" href="index.html">${I.cell.replace('<svg', '<svg class="mark"')}<span>Satwik&nbsp;Mahapatra</span></a>
        <p>BS (Research) at IISc Bengaluru, writing about oncology, stem cells, and the cells in between.</p>
        <div class="social">
          ${c.email ? `<a href="mailto:${escapeAttr(c.email)}" aria-label="Email">${I.mail}</a>` : ""}
          ${c.github ? `<a href="${escapeAttr(c.github)}" target="_blank" rel="noopener" aria-label="GitHub">${I.github}</a>` : ""}
          ${c.linkedin ? `<a href="${escapeAttr(c.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${I.linkedin}</a>` : ""}
          ${c.twitter ? `<a href="${escapeAttr(c.twitter)}" target="_blank" rel="noopener" aria-label="X">${I.twitter}</a>` : ""}
        </div>
      </div>
      <div class="foot-links">
        <strong style="font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-faint)">Pages</strong>
        ${NAV.map(([f, t]) => `<a href="${f}">${t}</a>`).join("")}
      </div>
    </div>
    <div class="wrap foot-bottom"><span>© ${new Date().getFullYear()} Satwik Mahapatra</span><span>Stained in hematoxylin &amp; eosin · IISc Bengaluru</span></div>`;
  }
}

/* ---------------- scroll reveal ---------------- */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
}
function observeNewReveals() {
  document.querySelectorAll(".reveal:not(.in)").forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight) el.classList.add("in");
  });
}

/* ---------------- toast ---------------- */
let toastT;
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ============================================================
   EDIT MODE / AUTH
   ============================================================ */
const Edit = {
  get on() { return document.body.classList.contains("editing"); },

  async login(pass) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pass));
    const hex = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
    return hex === EDIT_HASH;
  },

  enable() {
    sessionStorage.setItem("satwik_edit", "1");
    document.body.classList.add("editing");
    document.querySelector(".admin-bar")?.classList.add("show");
    document.querySelectorAll("[data-editable]").forEach(el => {
      el.setAttribute("contenteditable", "true");
      el.addEventListener("blur", onEditableBlur);
    });
    window.dispatchEvent(new CustomEvent("edit:on"));
    toast("Edit mode on — changes save locally. Export to publish.");
  },

  disable() {
    sessionStorage.removeItem("satwik_edit");
    document.body.classList.remove("editing");
    document.querySelector(".admin-bar")?.classList.remove("show");
    document.querySelectorAll("[data-editable]").forEach(el => { el.removeAttribute("contenteditable"); el.removeEventListener("blur", onEditableBlur); });
    window.dispatchEvent(new CustomEvent("edit:off"));
  }
};
function onEditableBlur(e) {
  const path = e.target.dataset.editable;
  const val = e.target.dataset.html ? e.target.innerHTML : e.target.textContent.trim();
  DataStore.setField(path, val);
  toast("Saved locally");
}

function buildAdmin() {
  const fab = document.createElement("button");
  fab.className = "admin-fab"; fab.setAttribute("aria-label", "Owner edit mode"); fab.innerHTML = I.lock;
  document.body.appendChild(fab);

  const bar = document.createElement("div");
  bar.className = "admin-bar";
  const addBtn = window.PageAdmin?.addLabel ? `<button class="bar-btn add" id="adminAdd">+ ${window.PageAdmin.addLabel}</button>` : "";
  bar.innerHTML = `<span class="dot"></span><span class="lbl">EDIT MODE</span>
    ${addBtn}
    <button class="bar-btn" id="adminExport">${I.download} Export</button>
    <button class="bar-btn" id="adminDiscard">Discard</button>
    <button class="bar-btn" id="adminExit">Exit</button>`;
  document.body.appendChild(bar);

  fab.addEventListener("click", () => { if (Edit.on) Edit.disable(); else openLogin(); });
  bar.querySelector("#adminExport").addEventListener("click", () => { DataStore.exportJSON(); toast("content.json downloaded — commit it to publish"); });
  bar.querySelector("#adminDiscard").addEventListener("click", () => {
    if (confirm("Discard all unsaved local edits and reload the published content?")) { DataStore.discardLocal(); location.reload(); }
  });
  bar.querySelector("#adminExit").addEventListener("click", () => Edit.disable());
  bar.querySelector("#adminAdd")?.addEventListener("click", () => window.PageAdmin.add());

  if (sessionStorage.getItem("satwik_edit") === "1") Edit.enable();
}

function openLogin() {
  openModal({
    title: "Owner sign-in",
    intro: "Enter the edit passphrase. Editing is for the site owner — published changes still require committing <code>content.json</code> to the repo.",
    fields: [{ name: "pass", label: "Passphrase", type: "password", placeholder: "••••••••" }],
    submitLabel: "Unlock editing"
  }).then(async vals => {
    if (!vals) return;
    if (await Edit.login(vals.pass)) Edit.enable();
    else toast("Incorrect passphrase");
  });
}

/* ============================================================
   MODAL BUILDER
   fields: {name,label,type,placeholder,hint,value}
   type: text|password|date|textarea|richtext|tags|image|pdf
   returns Promise<values|null>
   ============================================================ */
function openModal({ title, intro = "", fields = [], values = {}, submitLabel = "Save" }) {
  return new Promise(resolve => {
    const modal = document.createElement("div"); modal.className = "modal open";
    const fieldHTML = fields.map(f => {
      const v = values[f.name] ?? f.value ?? "";
      if (f.type === "textarea" || f.type === "richtext")
        return `<div class="field"><label>${f.label}</label><textarea name="${f.name}" placeholder="${escapeAttr(f.placeholder||"")}" style="${f.type==='richtext'?'min-height:200px;font-family:var(--mono);font-size:.85rem':''}">${escapeHTML(v)}</textarea>${f.hint?`<p class="hint">${f.hint}</p>`:""}</div>`;
      if (f.type === "image" || f.type === "pdf") {
        const accept = f.type === "pdf" ? "application/pdf" : "image/*";
        return `<div class="field"><label>${f.label}</label>
          <input type="text" name="${f.name}" placeholder="Paste a URL…" value="${escapeAttr(v)}">
          <p class="hint">${f.hint || "Paste a link, or upload a file below (kept in your browser until you Export)."}</p>
          <input type="file" accept="${accept}" data-target="${f.name}" class="file-pick" style="margin-top:.4rem;font-size:.85rem">
        </div>`;
      }
      return `<div class="field"><label>${f.label}</label><input type="${f.type==='password'?'password':f.type==='date'?'date':'text'}" name="${f.name}" placeholder="${escapeAttr(f.placeholder||"")}" value="${escapeAttr(v)}">${f.hint?`<p class="hint">${f.hint}</p>`:""}</div>`;
    }).join("");

    modal.innerHTML = `<div class="modal-box">
      <div class="modal-head"><h3>${title}</h3><button class="icon-btn" data-close>${I.close}</button></div>
      <div class="modal-body">${intro?`<p class="hint" style="margin-bottom:1rem">${intro}</p>`:""}${fieldHTML}</div>
      <div class="modal-foot"><button class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary" data-ok>${submitLabel}</button></div>
    </div>`;
    document.body.appendChild(modal);
    const box = modal.querySelector(".modal-box");
    box.querySelector("input,textarea")?.focus();

    modal.querySelectorAll(".file-pick").forEach(fp => fp.addEventListener("change", e => {
      const file = e.target.files[0]; if (!file) return;
      if (file.size > 4.5 * 1024 * 1024) { toast("File too large for in-browser storage — use a URL instead"); e.target.value = ""; return; }
      const reader = new FileReader();
      reader.onload = () => { modal.querySelector(`[name="${e.target.dataset.target}"]`).value = reader.result; toast("Loaded — Save then Export to keep it"); };
      reader.readAsDataURL(file);
    }));

    function close(result) { modal.classList.remove("open"); setTimeout(() => modal.remove(), 200); resolve(result); }
    modal.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => close(null)));
    modal.addEventListener("click", e => { if (e.target === modal) close(null); });
    modal.querySelector("[data-ok]").addEventListener("click", () => {
      const out = {}; fields.forEach(f => { out[f.name] = modal.querySelector(`[name="${f.name}"]`).value.trim(); });
      close(out);
    });
    document.addEventListener("keydown", function esc(ev){ if(ev.key==="Escape"){close(null);document.removeEventListener("keydown",esc);} });
  });
}

/* ---------------- boot ---------------- */
async function boot(pageInit) {
  await DataStore.init();
  renderChrome();
  initCursor();
  if (pageInit) pageInit();
  initReveal();
  buildAdmin();
  document.querySelector("main")?.classList.add("page-fade");
  window.addEventListener("data:changed", observeNewReveals);
}

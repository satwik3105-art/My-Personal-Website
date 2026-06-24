/* ============================================================
   server.js — contact-form backend for the portfolio site
   ------------------------------------------------------------
   A tiny Express server that receives messages from the site's
   contact form and appends them to data/submissions.json.

   GitHub Pages can only serve static files, so it cannot run this.
   Host this folder anywhere that runs Node (Render, Railway, Fly,
   a VPS, your own machine for testing), then point the site's
   contact form at it:

     Contact page → edit mode → "Edit all contact details"
       → Form endpoint:  https://your-host.example/api/contact

   Endpoints
     POST /api/contact        accept a message  { name, email, message }
     GET  /api/submissions    list messages (requires ?token=ADMIN_TOKEN)
     GET  /api/health         liveness probe
   ============================================================ */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, "data");
const STORE = path.join(DATA_DIR, "submissions.json");

// Comma-separated list of allowed origins, or "*" for any.
// e.g. ALLOWED_ORIGIN="https://satwik3105-art.github.io"
const ALLOWED = (process.env.ALLOWED_ORIGIN || "*").split(",").map(s => s.trim());
// Token required to read submissions back. Set this in production!
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

app.use(express.json({ limit: "32kb" }));
app.use(cors({
  origin: ALLOWED.includes("*") ? true : ALLOWED,
  methods: ["GET", "POST", "OPTIONS"]
}));

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STORE)) fs.writeFileSync(STORE, "[]\n");
}
function readAll() {
  ensureStore();
  try { return JSON.parse(fs.readFileSync(STORE, "utf8") || "[]"); }
  catch { return []; }
}
function writeAll(list) {
  ensureStore();
  fs.writeFileSync(STORE, JSON.stringify(list, null, 2) + "\n");
}

const isEmail = s => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);
const clean = (s, max) => String(s == null ? "" : s).trim().slice(0, max);

app.get("/api/health", (_req, res) => res.json({ ok: true, count: readAll().length }));

app.post("/api/contact", (req, res) => {
  const name = clean(req.body.name, 120);
  const email = clean(req.body.email, 160);
  const message = clean(req.body.message, 5000);

  if (!name || !email || !message) return res.status(400).json({ ok: false, error: "All fields are required." });
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Invalid email address." });

  // crude honeypot: reject if a "website" field is filled (bots love these)
  if (clean(req.body.website, 10)) return res.status(200).json({ ok: true });

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name, email, message,
    receivedAt: new Date().toISOString(),
    ip: (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString().split(",")[0].trim(),
    userAgent: clean(req.headers["user-agent"], 300)
  };

  const list = readAll();
  list.push(entry);
  writeAll(list);

  console.log(`[contact] ${entry.receivedAt}  ${name} <${email}>`);
  res.json({ ok: true, id: entry.id });
});

app.get("/api/submissions", (req, res) => {
  if (!ADMIN_TOKEN) return res.status(403).json({ ok: false, error: "Set ADMIN_TOKEN to enable reading submissions." });
  if (req.query.token !== ADMIN_TOKEN) return res.status(401).json({ ok: false, error: "Unauthorized." });
  res.json({ ok: true, submissions: readAll() });
});

app.listen(PORT, () => {
  ensureStore();
  console.log(`Contact backend listening on http://localhost:${PORT}`);
  console.log(`Allowed origins: ${ALLOWED.join(", ")}`);
  if (!ADMIN_TOKEN) console.log("Note: ADMIN_TOKEN not set — /api/submissions is disabled until you set it.");
});

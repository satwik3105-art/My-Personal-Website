/* ============================================================
   data.js — content model + store
   How persistence works on a static host (GitHub Pages):
   1. DEFAULT below is the built-in seed (also mirrored in data/content.json).
   2. On load the store tries to fetch data/content.json (the committed,
      public source of truth). If that fails (e.g. opening the file
      locally), it falls back to DEFAULT.
   3. Unsaved owner edits live in localStorage and are layered on top so
      you can preview them. Clicking "Export" downloads a content.json —
      commit that file to your repo to make the change permanent & public.
   ============================================================ */

const DEFAULT = {
  about: {
    name: "Satwik Mahapatra",
    role: "BS (Research) · Indian Institute of Science, Bengaluru",
    tagline: "Reading cells like text — where they came from, why they divide, and how they decide what to become.",
    bio: "I'm a Bachelor of Science (Research) student at IISc Bengaluru, having completed my first year. I work at the intersection of <strong>oncology</strong>, <strong>stem cell biology</strong>, and <strong>neuroscience</strong> — drawn to the mechanistic questions that sit underneath all three: how a cell controls its own division, how identity is acquired and lost, and how complex systems repair themselves. When I'm not in the lab or buried in a paper, I'm writing about what I read here.",
    interests: ["Oncology", "Stem Cell Biology", "Neuroscience", "Cancer Genomics", "Bioinformatics"],
    portrait: ""   // owner sets a URL or uploads in edit mode
  },
  domains: [
    { key: "onco",  tag: "Domain 01", title: "Oncology", blurb: "The biology of division gone wrong — tumour suppressors, the cell cycle, and the microenvironment that lets a single rogue cell become a population." },
    { key: "stem",  tag: "Domain 02", title: "Stem Cell Biology", blurb: "Potency and fate. How a cell holds open the option to become many things, and what it costs a tissue to keep that option alive." },
    { key: "neuro", tag: "Domain 03", title: "Neuroscience", blurb: "Wiring, signalling, and plasticity — the most demanding case study in how cellular decisions scale into a system that thinks." }
  ],
  projects: [
    {
      id: "fnr-regulation",
      title: "FNR-Mediated Anaerobic Regulation in E. coli & Salmonella",
      date: "2026-03-14",
      excerpt: "A comparative transcriptomics project on the FNR regulon, using public microarray and RNA-seq data with a hands-on DESeq2 analysis.",
      tags: ["Bioinformatics", "Transcriptomics", "Microbiology"],
      cover: "",
      body: "<p>This project re-analysed publicly available expression data to compare how the global anaerobic regulator <strong>FNR</strong> reshapes the transcriptome of <em>Escherichia coli</em> versus <em>Salmonella</em> Typhimurium.</p><h2>Approach</h2><p>I built a small reproducible pipeline: pulled a GEO dataset, ran quality control, and used <code>DESeq2</code> to call differentially expressed genes between aerobic and anaerobic conditions, then intersected the hits with known FNR-binding sites.</p><h2>What I learned</h2><p>The conserved core of the regulon is strikingly stable, but the species-specific periphery is where the interesting biology lives — particularly genes tied to virulence in Salmonella that have no counterpart in commensal E. coli.</p>"
    },
    {
      id: "onchomap",
      title: "OnchoMap — A Cancer Signalling Atlas",
      date: "2026-01-22",
      excerpt: "An interactive web tool that maps oncogenic signalling pathways and the cross-talk between them, built for self-study and teaching.",
      tags: ["Web Tool", "Oncology", "Signalling"],
      cover: "",
      body: "<p><strong>OnchoMap</strong> is an interactive atlas I built to make the spaghetti of cancer signalling legible — RTK/RAS/MAPK, PI3K/AKT, p53, and the points where they intersect.</p><h2>Why I built it</h2><p>Static pathway diagrams hide the thing that matters most: context. The same node can be oncogenic or protective depending on what else is firing. The tool lets you toggle pathways and see the cross-talk light up.</p><blockquote>The map is not the territory — but a good map tells you which territory to walk into next.</blockquote>"
    },
    {
      id: "vdj-animation",
      title: "Interactive V(D)J Recombination Animation",
      date: "2025-11-08",
      excerpt: "A browser animation that walks through how adaptive immune receptor diversity is generated, segment by segment.",
      tags: ["Immunology", "Education", "Animation"],
      cover: "",
      body: "<p>An explainer animation that takes V(D)J recombination from germline gene segments to a finished receptor, one controlled cut-and-join at a time.</p><h2>Design goal</h2><p>Most textbook figures freeze a process that is fundamentally about <em>motion and chance</em>. I wanted learners to see the combinatorics happen, and to feel why the diversity is astronomical.</p>"
    }
  ],
  blog: [
    {
      id: "he-stain-as-language",
      title: "Why an H&E slide is a language, not a picture",
      date: "2026-06-20",
      excerpt: "Hematoxylin and eosin don't just colour tissue — they encode a grammar that a trained eye reads like prose. Some notes on learning to read it.",
      tags: ["Pathology", "Notes"],
      cover: "",
      body: "<p>The first time I looked down a microscope at a stained section, it was noise. Pink and purple, everywhere. Months later the same field reads almost like a sentence.</p><h2>The grammar</h2><p>Hematoxylin binds acidic structures — nuclei go violet. Eosin binds basic ones — cytoplasm and matrix go rose. That single contrast tells you where the information of a cell sits and how much of it there is.</p><p>What changed for me wasn't the colours; it was learning the <em>rules</em> that connect them to biology.</p>"
    },
    {
      id: "first-year-iisc",
      title: "First year at IISc, in five lessons",
      date: "2026-06-12",
      excerpt: "What a year of the BS Research programme actually taught me — most of it not in the syllabus.",
      tags: ["IISc", "Reflection"],
      cover: "",
      body: "<p>A year in, here's what stuck — and most of it wasn't on any problem set.</p><h2>1. Depth beats coverage</h2><p>I learned more from taking one paper apart over three days than from skimming twenty.</p><h2>2. The question is the hard part</h2><p>Finding a good question is harder, and more valuable, than answering an average one.</p>"
    },
    {
      id: "stem-cell-paradox",
      title: "The stem cell paradox I can't stop thinking about",
      date: "2026-05-30",
      excerpt: "A tissue that never replaces its cells ages one way; a tissue that replaces them constantly ages another. Both can give you cancer. Why?",
      tags: ["Stem Cells", "Oncology"],
      cover: "",
      body: "<p>Here's the tension I keep circling back to. Renewal is repair — but every division is a chance to make a mistake that turns a cell oncogenic.</p><h2>Two failure modes</h2><p>Don't divide enough and the tissue degenerates. Divide too freely and you raise the odds of a tumour. Evolution had to thread that needle in every self-renewing tissue we have.</p>"
    }
  ],
  cv: [
    { id: "c1", year: "2025 – present", title: "BS (Research), Biology", place: "Indian Institute of Science, Bengaluru", desc: "Completed first year of the four-year research-track undergraduate programme. Coursework across molecular biology, biochemistry, and quantitative methods." },
    { id: "c2", year: "2026", title: "Independent project — FNR regulon analysis", place: "Self-directed · IISc", desc: "Comparative transcriptomics of anaerobic regulation in E. coli and Salmonella, including hands-on DESeq2 differential expression analysis." },
    { id: "c3", year: "2026", title: "Built OnchoMap signalling atlas", place: "Personal", desc: "Designed and shipped an interactive web tool mapping oncogenic pathway cross-talk for self-study and peer teaching." },
    { id: "c4", year: "2025", title: "Began intensive paper deep-dive practice", place: "Self-directed", desc: "Sustained close-reading programme across immunology, cancer biology, and evolutionary medicine — the foundation of this blog." }
  ],
  cvPdf: "",  // owner sets a URL or uploads a PDF in edit mode
  campus: [
    { id: "g1", caption: "Main Building, IISc — early morning", src: "" },
    { id: "g2", caption: "The lab, mid-experiment", src: "" },
    { id: "g3", caption: "Monsoon over the campus canopy", src: "" },
    { id: "g4", caption: "Seminar notes & filter coffee", src: "" },
    { id: "g5", caption: "Late evening at the library", src: "" },
    { id: "g6", caption: "Field of jacaranda in bloom", src: "" }
  ],
  contact: {
    blurb: "Always glad to talk about cancer biology, stem cells, or a paper worth reading. The fastest way to reach me is email.",
    email: "satwik3105@gmail.com",
    phone: "+91 00000 00000",
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/satwik3105-art",
    location: "Bengaluru, Karnataka, India",
    twitter: "",
    formEndpoint: ""  // e.g. https://formspree.io/f/xxxxxxx  OR your backend URL
  }
};

const LS_KEY = "satwik_site_overrides_v1";

const DataStore = {
  data: null,

  async init() {
    let base = DEFAULT;
    try {
      const res = await fetch("data/content.json", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        base = this.deepMerge(structuredClone(DEFAULT), json); // committed file wins over seed
      }
    } catch (_) { /* local file:// — fall back to DEFAULT */ }

    // overlay unsaved local owner edits
    try {
      const ov = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (ov) base = this.deepMerge(base, ov);
    } catch (_) {}

    this.data = base;
    return this.data;
  },

  deepMerge(target, src) {
    for (const k in src) {
      if (Array.isArray(src[k])) target[k] = src[k];
      else if (src[k] && typeof src[k] === "object") target[k] = this.deepMerge(target[k] || {}, src[k]);
      else target[k] = src[k];
    }
    return target;
  },

  persistLocal() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.data));
    window.dispatchEvent(new CustomEvent("data:changed"));
  },

  hasLocalEdits() { return !!localStorage.getItem(LS_KEY); },
  discardLocal() { localStorage.removeItem(LS_KEY); },

  // --- collection helpers ---
  list(key) { return this.data[key] || []; },
  find(key, id) { return (this.data[key] || []).find(x => x.id === id); },
  upsert(key, item) {
    const arr = this.data[key] || (this.data[key] = []);
    const i = arr.findIndex(x => x.id === item.id);
    if (i >= 0) arr[i] = { ...arr[i], ...item }; else arr.unshift(item);
    this.persistLocal();
  },
  remove(key, id) {
    this.data[key] = (this.data[key] || []).filter(x => x.id !== id);
    this.persistLocal();
  },
  setField(path, value) {
    const parts = path.split(".");
    let o = this.data;
    for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]] || (o[parts[i]] = {});
    o[parts[parts.length - 1]] = value;
    this.persistLocal();
  },

  exportJSON() {
    const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "content.json"; a.click();
    URL.revokeObjectURL(url);
  }
};

// id + date helpers
function slugify(s) {
  return (s || "untitled").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || "item-" + Date.now();
}
function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

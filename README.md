# Satwik Mahapatra — portfolio & blog

A clean, animated, multi-page personal site: About, Projects, Blog, CV/Achievements,
Campus Life, and Contact. Plain HTML/CSS/JS — no build step, no Jekyll — so it drops
straight onto GitHub Pages. Owner-only in-browser editing is built in.

## Pages

| File           | Page                                   |
|----------------|----------------------------------------|
| `index.html`   | About / landing (portrait + interests) |
| `projects.html`| Project gallery (search + tag filters) |
| `project.html` | A single project (one per project)     |
| `blog.html`    | Blog index (search + tag filters)      |
| `post.html`    | A single blog post (one per post)      |
| `cv.html`      | CV & achievements timeline (+ PDF)     |
| `campus.html`  | Campus-life photo gallery              |
| `contact.html` | Contact form + your details            |

Each project and post gets its **own page** via `project.html?id=…` / `post.html?id=…`,
generated automatically from the content — including ones you add later. Clicking a
card's title opens that page (no "read more").

## Deploy to GitHub Pages

1. Put these files at the **root** of your repo (e.g. `satwik3105-art.github.io`).
2. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
3. Visit `https://<username>.github.io/`.

The `.nojekyll` file tells Pages to serve the files as-is.

> Open the site through a web server (GitHub Pages, or `python3 -m http.server`
> locally), not by double-clicking the HTML. Browsers block `fetch()` on the
> `file://` protocol, which the content loader uses. (There's a built-in fallback so
> it still renders, but local edits/exports behave best over `http://`.)

## Editing the site (owner only)

1. Click the **lock button** (bottom-right). Enter the passphrase.
2. **Default passphrase:** `satwik-iisc` — change it (see below) before publishing.
3. Edit mode lets you:
   - Click most text to edit it in place.
   - Add / edit / delete projects, posts, CV milestones, and campus photos.
   - Set images and the PDF version of your CV (paste a URL or upload).
   - Fill in your contact details and the form endpoint.
4. Changes save **locally in your browser** as you go (nothing is public yet).
5. Click **Export** → downloads `content.json`.
6. Replace `data/content.json` in the repo with that file and commit.
   Your changes are now live for everyone.

`Discard` reverts unsaved local edits; `Exit` leaves edit mode.

### Why publishing needs a commit (the honest version)

This is a **static** site. Three things follow from that, and they were designed
around rather than faked:

- **"Owner-only editing."** There's no server to enforce logins, so the passphrase
  is a convenience gate, not real security — a determined person could read the page
  source. The *real* protection is that **only you can commit to the repo**, so only
  changes you export and push ever become public. Treat the passphrase as a deterrent.
- **A real backend for the contact form** can't run on GitHub Pages. Use Formspree,
  or host the included `backend/` folder elsewhere. See `backend/README.md`. Without
  either, the form falls back to opening the visitor's email client (and keeps a local
  copy in their browser).
- **"A separate file per post"** isn't literally generated — static hosting can't write
  new files. Instead every post/project is its own *page* via `?id=…`, which behaves
  exactly like a separate page and works for new entries automatically.

## Change the edit passphrase

The site stores only a SHA-256 **hash** of the passphrase, never the passphrase itself.
Generate a new hash and paste it into `js/app.js`:

```bash
# macOS / Linux
printf '%s' 'your-new-passphrase' | shasum -a 256
```

Copy the 64-character hash and set it in `js/app.js`:

```js
const EDIT_HASH = "paste-the-new-hash-here";
```

Commit the change.

## Contact form

See `backend/README.md` for the two options (Formspree, or the bundled Node server)
and how to wire the endpoint in.

## Customising

- **Content** lives in `data/content.json` (and a matching seed in `js/data.js`).
- **Look & feel** (the hematoxylin-&-eosin palette, fonts, spacing) lives in
  `css/style.css` under `:root`.
- **Behaviour** (editing, rendering, the cell cursor) lives in `js/app.js`.

## Project structure

```
.
├── index.html  projects.html  project.html
├── blog.html   post.html      cv.html
├── campus.html contact.html
├── css/style.css
├── js/data.js  js/app.js
├── data/content.json        ← published content (commit to publish edits)
├── backend/                 ← optional self-hosted contact server
│   ├── server.js  package.json  README.md
│   └── data/submissions.json
└── .nojekyll
```

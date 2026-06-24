# Contact-form backend

A tiny Node/Express server that receives messages from the site's contact form
and stores them in `data/submissions.json`.

GitHub Pages serves **static files only**, so it cannot run this server. You have
two ways to make the contact form deliver messages:

1. **Formspree (no server to run).** Create a free form at
   [formspree.io](https://formspree.io), copy its endpoint
   (`https://formspree.io/f/xxxxxxx`), and paste it into the site:
   Contact page → unlock edit mode → **Edit all contact details** → *Form endpoint*.
   Export and commit `content.json`. Done.

2. **This backend (self-hosted, messages saved to a file you own).** Follow below.

---

## Run locally

```bash
cd backend
npm install
npm start
```

You'll see `Contact backend listening on http://localhost:4000`.

Then point the site at it: Contact page → edit mode → **Edit all contact details**
→ *Form endpoint* = `http://localhost:4000/api/contact`. (For local testing, open the
site with a local web server too, not the `file://` protocol, so the browser allows
the request.)

## Configuration (environment variables)

| Variable         | Default | Purpose                                                        |
|------------------|---------|----------------------------------------------------------------|
| `PORT`           | `4000`  | Port to listen on.                                             |
| `ALLOWED_ORIGIN` | `*`     | Comma-separated allowed origins for CORS. In production set this to your site, e.g. `https://satwik3105-art.github.io`. |
| `ADMIN_TOKEN`    | _unset_ | Secret needed to read messages back via `/api/submissions`. Until set, that route is disabled. |

Example:

```bash
ALLOWED_ORIGIN="https://satwik3105-art.github.io" ADMIN_TOKEN="choose-a-long-secret" npm start
```

## Endpoints

- `POST /api/contact` — body `{ name, email, message }`. Appends to `data/submissions.json`.
- `GET  /api/submissions?token=YOUR_ADMIN_TOKEN` — returns all stored messages (only if `ADMIN_TOKEN` is set).
- `GET  /api/health` — quick liveness check.

## Reading your messages

```bash
curl "http://localhost:4000/api/submissions?token=YOUR_ADMIN_TOKEN"
```

…or just open `backend/data/submissions.json`.

## Deploying

Any Node host works (Render, Railway, Fly.io, a small VPS). Deploy this `backend/`
folder, set the environment variables above, and use the deployed URL
(`https://your-app.onrender.com/api/contact`) as the form endpoint on the site.

> **Note on persistence:** some free hosts use an ephemeral filesystem, so
> `submissions.json` can reset on redeploy/restart. For durable storage, mount a
> persistent volume or swap the file for a database. For low volume, Formspree
> (option 1) is the simplest reliable choice.

# My Blog

A personal blog modeled on [philschmid.de](https://www.philschmid.de). Built with [Astro](https://astro.build), edited with [Sveltia CMS](https://sveltiacms.app), hosted for free on GitHub Pages.

Publishing a post needs no code. Each post is one Markdown file. When you add one, the site rebuilds and the post shows up on the index, its tag pages, search and the RSS feed.

## Pages

- **Blog** (`/`): posts grouped by month, 20 per page
- **Post** (`/blog/<slug>`): title, date, reading time, tags, table of contents, code highlighting
- **Projects** (`/projects`): grid of project cards
- **Newsletter** (`/newsletter`): issues grouped by month
- **About Me** (`/about`): photo, details and your bio
- **Tags** (`/tags`), **RSS** (`/rss.xml`), **Search** (press ⌘K or Ctrl+K)
- **Editor** (`/admin`): write and publish from the browser

Dark theme by default. The footer has a light/dark switch.

The site is a PWA. Readers can install it as an app (Add to Home Screen on iPhone), and posts they have opened still load offline. The service worker is built from `src/pages/sw.js.ts`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## One time setup

1. Fill in `src/site.config.ts`: name, header text, profile details, social links.
2. Optional: add a profile photo as `public/images/profile.jpg` and set `profile.photo: '/images/profile.jpg'`.
3. Create a GitHub repo named `<your-username>.github.io`. The site will be at `https://<your-username>.github.io`.
4. In `public/admin/config.yml`, set `backend.repo` to `<your-username>/<your-username>.github.io`.
5. Push the code:
   ```bash
   git init && git add . && git commit -m "Initial blog"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
6. On GitHub, open the repo, go to **Settings > Pages**, and set **Source** to **GitHub Actions**. From then on, every push deploys the site.
7. Create a token for the editor: GitHub **Settings > Developer settings > Personal access tokens > Fine-grained tokens**. Give it access to this repo only, with **Contents: Read and write**.

## Writing a post

### In the browser

1. Open `https://<your-site>/admin`.
2. Click **Sign In with Token** and paste your token. You only do this once per browser.
3. Go to **Blog Posts > New Post**, write, then click **Save**.
4. The site updates in about a minute.

Newsletter issues, projects and the About page are edited the same way.

### In VS Code

```bash
npm run new "What I learned about RAG"
```

This creates `src/content/blog/what-i-learned-about-rag.md` as a draft. Write the post, change `draft: true` to `draft: false`, then `git push`.

### Post format

```markdown
---
title: "What I learned about RAG"
description: "One line summary for search results and link previews"
date: 2026-10-01
tags: ["AI", "RAG"]
draft: false
---

The post text, written in Markdown.
```

For images, upload them in the editor, or put them in `public/images/` and use `![alt text](/images/pic.png)`.

## Hosting on Vercel instead

Import the repo at [vercel.com/new](https://vercel.com/new). Vercel detects Astro on its own. Add the environment variable `SITE_URL=https://<your-project>.vercel.app` so RSS and link previews use the right address.

## Where things live

```
src/
  content/blog/        posts
  content/newsletter/  newsletter issues
  content/projects/    project cards
  content/pages/       About page text
  site.config.ts       name, profile, social links, menu
  pages/               routes
  components/ layouts/ styles/
public/admin/          editor setup (config.yml)
```

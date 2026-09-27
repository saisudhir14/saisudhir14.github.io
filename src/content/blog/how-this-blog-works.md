---
title: "How This Blog Works"
description: "The free setup behind this site: Astro, Markdown, Sveltia CMS and GitHub Pages."
date: 2026-09-26
tags: ["Astro", "Web Development", "GitHub"]
---

This site is static and costs nothing to host. Here is how a post gets from my editor to the homepage.

## The setup

| Part | Job | Cost |
| --- | --- | --- |
| Astro | Turns Markdown files into HTML pages | Free |
| Sveltia CMS | Editor at `/admin` that saves posts to GitHub | Free |
| GitHub Actions | Rebuilds the site on every change | Free |
| GitHub Pages | Hosts the site | Free |

## Publishing a post

1. Open `/admin` and click **New Post**.
2. Fill in the title, date, tags and text.
3. Click **Save**. The CMS commits a Markdown file to the repo.
4. GitHub Actions rebuilds the site in about a minute.
5. The post shows up on the index, its tag pages, search and the RSS feed.

I don't touch any code for this. Each post is one file in `src/content/blog/`.

## What a post file looks like

```markdown
---
title: "My new post"
description: "One line summary"
date: 2026-10-01
tags: ["AI", "Python"]
---

The post text, written in Markdown.
```

## Extras

Posts with more than two headings get a table of contents at the top.

### Code highlighting

```ts
const greet = (name: string) => `Hello, ${name}`;
console.log(greet('world'));
```

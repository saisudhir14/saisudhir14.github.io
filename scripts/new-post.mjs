// Usage: npm run new "My Post Title"
import { writeFileSync, existsSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new "My Post Title"');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const date = new Date().toISOString().slice(0, 10);
const file = `src/content/blog/${slug}.md`;

if (existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}

writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
description: ""
date: ${date}
tags: []
draft: true
---

Start writing here.
`,
);
console.log(`Created ${file} (draft: true. Set it to false to publish.)`);

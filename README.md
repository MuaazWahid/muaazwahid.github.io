# A small personal site

A minimal software engineer portfolio for GitHub Pages. Jekyll turns Markdown into
static HTML. No frontend framework, external fonts, tracking, or cookies. Content
works without JavaScript; the only script controls the color theme.

## Make it yours

1. Edit `_data/profile.yml`: name, email, Resume, GitHub, LinkedIn, and introduction.
   Empty links appear as inactive labels instead of broken links.
2. Edit `_includes/about.md`. Replace the example biography before sharing.
3. Upload `assets/resume.pdf` and set `resume: /assets/resume.pdf`, or use an HTTPS URL.

## Add a post or project

Copy a template from `_drafts/` to `_posts/YYYY-MM-DD-your-title.md`:

```yaml
---
title: "A small thing I built"
description: "A one-sentence summary."
kind: Project # Note or Project
featured: true # optional: show above other posts on the home page
project_url: "https://github.com/you/project" # optional
---

Write in Markdown here.
```

The filename date controls publication. Future dates and `_drafts/` stay unpublished.
Home shows five posts (featured first); `/posts/` lists all posts newest first.
Each post has its own URL and appears in `/feed.xml`. Put images under `assets/images/`
and use descriptive alt text.

Push to `main`. The existing GitHub Pages branch build publishes at
<https://muaazwahid.github.io/>. No separate CMS or deployment workflow is needed.

## Local preview

Use GitHub's official build image:

```sh
docker run --rm -v "$PWD:/srv/jekyll" -w /srv/jekyll \
  --entrypoint jekyll ghcr.io/actions/jekyll-build-pages:v1.0.13 build
python3 -m http.server 4000 --directory _site
```

Open <http://localhost:4000>. Add `--drafts` after `build` to preview templates.
Rebuild after edits. Generated `_site/` is not committed.

## Design

- System fonts, semantic HTML, native links and a native theme selector.
- System theme by default. Light/Dark overrides persist locally when storage is available.
- Without JavaScript, content and links work and the OS theme is respected.
- Keyboard focus, skip link, responsive layout, reduced motion, and print styles.
- No container queries, `:has()`, view transitions, remote fonts, or client rendering.
  Older browsers without theme media queries receive the light theme.

Styles live in `assets/style.css`; appearance behavior lives in `assets/theme.js`.

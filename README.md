# A small personal site

A minimal software engineer portfolio for GitHub Pages. Jekyll turns Markdown into
static HTML. No frontend framework, third-party fonts, tracking, or cookies. Content
works without JavaScript; the only script controls the theme and a few progressive
enhancements.

## Make it yours

1. Edit `_data/profile.yml`: name, email, Resume, GitHub, LinkedIn, and introduction.
   Empty values are simply left out — no broken links or placeholder buttons.
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

If you have Ruby locally, `gem install jekyll` then `jekyll serve --drafts` gives
live reload instead. No npm install or asset build step is needed: the CSS and the
Inter `woff2` are committed.

## Design

- JetKVM-inspired: a white sheet on a light canvas, dashed side rails, a compact
  48px header, and a blue accent.
- Inter, self-hosted as one subsetted variable `woff2` (SIL OFL, see
  `assets/fonts/OFL.txt`). No third-party font requests.
- System theme by default. The Auto/Light/Dark picker persists locally when storage
  is available; light and dark share one token set.
- Keyboard focus, skip link, responsive layout, reduced motion, and print styles.
- Progressive enhancement: content and links work without JavaScript. The theme
  picker, scroll reveals, reading progress line, and sticky post bar need it.
- Styles live in `assets/style.css`; behavior lives in `assets/theme.js`.

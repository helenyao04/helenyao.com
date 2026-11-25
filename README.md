# Helen's Orbit — portfolio site

A static website (plain HTML/CSS/JS, no build step). Every page lives inside `index.html` and is routed with `#/` links, so it works on any host.

```
site/
  index.html          page shell
  js/content.js       ← ALL your words, images and flip books (edit this)
  js/app.js           layout & animations (no need to touch)
  js/flipbook.js      the page-turning book
  css/style.css       styles
  assets/img/         artwork pulled from your Canva site
  assets/alphabet-garden/01.webp … 56.webp
  assets/fabrx/       ← put FABRX Studio files here
  assets/Helen-Yao-Resume.pdf
```

## Preview it on your computer
Open Terminal in the `site` folder and run `python3 -m http.server 8000`, then visit http://localhost:8000.
(Opening `index.html` by double-clicking also mostly works, but a local server is closer to the real thing.)

## Add FABRX Studio work
1. Drop your images into `assets/fabrx/` (JPG, PNG or WebP; around 1600px wide is plenty).
2. Open `js/content.js` and find the **FABRX STUDIO** block. Fill in `summary`, set `cover`, and uncomment/copy the example `sections`.
3. **Flip book:** name the pages `01.jpg, 02.jpg, …` in their own folder (for example `assets/fabrx/newsletter-1/`) and add:
   ```js
   { type: "flipbook", title: "Newsletter — Issue 1", ratio: 0.773,
     pages: { folder: "assets/fabrx/newsletter-1", count: 8, ext: "jpg" } }
   ```
   `ratio` = page width ÷ page height (US Letter portrait 0.773, landscape 1.294, square 1).
   Page 1 is the front cover, and then pages pair up as spreads.
   **Turning a PDF into pages:** in Canva, use Share → Download → PNG/JPG with all pages selected (or Preview → File → Export on a Mac). Then rename the files 01, 02, ….
4. Save and refresh.

The same `flipbook`, `gallery` and `text` blocks work on any project, games included.

## How helenyao.com is hosted
- **Host:** GitHub Pages, from the public repository `helenyao04/helenyao.com` (branch `main`). Free, no badge, HTTPS enforced.
- **Domain:** registered through Canva (auto-renews each January — keep it on). Canva DNS records: four `A @` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and `CNAME www` → `helenyao04.github.io`. "Connected to Canva" is off.
- The `CNAME` file in this folder tells GitHub Pages to serve the site at helenyao.com — don't delete it.

## Updating the live site
After editing files here, publish with (from this `site` folder):

```
git add -A && git commit -m "Update portfolio" && git push
```

The site updates within about a minute. You can also edit or upload files directly on github.com in the `helenyao.com` repository, or just ask Claude to publish.

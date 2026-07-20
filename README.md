# Factor of Safety

Website for **Factor of Safety**, a horror game. Static site with a CRT-terminal
aesthetic (pale phosphor green on black), intended for GitHub Pages.

## Structure

```
index.html        Landing page with sample content modules
css/style.css     CRT theme, layout, and reusable module styles
images/           Place screenshots / key art here
```

## Editing

- **Add a text module** — copy a `<section class="module">` block and edit the
  `.module__bar` title and `.module__body` text.
- **Add an image** — inside an `.image-frame`, replace the placeholder `<span>`
  with `<img src="images/your-image.png" alt="...">`.
- **Side-by-side layout** — wrap two modules in `<div class="modules modules--split">`.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```
python -m http.server
```

Then visit <http://localhost:8000>.

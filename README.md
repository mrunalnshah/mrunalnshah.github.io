# mrunalnshah.github.io

My personal website: home, projects, and an interactive CV. Plain HTML, CSS,
and JavaScript, with no build step or framework.

## Run it locally

```bash
git clone https://github.com/mrunalnshah/mrunalnshah.github.io.git
cd mrunalnshah.github.io
python -m http.server
```

Open <http://localhost:8000>. A local server is needed because pages read
their content from JSON; opening `index.html` directly won't work.

## Edit the content

All text lives in `data/`. You don't need to touch the HTML or JS.

| File              | Controls                                              |
| ----------------- | ----------------------------------------------------- |
| `data/site.json`  | nav tabs and social links                             |
| `data/home.json`  | home page: photo, bio, currently, news                |
| `data/cv.json`    | CV and projects page: every entry, in short           |
| `data/pages/`     | long "learn more" pages, one file per entry           |

Every field is explained, with examples, in [data/README.md](data/README.md).
Images go in `assets/`.

## Make it your own

1. Fork this repo and rename it to `<your-username>.github.io`.
2. Replace the content in `data/` and the photo in `assets/`.
3. Push. GitHub Pages publishes it at `https://<your-username>.github.io`
   within a minute or two (turn it on under Settings → Pages if needed).

## Layout

```
index.html, cv.html, projects.html, entry.html   page shells
data/     content (JSON)
js/       draws the pages from data/
assets/   images and fonts
style.css
```

## License

[MIT](LICENSE)

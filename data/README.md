# data

Everything the site says lives in this folder. Edit these files; the HTML
pages and `js/` only display them.

| File        | Shows up on                                   |
| ----------- | --------------------------------------------- |
| `site.json` | every page: the nav and the social links      |
| `home.json` | the home page                                 |
| `cv.json`   | the CV, the projects page, and entry pages    |

**Rules for every file**

- Paths like `assets/prof_pic.jpg` or `cv.html` are relative to the site root.
  Full URLs (`https://...`) work anywhere a link is expected.
- Text may contain HTML, e.g. a link: `<a href='https://...'>name</a>`. Use
  single quotes inside HTML so you don't have to escape them.
- JSON is strict: no comments, no comma after the last item, and every
  string in double quotes. If a file has a mistake, the page says which
  file and what's wrong at the top, instead of rendering.

**Previewing locally:** pages read these files over the web, so opening
`index.html` straight from disk shows only an error. From the site folder, run
`python -m http.server` and open <http://localhost:8000>.

## site.json

```json
{
  "nav":    [{ "label": "CV", "href": "cv.html", "alsoCurrentOn": ["entry.html"] }],
  "social": [{ "label": "GitHub", "href": "https://github.com/..." }]
}
```

- `nav`: the tabs, in order. The tab for the page you're on is underlined;
  `alsoCurrentOn` (optional) lists other pages that count as that tab.
- `social`: the small links above the nav, in order.

## home.json

| Field          | What it is                                                          |
| -------------- | ------------------------------------------------------------------- |
| `photo`        | `{ "src": "assets/prof_pic.jpg", "alt": "mrunal" }`                 |
| `greeting`     | the heading, e.g. `"bello globo,"`                                  |
| `name`         | shown in the signature font after "I am"                            |
| `bio`          | the intro paragraph (HTML allowed, e.g. the BANG! tooltip)          |
| `currently`    | paragraphs under "currently,"                                       |
| `news`         | `[{ "date": "2026-09-09", "text": "..." }]`, newest first, shown as `[September - 09 - 2026] ...` |
| `announcement` | text under "announcement"; `""` hides it                            |

A list left empty (`[]`) hides its heading.

## cv.json

```json
{
  "pdf": "assets/cv.pdf",
  "defaultThumbnail": "assets/cv/default-thumbnail.svg",
  "sections": [ ... ]
}
```

- `pdf`: shows a `[pdf]` link on the CV; `""` hides it.
- `defaultThumbnail`: the picture for entries without their own `thumbnail`.
- `sections`: shown on the CV in this order. A section with no entries is
  hidden.

### A section

| Field          | What it is                                                        |
| -------------- | ----------------------------------------------------------------- |
| `id`           | short name used in links, e.g. `"research"`                       |
| `title`        | the heading, e.g. `"awards & fellowships"`                        |
| `thumbnails`   | optional: `true` shows entries as [photo \| text] on the CV       |
| `projectsPage` | optional: `true` also lists the section on the projects page      |
| `entries`      | the entries, in the order listed (put the newest first)           |

### An entry

| Field       | What it is                                                           |
| ----------- | -------------------------------------------------------------------- |
| `id`        | short name, unique within its section, used in its page's link       |
| `title`     | school, company, project, or award name                              |
| `role`      | optional: degree, position, or awarding body                         |
| `location`  | optional                                                             |
| `start`     | `"YYYY-MM"` or `"YYYY"`                                              |
| `end`       | same format; leave it out while ongoing ("present")                  |
| `date`      | instead of `start`/`end`, for one-off things like an award           |
| `group`     | optional: a sub-group, e.g. `"Safety AI"`. Collapsible on the CV, a filter on the projects page |
| `summary`   | optional: a line or two shown in lists                               |
| `thumbnail` | optional: a picture, e.g. `"assets/cv/my-project.png"`               |
| `links`     | optional: `{ "paper": "https://...", "code": "https://..." }`, shown as `[paper] [code]` in that order. Research usually has paper and code; projects live and code |
| `featured`  | optional, in `projectsPage` sections: `true` puts it at the top of the projects page as a large card |
| `details`   | optional: the entry's own page. Having details is what adds `[learn more →]` |

### details

A list of blocks, shown in order on the entry's page. Each block can have
any of these, shown in this order:

```json
"details": [
  { "heading": "the problem,", "text": "One paragraph." },
  { "heading": "the model,", "text": ["First paragraph.", "Second paragraph."] },
  { "heading": "coursework,", "items": ["Machine Learning", "NLP"] },
  { "image": "assets/cv/figure.png", "caption": "What the figure shows." }
]
```

- `heading`: a sub-heading
- `text`: a paragraph, or a list of paragraphs
- `items`: a bulleted list
- `image` and `caption`: a picture and the line under it

## Examples

An award:

```json
{ "id": "some-fellowship", "title": "Name of the fellowship", "role": "Awarding body", "date": "2026-04" }
```

A project:

```json
{
  "id": "multimodal-search",
  "group": "AI/ML",
  "title": "Multimodal search",
  "start": "2025-06",
  "end": "2025-08",
  "summary": "One line on what it does.",
  "thumbnail": "assets/cv/multimodal-search.png",
  "links": { "live": "https://...", "code": "https://github.com/..." },
  "featured": true,
  "details": [{ "heading": "overview,", "text": "..." }]
}
```

A community contribution:

```json
{ "id": "some-repo", "group": "Open Source", "title": "Project name", "role": "Contributor", "start": "2025-01", "links": { "github": "https://github.com/..." } }
```

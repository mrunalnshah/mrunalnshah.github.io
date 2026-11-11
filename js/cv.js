// Draws pages from data/cv.json. Needs js/data.js. Three kinds of page use
// this script, and each is recognized by the element it provides:
//
//   cv.html, with <div id="cv">: the whole CV, every non-empty section.
//   projects.html, with <div id="cv-projects">: featured entries, then the
//     sections marked `projectsPage` as filterable galleries. Each part's
//     id is its section id (or "featured"), so projects.html#research
//     leads straight to it.
//   entry.html?section=<id>&id=<id>, with <div id="cv-entry">: one entry's
//     own page, from its `details`. Lists link here for every entry that
//     has details.
//
// Everything meant to be customized is in data/cv.json; this file only
// draws it.

(function () {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // data/cv.json, set once it has loaded.
  let CV;

  // "2026-09" -> "Sep 2026", "2024" -> "2024".
  function formatDate(date) {
    const [year, month] = date.split("-");
    return month ? `${MONTHS[month - 1]} ${year}` : year;
  }

  // "Sep 2026 – present", or a single date for one-off entries like awards.
  function formatDates(entry) {
    if (entry.date) return formatDate(entry.date);
    if (!entry.start) return "";
    const end = entry.end ? formatDate(entry.end) : "present";
    return `${formatDate(entry.start)} – ${end}`;
  }

  // Title and dates on one line, role and location on the next: the part
  // of an entry shown both on cv.html and on the entry's own page.
  function factsHTML(entry, titleTag) {
    let html = `
      <div class="cv-row">
        <${titleTag} class="cv-title">${entry.title}</${titleTag}>
        <span class="cv-meta">${formatDates(entry)}</span>
      </div>`;

    if (entry.role || entry.location) {
      html += `
      <div class="cv-row">
        <span>${entry.role || ""}</span>
        <span class="cv-meta">${entry.location || ""}</span>
      </div>`;
    }
    return html;
  }

  // "[learn more →] [paper] [code]".
  function linksHTML(links, moreHref) {
    const items = [];
    if (moreHref) items.push(`[<a href="${moreHref}">learn more →</a>]`);
    for (const [label, href] of Object.entries(links || {})) {
      items.push(`[<a href="${siteURL(href)}">${label}</a>]`);
    }
    return items.length ? `<p class="cv-meta">${items.join(" ")}</p>` : "";
  }

  // The URL of an entry's own page, or null if it has no details.
  function pageURL(section, entry) {
    if (!entry.details || entry.details.length === 0) return null;
    return siteURL(`entry.html?section=${section.id}&id=${entry.id}`);
  }

  // The entry's thumbnail (or the default), linking to its page if it has one.
  // The default is marked cv-placeholder so it is fitted, not cropped, in
  // wide boxes.
  function imageHTML(section, entry, className) {
    const src = siteURL(entry.thumbnail || CV.defaultThumbnail);
    const classes = entry.thumbnail ? className : `${className} cv-placeholder`;
    const img = `<img class="${classes}" src="${src}" alt="" loading="lazy" />`;
    const page = pageURL(section, entry);
    return page ? `<a href="${page}" tabindex="-1">${img}</a>` : img;
  }

  function summaryHTML(entry) {
    return entry.summary ? `<p>${entry.summary}</p>` : "";
  }

  // Sections that have something to show, optionally only those matching.
  function sectionsWithEntries(keep = () => true) {
    return CV.sections.filter((s) => keep(s) && s.entries && s.entries.length > 0);
  }

  // [[group, entries], ...]: groups in order of first appearance, entries in
  // their listed order, and ungrouped entries first under the group "".
  function groupEntries(entries) {
    const groups = new Map([["", []]]);
    for (const entry of entries) {
      const group = entry.group || "";
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(entry);
    }
    return [...groups].filter(([, list]) => list.length > 0);
  }

  // ---- cv.html -----------------------------------------------------------

  // One entry on cv.html. In thumbnail sections it is laid out as
  // [thumbnail | text].
  function entryHTML(section, entry) {
    const text = `
      ${factsHTML(entry, "span")}
      ${summaryHTML(entry)}
      ${linksHTML(entry.links, pageURL(section, entry))}`;

    if (!section.thumbnails) {
      return `<div class="cv-entry">${text}</div>`;
    }

    return `
      <div class="cv-entry cv-card">
        ${imageHTML(section, entry, "cv-thumb")}
        <div>${text}</div>
      </div>`;
  }

  function renderCV(container) {
    let html = "";

    if (CV.pdf) {
      html += `<p class="cv-meta">[<a href="${siteURL(CV.pdf)}">pdf</a>]</p>`;
    }

    for (const section of sectionsWithEntries()) {
      html += `<h3>${section.title},</h3>`;
      // Ungrouped entries are always shown; each group starts collapsed so
      // the page stays short, and readers open only what interests them.
      for (const [group, entries] of groupEntries(section.entries)) {
        const list = entries.map((entry) => entryHTML(section, entry)).join("");
        html += group
          ? `<details class="cv-group">
               <summary>${group} <span class="cv-count">(${entries.length})</span></summary>
               ${list}
             </details>`
          : list;
      }
    }

    container.innerHTML = html;
  }

  // ---- projects.html -----------------------------------------------------

  // Featured entries first, as large cards, then each `projectsPage`
  // section as a gallery that can be filtered by group. "jump to" links at
  // the top lead to each part, and each part hides or shows from its heading.
  function renderProjects(container) {
    const sections = sectionsWithEntries((s) => s.projectsPage);
    const featured = sections.flatMap((s) =>
      s.entries.filter((e) => e.featured).map((e) => featureHTML(s, e))
    );

    // [anchor id, heading, contents]
    const parts = [];
    if (featured.length > 0) {
      parts.push(["featured", "featured", featured.join("")]);
    }
    for (const section of sections) {
      const tiles = section.entries.map((entry) => tileHTML(section, entry)).join("");
      parts.push([
        section.id,
        section.title,
        filtersHTML(section.entries) + `<div class="cv-gallery">${tiles}</div>`,
      ]);
    }

    const jump = parts.map(([id, title]) => `[<a href="#${id}">${title}</a>]`);
    container.innerHTML =
      `<p class="cv-meta">jump to: ${jump.join(" ")}</p>` +
      parts.map(([id, title, contents]) => `
        <details class="cv-part" id="${id}" open>
          <summary><h3>${title},</h3></summary>
          ${contents}
        </details>`).join("");

    container.addEventListener("click", onProjectsClick);

    // The parts didn't exist when the browser looked for #research in the
    // URL (e.g. from an entry page's back link), so go there now.
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) {
      target.open = true;
      target.scrollIntoView();
    }
  }

  // A large card: full-width photo, then title, section and dates, summary,
  // and links.
  function featureHTML(section, entry) {
    const meta = [section.title, formatDates(entry)].filter(Boolean).join(" · ");
    return `
      <div class="cv-feature">
        ${imageHTML(section, entry, "cv-feature-img")}
        <div class="cv-row">
          <span class="cv-title">${entry.title}</span>
          <span class="cv-meta">${meta}</span>
        </div>
        ${summaryHTML(entry)}
        ${linksHTML(entry.links, pageURL(section, entry))}
      </div>`;
  }

  // One gallery tile: photo on top, then group and dates, title, summary,
  // and links. `data-group` is what the filters match against.
  function tileHTML(section, entry) {
    const meta = [entry.group, formatDates(entry)].filter(Boolean).join(" · ");
    return `
      <div class="cv-tile" data-group="${entry.group || ""}">
        ${imageHTML(section, entry, "cv-tile-img")}
        ${meta ? `<div class="cv-meta cv-small">${meta}</div>` : ""}
        <div class="cv-title">${entry.title}</div>
        ${summaryHTML(entry)}
        ${linksHTML(entry.links, pageURL(section, entry))}
      </div>`;
  }

  // "all  Safety AI  Medical Imaging": buttons that narrow a gallery to one
  // group. A section without groups gets none.
  function filtersHTML(entries) {
    const groups = groupEntries(entries).map(([group]) => group).filter(Boolean);
    if (groups.length === 0) return "";

    const buttons = [["", "all"], ...groups.map((g) => [g, g])].map(
      ([value, label]) =>
        `<button type="button" data-filter="${value}" aria-pressed="${value === ""}">${label}</button>`
    );
    return `<p class="cv-filters">${buttons.join("")}</p>`;
  }

  function onProjectsClick(event) {
    const button = event.target.closest("[data-filter]");
    if (button) {
      const part = button.closest(".cv-part");
      const group = button.dataset.filter;
      for (const b of part.querySelectorAll("[data-filter]")) {
        b.setAttribute("aria-pressed", b === button);
      }
      for (const tile of part.querySelectorAll(".cv-tile")) {
        tile.hidden = group !== "" && tile.dataset.group !== group;
      }
      return;
    }

    // A "jump to" link opens its part in case it was hidden.
    const jump = event.target.closest('a[href^="#"]');
    if (jump) {
      const part = document.getElementById(jump.hash.slice(1));
      if (part) part.open = true;
    }
  }

  // ---- entry.html --------------------------------------------------------

  function renderEntry(container) {
    const params = new URLSearchParams(location.search);
    const sectionId = params.get("section");
    const id = params.get("id");
    const section = CV.sections.find((s) => s.id === sectionId);
    const entry = section && (section.entries || []).find((e) => e.id === id);

    if (!entry) {
      container.innerHTML =
        `<p>No entry "${id}" in section "${sectionId}" of data/cv.json.</p>` +
        backLinksHTML(section || {});
      return;
    }

    document.title = `${entry.title} | ${document.title}`;
    container.innerHTML = `
      ${backLinksHTML(section)}
      ${entry.thumbnail ? `<img class="cv-photo" src="${siteURL(entry.thumbnail)}" alt="" />` : ""}
      ${factsHTML(entry, "h2")}
      ${linksHTML(entry.links)}
      <article class="cv-body">${detailsHTML(entry.details || [])}</article>`;
  }

  // "[← cv] [← projects]": back to every page that lists this entry.
  function backLinksHTML(section) {
    const items = [`[<a href="${siteURL("cv.html")}">← cv</a>]`];
    if (section.projectsPage) {
      items.push(`[<a href="${siteURL(`projects.html#${section.id}`)}">← projects</a>]`);
    }
    return `<p class="cv-meta cv-back">${items.join(" ")}</p>`;
  }

  // An entry's details: each block may have a heading, text (a paragraph or
  // a list of them), items (a bulleted list), and an image with a caption,
  // shown in that order.
  function detailsHTML(details) {
    return details.map((block) => {
      const paragraphs = [].concat(block.text || []);
      return [
        block.heading ? `<h3>${block.heading}</h3>` : "",
        ...paragraphs.map((p) => `<p>${p}</p>`),
        block.items ? `<ul>${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>` : "",
        block.image ? `<img src="${siteURL(block.image)}" alt="${block.caption || ""}" />` : "",
        block.caption ? `<p class="cv-meta">${block.caption}</p>` : "",
      ].join("");
    }).join("");
  }

  // ------------------------------------------------------------------------

  const pages = [
    ["cv", renderCV],
    ["cv-projects", renderProjects],
    ["cv-entry", renderEntry],
  ];

  loadData("cv").then((cv) => {
    CV = cv;
    for (const [id, render] of pages) {
      const container = document.getElementById(id);
      if (container) render(container);
    }
  });
})();

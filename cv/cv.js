// Draws the CV from `CV` in data.js. Load data.js first. Two kinds of page
// use this script, and each is recognized by the element it provides:
//
//   cv.html, with <div id="cv">: the whole CV, every non-empty section.
//   cv/<section>/<id>.html, with <header id="cv-entry">: that entry's facts.
//     The page finds its entry from its own folder and file name, so a
//     copied page only needs renaming.
//
// Everything meant to be customized is in data.js; this file only draws it.

(function () {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

  // "[learn more →] [code] [paper]", in the style of projects.html.
  function linksHTML(links, moreHref) {
    const items = [];
    if (moreHref) items.push(`[<a href="${moreHref}">learn more →</a>]`);
    for (const [label, href] of Object.entries(links || {})) {
      items.push(`[<a href="${href}">${label}</a>]`);
    }
    return items.length ? `<p class="cv-meta">${items.join(" ")}</p>` : "";
  }

  // One entry on cv.html. In thumbnail sections it is laid out as
  // [thumbnail | text], with the thumbnail linking to the entry's page.
  function entryHTML(section, entry) {
    const page = entry.page ? `cv/${section.id}/${entry.id}.html` : null;
    const text = `
      ${factsHTML(entry, "span")}
      ${entry.summary ? `<p>${entry.summary}</p>` : ""}
      ${linksHTML(entry.links, page)}`;

    if (!section.thumbnails) {
      return `<div class="cv-entry">${text}</div>`;
    }

    const img = `<img class="cv-thumb" src="${entry.thumbnail || CV.defaultThumbnail}" alt="" loading="lazy" />`;
    return `
      <div class="cv-entry cv-card">
        ${page ? `<a href="${page}" tabindex="-1">${img}</a>` : img}
        <div>${text}</div>
      </div>`;
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

  function renderCV(container) {
    let html = "";

    if (CV.pdf) {
      html += `<p class="cv-meta">[<a href="${CV.pdf}">pdf</a>]</p>`;
    }

    for (const section of CV.sections) {
      if (!section.entries || section.entries.length === 0) continue;

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

  function renderEntryHeader(container) {
    // .../cv/<section>/<id>.html
    const [sectionId, file] = location.pathname.split("/").slice(-2);
    const id = file.replace(/\.html$/, "");
    const section = CV.sections.find((s) => s.id === sectionId);
    const entry = section && (section.entries || []).find((e) => e.id === id);

    if (!entry) {
      container.innerHTML =
        `<p>No entry "${id}" in section "${sectionId}" of cv/data.js. Add one, or rename this page or its folder to match.</p>`;
      return;
    }

    document.title = `${entry.title} | mrunalnshah`;
    container.innerHTML = factsHTML(entry, "h2") + linksHTML(entry.links);
  }

  const cv = document.getElementById("cv");
  const entryHeader = document.getElementById("cv-entry");
  if (cv) renderCV(cv);
  if (entryHeader) renderEntryHeader(entryHeader);
})();

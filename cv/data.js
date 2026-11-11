// Everything the CV says. cv.html lists these, and each entry's own page
// (cv/<section id>/<entry id>.html) shows the same facts as its header, so
// edit a fact here and both places change.
//
// Sections appear on cv.html in the order written below, and entries within a
// section in the order listed (put the newest first). A section with no
// entries is hidden. Each section has:
//
//   id          folder for its entries' pages: cv/<id>/
//   title       heading on cv.html
//   thumbnails  optional: true shows each entry as [thumbnail | text]
//   projectsPage  optional: true also lists the section on projects.html,
//               and its entry pages link back there as well as to the CV
//   entries     the entries, each with:
//
//     id         name unique within its section, also the file name of its
//                page: "silver-touch" -> cv/experience/silver-touch.html
//     group      optional: subheading within the section, e.g. "AI/ML" or
//                "Safety AI". Entries sharing a group are shown together
//                under a collapsed "[+] Safety AI (2)" that readers can open,
//                groups in the order they first appear; ungrouped entries
//                come first and are always shown.
//     title      school, company, project, or award name
//     role       optional: degree, position, or awarding body
//     location   optional
//     start      "YYYY-MM" or "YYYY"
//     end        same format; leave it out while ongoing ("present")
//     date       instead of start/end, for one-off things like an award
//     summary    optional: a line or two for cv.html (may contain HTML)
//     thumbnail  optional: image path from the site root, e.g.
//                "assets/cv/pneumonia.jpg". Shown at the top of the entry's
//                page, and in thumbnail sections, where entries without one
//                show `defaultThumbnail` (below).
//     links      optional: { paper: "https://...", code: "https://..." },
//                shown in that order as [paper] [code]. Research usually
//                has paper and code; projects live (if any) and code.
//     page       true if the entry has its own page; cv.html then links to
//                it with [learn more →]
//     featured   optional, in `projectsPage` sections: true also shows the
//                entry at the top of projects.html as a large card. Two or
//                three is plenty.
//
// To give an entry its own page: copy cv/_template.html into
// cv/<section id>/, rename it to <entry id>.html, replace the details, and
// set `page: true`.
//
// To add a section, add it to `sections` below; only sections whose entries
// have pages need a folder.

const CV = {
  // Link for [pdf] on cv.html, relative to the site root, e.g. "assets/cv.pdf".
  // Leave it "" to hide the link.
  pdf: "",

  // Shown in thumbnail sections for entries without their own `thumbnail`.
  defaultThumbnail: "assets/cv/default-thumbnail.svg",

  // Ordered the way a research CV is usually read: training first, then what
  // you have written to teach, research output, recognition of it, where you
  // have worked, what you have built, and how you give back.
  sections: [
    {
      id: "education",
      title: "education",
      entries: [
        {
          id: "northeastern",
          title: "Northeastern University",
          role: "M.S. in Artificial Intelligence",
          start: "2026-09",
          summary:
            "Focus on messy data, semantic model building, and multimodal architectures across Computer Vision, NLP, and Reinforcement Learning.",
          page: true,
        },
      ],
    },

    {
      id: "books",
      title: "books & tutorials",
      thumbnails: true,
      entries: [
        {
          id: "ai-from-first-principles",
          title: "AI from First Principles",
          links: { read: "https://mrunalnshah.github.io/ai-from-first-principles/" },
        },
      ],
    },

    {
      id: "research",
      title: "research",
      thumbnails: true,
      projectsPage: true,
      entries: [
        {
          id: "pneumonia-detection",
          group: "Medical Imaging",
          title: "Pneumonia detection from chest X-rays",
          role: "Bachelor's research",
          start: "TODO",
          end: "TODO",
          summary:
            "Computer vision for pneumonia detection from chest X-ray images, and two curated datasets.",
          page: true,
        },
      ],
    },

    {
      id: "awards",
      title: "awards & fellowships",
      entries: [
        // {
        //   id: "some-fellowship",
        //   title: "Name of the award or fellowship",
        //   role: "Awarding body",
        //   date: "2026-04",
        // },
      ],
    },

    {
      id: "experience",
      title: "experience",
      entries: [
        {
          id: "silver-touch",
          title: "Silver Touch Technologies",
          role: "AI/ML Engineer Intern",
          start: "TODO",
          end: "2026-05",
          summary: "AI models for user compliance and violation detection.",
          page: true,
        },
      ],
    },

    {
      id: "projects",
      title: "projects",
      thumbnails: true,
      projectsPage: true,
      entries: [
        // {
        //   id: "some-project",
        //   group: "AI/ML",
        //   title: "Project name",
        //   start: "2025-06",
        //   end: "2025-08",
        //   summary: "One line on what it does.",
        //   thumbnail: "assets/cv/some-project.png",
        //   links: { code: "https://github.com/..." },
        //   page: true,
        // },
      ],
    },

    {
      id: "community",
      title: "community",
      entries: [
        // {
        //   id: "some-contribution",
        //   title: "Open-source project, club, or event",
        //   role: "Contributor, organizer, mentor, reviewer, ...",
        //   start: "2025-01",
        //   links: { github: "https://github.com/..." },
        // },
      ],
    },
  ],
};

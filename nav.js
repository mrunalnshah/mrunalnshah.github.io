// The top of every page: a small line of social links, then the nav. Put
// this where they should appear, with the path to this file from the page:
//
//   <script src="nav.js"></script>          pages in the site root
//   <script src="../../nav.js"></script>    pages in cv/<section>/
//
// To add, remove, or rename a tab or a social link, edit LINKS or SOCIAL;
// every page picks it up. The tab for the page you're on is marked
// aria-current="page" (underlined).

(function () {
  // [label, href relative to the site root, folder whose pages also count as
  // this tab (optional)]
  const LINKS = [
    ["Home", "index.html"],
    ["AI from First Principles", "https://mrunalnshah.github.io/ai-from-first-principles/"],
    ["Blogs", "https://mrunalnshah.substack.com/"],
    ["Projects", "projects.html"],
    ["CV", "cv.html", "cv/"],
  ];

  // [label, href]
  const SOCIAL = [
    ["GitHub", "https://github.com/mrunalnshah/"],
    ["LinkedIn", "https://linkedin.com/in/mrunalnshah"],
  ];

  const script = document.currentScript;
  const root = new URL(".", script.src).href;
  const here = location.href.split(/[?#]/)[0];

  function isCurrent(href, folder) {
    const url = new URL(href, root).href;
    if (here === url) return true;
    if (href === "index.html" && here === root) return true;
    return Boolean(folder) && here.startsWith(new URL(folder, root).href);
  }

  const links = LINKS.map(([label, href, folder]) => {
    const current = isCurrent(href, folder) ? ' aria-current="page"' : "";
    return `<a href="${new URL(href, root).href}"${current}>${label}</a>`;
  });

  const social = SOCIAL.map(([label, href]) => `<a href="${href}">${label}</a>`);

  script.insertAdjacentHTML(
    "beforebegin",
    `<div class="social">\n${social.join("\n")}\n</div>\n` +
      `<nav>\n${links.join("\n")}\n</nav>`
  );
})();

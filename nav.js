// The nav at the top of every page. Put this where the nav should appear,
// with the path to this file from the page:
//
//   <script src="nav.js"></script>          pages in the site root
//   <script src="../../nav.js"></script>    pages in cv/<section>/
//
// To add, remove, or rename a tab, edit LINKS; every page picks it up. The
// tab for the page you're on is marked aria-current="page" (underlined).

(function () {
  // [label, href relative to the site root, folder whose pages also count as
  // this tab (optional)]
  const LINKS = [
    ["Home", "index.html"],
    ["AI from First Principles", "https://mrunalnshah.github.io/ai-from-first-principles/"],
    ["Blogs", "https://mrunalnshah.substack.com/"],
    ["Projects", "projects.html"],
    ["GitHub", "https://github.com/mrunalnshah/"],
    ["LinkedIn", "https://linkedin.com/in/mrunalnshah"],
    ["CV", "cv.html", "cv/"],
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

  script.insertAdjacentHTML("beforebegin", `<nav>\n${links.join("\n")}\n</nav>`);
})();

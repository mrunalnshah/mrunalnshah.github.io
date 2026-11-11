// The top of every page, from data/site.json: a small line of social links,
// then the nav. Put this where they should appear, after js/data.js:
//
//   <script src="js/nav.js"></script>
//
// The tab for the page you're on is marked aria-current="page" (underlined).

(function () {
  // Captured now: document.currentScript is null once the data arrives.
  const script = document.currentScript;
  const here = location.href.split(/[?#]/)[0];
  const home = siteURL("");

  function isCurrent(link) {
    return [link.href, ...(link.alsoCurrentOn || [])].some((page) => {
      const url = siteURL(page);
      return here === url || (url === siteURL("index.html") && here === home);
    });
  }

  loadData("site").then((site) => {
    const nav = site.nav.map((link) => {
      const current = isCurrent(link) ? ' aria-current="page"' : "";
      return `<a href="${siteURL(link.href)}"${current}>${link.label}</a>`;
    });
    const social = site.social.map((link) => `<a href="${siteURL(link.href)}">${link.label}</a>`);

    script.insertAdjacentHTML(
      "beforebegin",
      `<div class="social">\n${social.join("\n")}\n</div>\n` +
        `<nav>\n${nav.join("\n")}\n</nav>`
    );
  });
})();

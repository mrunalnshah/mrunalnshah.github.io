// Loads the site's content from data/<name>.json. Load this first, in
// <head>; the other scripts in js/ use the two functions below, so where the
// data lives and how its paths are read is decided only here.
//
//   loadData("cv")      -> a promise of the parsed data/cv.json
//   siteURL("cv.html")  -> a full URL for a path written relative to the
//                          site root, as every path in data/ is
//
// If a file is missing or isn't valid JSON, the page says so at the top and
// loadData never resolves, so the page draws nothing from a bad file and
// callers don't need to handle errors.

const siteURL = (function () {
  const root = new URL("..", document.currentScript.src).href;
  return (path) => new URL(path, root).href;
})();

function loadData(name) {
  const file = `data/${name}.json`;
  return fetch(siteURL(file))
    .then((response) => {
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response.json();
    })
    .catch((error) => {
      showDataError(file, error);
      return new Promise(() => {});
    });
}

function showDataError(file, error) {
  const hint =
    location.protocol === "file:"
      ? " Pages read data/ over the web: run <code>python -m http.server</code> in the site folder and open http://localhost:8000."
      : "";
  const show = () =>
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<p style="color: #a32d2d">Couldn't read ${file}: ${error.message}.${hint}</p>`
    );

  if (document.body) show();
  else document.addEventListener("DOMContentLoaded", show);
}

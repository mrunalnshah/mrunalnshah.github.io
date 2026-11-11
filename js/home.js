// The home page (index.html), from data/home.json, drawn into
// <div id="home">. Needs js/data.js.

(function () {
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];

  // "2026-09-09" -> "[September - 09 - 2026]"
  function formatNewsDate(date) {
    const [year, month, day] = date.split("-");
    return `[${MONTHS[month - 1]} - ${day} - ${year}]`;
  }

  function render(home) {
    const currently = home.currently || [];
    const news = home.news || [];

    let html = `
      <img src="${siteURL(home.photo.src)}" alt="${home.photo.alt}" />

      <h2 style="margin-bottom: 0">${home.greeting}</h2>
      <p style="margin-top: 2px">I am <span class="signature">${home.name}</span>.</p>

      <p class="bio">${home.bio}</p>`;

    if (currently.length > 0) {
      html += `<h3>currently,</h3>` + currently.map((p) => `<p>${p}</p>`).join("");
    }

    if (news.length > 0) {
      const items = news.map((item) => `<p>${formatNewsDate(item.date)} ${item.text}</p><br />`);
      html += `<h3>news,</h3><div class="news">${items.join("")}</div>`;
    }

    if (home.announcement) {
      html += `<h3>announcement</h3><div class="announcement"><p>${home.announcement}</p></div>`;
    }

    document.getElementById("home").innerHTML = html;
  }

  loadData("home").then(render);
})();

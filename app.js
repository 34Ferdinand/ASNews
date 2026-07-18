const app = document.getElementById("app");

let currentCategory = "world";
let currentArticles = [];

const today = new Date();

const weekday = today.toLocaleDateString("en-GB", {
  weekday: "long"
});

const dateString = today.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

function createLayout() {

  app.innerHTML = `
    <header class="header">

      <div class="logo">
        <span class="arc">ArcSearch</span>
        <span class="news">NEWS</span>
      </div>

      <div class="laser"></div>

      <div class="today">
        <span class="weekday">${weekday}</span>
        <span class="date">${dateString}</span>
      </div>

      <nav class="categories">

        <button class="cat active"
                data-category="world">
          WORLD
        </button>

        <button class="cat"
                data-category="tech">
          TECH
        </button>

        <button class="cat"
                data-category="sport">
          SPORT
        </button>

      </nav>

    </header>

    <main id="articles"></main>
  `;

  document
    .querySelectorAll(".cat")
    .forEach(button => {

      button.addEventListener("click", () => {

        if (button.dataset.category === currentCategory)
          return;

        document
          .querySelector(".cat.active")
          ?.classList.remove("active");

        button.classList.add("active");

        currentCategory = button.dataset.category;

        loadCategory(currentCategory);

      });

    });

}

function renderArticles(articles) {

  currentArticles = articles;

  const container =
    document.getElementById("articles");

  if (!articles.length) {

    container.innerHTML = `
      <div class="card">
        <h2>No articles found.</h2>
      </div>
    `;

    return;

  }

  container.innerHTML = articles.map(article => `

      <article class="card"
               onclick="window.open('${article.link}','_blank')">

          <h2>${article.title}</h2>

          <div class="meta">

              ${article.source}

          </div>

      </article>

  `).join("");

}
async function loadCategory(category) {

  const container = document.getElementById("articles");

  container.innerHTML = `
    <div class="card">
      <h2>Loading...</h2>
    </div>
  `;

  const feeds = NEWS_SOURCES[category];

  let articles = [];

  for (const feed of feeds) {

    try {

      const url =
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(feed.url);

      const response = await fetch(url);

      const data = await response.json();

      if (!data.items)
        continue;

      const parsed = data.items.map(item => ({

        title: item.title,

        link: item.link,

        source: feed.name,

        date: new Date(item.pubDate)

      }));

      articles.push(...parsed);

    } catch (error) {

      console.error(feed.name, error);

    }

  }

  articles.sort((a, b) => b.date - a.date);

  renderArticles(
    articles.slice(0, 10)
  );

}
function escapeHtml(text) {

  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;

}

// Suprascrie renderArticles pentru a evita probleme cu caractere speciale
renderArticles = function (articles) {

  currentArticles = articles;

  const container = document.getElementById("articles");

  if (!articles.length) {

    container.innerHTML = `
      <div class="card">
        <h2>No articles found.</h2>
      </div>
    `;

    return;
  }

  container.innerHTML = articles.map(article => `

    <article class="card">

      <h2>${escapeHtml(article.title)}</h2>

      <div class="meta">
        ${escapeHtml(article.source)}
      </div>

    </article>

  `).join("");

  container.querySelectorAll(".card").forEach((card, index) => {

    card.addEventListener("click", () => {
      window.open(currentArticles[index].link, "_blank");
    });

  });

};

createLayout();
loadCategory("world");
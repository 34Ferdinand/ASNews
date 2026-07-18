const app = document.getElementById("app");

const articles = {
  world: [
    {
      title:
        "Global leaders meet for renewed talks amid growing international pressure",
      source: "BBC News",
      url: "#"
    },
    {
      title:
        "European governments announce a new coordinated economic initiative",
      source: "Euronews",
      url: "#"
    },
    {
      title:
        "Latest developments reshape the international political landscape",
      source: "Associated Press",
      url: "#"
    },
    {
      title:
        "Ukraine reports fresh developments as diplomatic efforts continue",
      source: "The Kyiv Independent",
      url: "#"
    }
  ],

  tech: [
    {
      title:
        "New generation of mobile devices focuses on efficiency and privacy",
      source: "The Verge",
      url: "#"
    },
    {
      title:
        "Developers explore lighter and faster approaches to modern web apps",
      source: "Ars Technica",
      url: "#"
    },
    {
      title:
        "Apple prepares another round of software and hardware updates",
      source: "MacRumors",
      url: "#"
    }
  ],

  sport: [
    {
      title:
        "Major sporting events deliver a weekend of close and dramatic contests",
      source: "BBC Sport",
      url: "#"
    },
    {
      title:
        "Top players prepare for the next stage of the international tennis season",
      source: "ATP Tour",
      url: "#"
    },
    {
      title:
        "Teams reassess tactics ahead of the decisive part of the season",
      source: "The Athletic",
      url: "#"
    }
  ]
};

let activeCategory = "world";

function getDateParts() {
  const now = new Date();

  const weekday = new Intl.DateTimeFormat("en-GB", {
    weekday: "long"
  }).format(now);

  const calendarDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(now);

  return {
    weekday,
    calendarDate
  };
}

function renderArticleCards(category) {
  return articles[category]
    .map(
      (article) => `
        <a
          class="article-card"
          href="${article.url}"
          aria-label="${article.title}"
        >
          <h2 class="article-title">
            ${article.title}
          </h2>

          <p class="article-source">
            ${article.source}
          </p>
        </a>
      `
    )
    .join("");
}

function renderApp() {
  const { weekday, calendarDate } = getDateParts();

  app.innerHTML = `
    <div class="app">

      <header class="hero">
        <div class="hero-content">

          <h1 class="main-title">
            <span class="arcsearch">ArcSearch</span>
            <span class="news">NEWS</span>
          </h1>

          <div class="laser" aria-hidden="true"></div>

          <p class="date-line">
            <span class="weekday">${weekday}</span>
            <span class="date-separator">·</span>
            <span class="calendar-date">${calendarDate}</span>
          </p>

        </div>
      </header>

      <nav class="categories" aria-label="News categories">

        <button
          class="category ${activeCategory === "world" ? "active" : ""}"
          data-category="world"
        >
          WORLD
        </button>

        <button
          class="category ${activeCategory === "tech" ? "active" : ""}"
          data-category="tech"
        >
          TECH
        </button>

        <button
          class="category ${activeCategory === "sport" ? "active" : ""}"
          data-category="sport"
        >
          SPORT
        </button>

      </nav>

      <section class="articles">
        ${renderArticleCards(activeCategory)}
      </section>

    </div>
  `;

  addCategoryListeners();
}

function addCategoryListeners() {
  const categoryButtons =
    document.querySelectorAll(".category");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderApp();
    });
  });
}

renderApp();
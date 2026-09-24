const likedMovies = [
  { title: "Maharaja", year: 2024, tags: ["Revenge", "Mystery"] },
  { title: "Ratsasan", year: 2018, tags: ["Serial killer", "Investigation"] },
  { title: "Andhadhun", year: 2018, tags: ["Dark comedy", "Crime"] },
  { title: "Vikram Vedha", year: 2017, tags: ["Crime", "Moral ambiguity"] },
  { title: "Drishyam", year: 2015, tags: ["Cover-up", "Family"] },
  { title: "Drishyam 2", year: 2022, tags: ["Investigation", "Cover-up"] },
  { title: "Kahaani", year: 2012, tags: ["Mystery", "Twist"] },
  { title: "Thadam", year: 2019, tags: ["Murder", "Identity"] },
  { title: "Talvar", year: 2015, tags: ["Investigation", "True crime"] },
  { title: "A Wednesday!", year: 2008, tags: ["Thriller", "Tension"] },
  { title: "Por Thozhil", year: 2023, tags: ["Serial killer", "Procedural"] },
  { title: "Mumbai Police", year: 2013, tags: ["Investigation", "Twist"] },
  { title: "Anjaam Pathiraa", year: 2020, tags: ["Serial killer", "Crime"] },
  { title: "Iratta", year: 2023, tags: ["Crime", "Psychological"] },
  { title: "Dhuruvangal Pathinaaru", year: 2016, tags: ["Investigation", "Nonlinear"] },
  { title: "Raat Akeli Hai", year: 2020, tags: ["Whodunit", "Investigation"] },
  { title: "HIT: The First Case", year: 2020, tags: ["Missing person", "Procedural"] },
  { title: "HIT: The Second Case", year: 2022, tags: ["Serial killer", "Procedural"] },
  { title: "Kooman", year: 2022, tags: ["Crime", "Psychological"] },
  { title: "Jaane Jaan", year: 2023, tags: ["Murder", "Deception"] },
  { title: "Ittefaq", year: 2017, tags: ["Whodunit", "Conflicting stories"] },
  { title: "Badla", year: 2019, tags: ["Locked room", "Twist"] },
  { title: "Monica, O My Darling", year: 2022, tags: ["Dark comedy", "Murder"] },
  { title: "Haseen Dillruba", year: 2021, tags: ["Murder", "Romance"] }
];

const services = [
  { name: "Netflix", mono: "N" },
  { name: "Prime Video", mono: "P" },
  { name: "ZEE5", mono: "Z5" },
  { name: "SonyLIV", mono: "SL" },
  { name: "Disney+", mono: "D+" },
  { name: "Hulu", mono: "H" },
  { name: "YouTube Premium", mono: "YT" }
];

const recommendations = [
  {
    title: "Gone Girl",
    year: 2014,
    rating: 8.1,
    language: "English",
    service: "Netflix",
    reason: "Missing-person mystery, manipulation and major reversals.",
    tags: ["Psychological", "Mystery"]
  },
  {
    title: "Prisoners",
    year: 2013,
    rating: 8.2,
    language: "English",
    service: "YouTube",
    reason: "A brutal disappearance case with a relentless investigation.",
    tags: ["Investigation", "Dark"]
  },
  {
    title: "The Girl with the Dragon Tattoo",
    year: 2011,
    rating: 7.8,
    language: "English",
    service: "Netflix",
    reason: "A decades-old disappearance opens into a much darker mystery.",
    tags: ["Cold case", "Mystery"]
  },
  {
    title: "Wind River",
    year: 2017,
    rating: 7.7,
    language: "English",
    service: "Netflix",
    reason: "Grounded murder investigation with atmosphere and a strong payoff.",
    tags: ["Murder", "Procedural"]
  },
  {
    title: "Zodiac",
    year: 2007,
    rating: 7.7,
    language: "English",
    service: "YouTube",
    reason: "Dense, methodical investigation built around clues and obsession.",
    tags: ["True crime", "Procedural"]
  }
];

const colors = [
  "rgba(255,77,93,.10)",
  "rgba(169,84,255,.10)",
  "rgba(63,168,255,.10)",
  "rgba(240,195,106,.10)"
];

const watchedKey = "movie-vault-watchlist";
const saved = new Set(JSON.parse(localStorage.getItem(watchedKey) || "[]"));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function likedCard(movie, index) {
  return `
    <article class="movie-card" style="--card-glow:${colors[index % colors.length]}">
      <div class="movie-top">
        <span class="movie-year">${escapeHtml(movie.year)}</span>
        <span class="badge">LIKED</span>
      </div>
      <h3>${escapeHtml(movie.title)}</h3>
      <div class="movie-footer">
        <div class="tags">
          ${movie.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function recommendationCard(movie, index) {
  const isSaved = saved.has(movie.title);
  return `
    <article class="movie-card" style="--card-glow:${colors[index % colors.length]}">
      <div class="movie-top">
        <span class="movie-year">${escapeHtml(movie.year)} • ${escapeHtml(movie.language)}</span>
        <span class="rating">★ ${movie.rating.toFixed(1)}</span>
      </div>
      <h3>${escapeHtml(movie.title)}</h3>
      <p>${escapeHtml(movie.reason)}</p>
      <div class="movie-footer">
        <div class="tags">
          <span class="service-pill">${escapeHtml(movie.service)}</span>
          ${movie.tags.slice(0, 1).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <button
          class="watch-toggle ${isSaved ? "saved" : ""}"
          data-title="${escapeHtml(movie.title)}"
          aria-pressed="${isSaved}"
        >${isSaved ? "Saved ✓" : "Save"}</button>
      </div>
    </article>
  `;
}

function renderLiked(query = "") {
  const grid = document.getElementById("likedGrid");
  const empty = document.getElementById("emptyState");
  const q = query.trim().toLowerCase();
  const filtered = likedMovies.filter(movie =>
    movie.title.toLowerCase().includes(q) ||
    movie.tags.some(tag => tag.toLowerCase().includes(q))
  );
  grid.innerHTML = filtered.map(likedCard).join("");
  empty.hidden = filtered.length !== 0;
}

function renderRecommendations(language = "all") {
  const grid = document.getElementById("recommendationGrid");
  const filtered = language === "all"
    ? recommendations
    : recommendations.filter(movie => movie.language === language);
  grid.innerHTML = filtered.map(recommendationCard).join("");
}

function renderServices() {
  document.getElementById("servicesGrid").innerHTML = services.map(service => `
    <div class="service-card">
      <span class="service-monogram">${escapeHtml(service.mono)}</span>
      <strong>${escapeHtml(service.name)}</strong>
    </div>
  `).join("");
}

document.getElementById("likedCount").textContent = likedMovies.length;
document.getElementById("serviceCount").textContent = services.length;

renderLiked();
renderRecommendations();
renderServices();

document.getElementById("movieSearch").addEventListener("input", event => {
  renderLiked(event.target.value);
});

document.getElementById("recommendationFilters").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  document.querySelectorAll("#recommendationFilters .chip").forEach(chip => chip.classList.remove("active"));
  button.classList.add("active");
  renderRecommendations(button.dataset.filter);
});

document.getElementById("recommendationGrid").addEventListener("click", event => {
  const button = event.target.closest(".watch-toggle");
  if (!button) return;
  const title = button.dataset.title;
  if (saved.has(title)) {
    saved.delete(title);
  } else {
    saved.add(title);
  }
  localStorage.setItem(watchedKey, JSON.stringify([...saved]));
  const active = document.querySelector("#recommendationFilters .chip.active");
  renderRecommendations(active?.dataset.filter || "all");
});

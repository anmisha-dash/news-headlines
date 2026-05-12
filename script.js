let currentCategory = 'technology';

function setCategory(btn, category) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCategory = category;
  loadNews();
}

async function loadNews() {
  showLoader();

  try {
    const res  = await fetch(
      `https://gnews.io/api/v4/top-headlines?topic=${currentCategory}&lang=en&max=9&apikey=demo`
    );
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      useFallback();
      return;
    }

    displayNews(data.articles);
  } catch (err) {
    useFallback();
  }
}

function useFallback() {
  const fallback = getFallbackNews(currentCategory);
  displayNews(fallback);
}

function displayNews(articles) {
  const grid = document.getElementById('newsGrid');
  grid.innerHTML = '';

  hideLoader();
  document.getElementById('errorBox').style.display = 'none';

  articles.forEach(article => {
    const card = document.createElement('a');
    card.className = 'news-card';
    card.href      = article.url || '#';
    card.target    = '_blank';

    const image = article.image || article.urlToImage
      ? `<img class="news-image" src="${article.image || article.urlToImage}"
           alt="news" onerror="this.style.display='none';
           this.nextElementSibling.style.display='flex'" loading="lazy" />
         <div class="news-no-image" style="display:none">📰</div>`
      : `<div class="news-no-image">📰</div>`;

    const source = article.source?.name || 'News';
    const title  = article.title || 'No title';
    const desc   = article.description || '';
    const date   = article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric'
        })
      : 'Recent';

    card.innerHTML = `
      ${image}
      <div class="news-body">
        <div class="news-source">${source}</div>
        <div class="news-title">${title}</div>
        <div class="news-desc">${desc}</div>
        <div class="news-footer">
          <span class="news-date">${date}</span>
          <span class="news-read">Read more →</span>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function getFallbackNews(category) {
  const topics = {
    technology: [
      { title: 'AI is transforming the way we work and live', source: { name: 'Tech Today' }, description: 'Artificial intelligence continues to reshape industries across the globe, from healthcare to finance.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'New programming languages gaining popularity in 2024', source: { name: 'Dev Weekly' }, description: 'Developers are exploring new languages that promise better performance and developer experience.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Open source projects hitting record contributions', source: { name: 'GitHub Blog' }, description: 'The open source community has never been more active, with millions of contributions daily.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Web development trends to watch this year', source: { name: 'CSS Tricks' }, description: 'From server components to edge computing, the web development landscape is evolving fast.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Cloud computing adoption reaches all time high', source: { name: 'Cloud News' }, description: 'More businesses than ever are moving their infrastructure to the cloud for better scalability.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Cybersecurity threats on the rise globally', source: { name: 'Security Weekly' }, description: 'Experts warn that cyberattacks are becoming more sophisticated and frequent in 2024.', publishedAt: new Date().toISOString(), url: '#' },
    ],
    science: [
      { title: 'Scientists discover new species in the deep ocean', source: { name: 'Science Daily' }, description: 'A new expedition to the deepest parts of the ocean has revealed extraordinary new life forms.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'NASA prepares for next Moon mission', source: { name: 'Space.com' }, description: 'The Artemis program is on track to return humans to the Moon within the next few years.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Breakthrough in quantum computing announced', source: { name: 'Physics Today' }, description: 'Researchers have achieved a new milestone in quantum computing that could change computing forever.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Climate change effects accelerating faster than predicted', source: { name: 'Nature' }, description: 'New research shows that climate change is happening at a faster rate than previously thought.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'New planet discovered outside our solar system', source: { name: 'Astronomy Now' }, description: 'Astronomers have identified a new exoplanet that could potentially support life.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Gene therapy shows promise for rare diseases', source: { name: 'Medical Science' }, description: 'A new gene therapy approach is showing remarkable results in early clinical trials.', publishedAt: new Date().toISOString(), url: '#' },
    ],
    health: [
      { title: 'New study reveals benefits of daily walking', source: { name: 'Health Today' }, description: 'Just 30 minutes of walking a day can significantly reduce the risk of heart disease.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Mental health awareness reaches new heights', source: { name: 'Mind Matters' }, description: 'More people than ever are seeking mental health support as stigma continues to decrease.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Breakthrough cancer treatment shows 90% success rate', source: { name: 'Medical News' }, description: 'A new immunotherapy treatment is showing unprecedented results in cancer patients.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Sleep deprivation linked to serious health risks', source: { name: 'Sleep Foundation' }, description: 'New research confirms that consistently getting less than 7 hours of sleep has major health impacts.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Mediterranean diet proven to boost longevity', source: { name: 'Nutrition Today' }, description: 'A long term study confirms the Mediterranean diet is one of the healthiest eating patterns.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Yoga and meditation reduce stress by 40 percent', source: { name: 'Wellness Weekly' }, description: 'Clinical studies show significant stress reduction in people who practice yoga regularly.', publishedAt: new Date().toISOString(), url: '#' },
    ],
    sports: [
      { title: 'India wins cricket series against Australia', source: { name: 'Sports Today' }, description: 'The Indian cricket team secured a historic victory in the final test match.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Olympics 2024 breaks viewership records', source: { name: 'ESPN' }, description: 'The Paris Olympics attracted the highest ever global television audience in history.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Football transfer window sees record spending', source: { name: 'Sky Sports' }, description: 'European football clubs spent a record breaking amount during the summer transfer window.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'New world record set in 100m sprint', source: { name: 'Athletics Weekly' }, description: 'A new world record was set at the World Athletics Championship in a stunning performance.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Chess world championship draws millions of viewers', source: { name: 'Chess.com' }, description: 'The world chess championship became a global phenomenon with millions watching online.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'E-sports industry valued at 2 billion dollars', source: { name: 'Game News' }, description: 'The e-sports industry continues to grow rapidly with major investments from traditional sports teams.', publishedAt: new Date().toISOString(), url: '#' },
    ],
    business: [
      { title: 'Global economy shows signs of recovery', source: { name: 'Financial Times' }, description: 'Key economic indicators suggest the global economy is stabilizing after years of uncertainty.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Startup funding reaches record high in Asia', source: { name: 'Business Insider' }, description: 'Asian startups attracted unprecedented venture capital investment in the first quarter.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Remote work becomes permanent for many companies', source: { name: 'Forbes' }, description: 'Major corporations are making remote and hybrid work permanent policies for their employees.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'Electric vehicle market growing at record pace', source: { name: 'Business Today' }, description: 'EV sales are surging globally as prices fall and infrastructure expands.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'India emerges as top destination for investments', source: { name: 'Economic Times' }, description: 'Foreign direct investment in India has reached record levels, driven by digital growth.', publishedAt: new Date().toISOString(), url: '#' },
      { title: 'AI companies attract billions in venture funding', source: { name: 'TechCrunch' }, description: 'Artificial intelligence startups are attracting massive investment from around the world.', publishedAt: new Date().toISOString(), url: '#' },
    ]
  };

  return topics[category] || topics.technology;
}

function showLoader() {
  document.getElementById('loader').style.display   = 'flex';
  document.getElementById('newsGrid').innerHTML     = '';
  document.getElementById('errorBox').style.display = 'none';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// set date
document.getElementById('dateText').textContent = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
});

loadNews();
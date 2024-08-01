function fetchAndUpdateNews() {
    const newsContainer = document.querySelector(".news-container");
    const rss2jsonURL = "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/world/rss.xml";

    fetch(rss2jsonURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.status !== 'ok') {
                throw new Error('RSS feed fetch error: ' + data.message);
            }
            const articles = data.items;
            let newsHTML = "";
            articles.forEach(article => {
                newsHTML += `
                    <div class="news-article">
                        <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
                        <p>${article.description}</p>
                    </div>
                `;
            });
            newsContainer.innerHTML = newsHTML;
        })
        .catch(error => {
            console.error("Error fetching the news feed:", error);
            newsContainer.innerHTML = `<p>Failed to load news articles. Please try again later.</p>`;
        });
}

// Fetch and update news initially
fetchAndUpdateNews();

// Set interval to refresh the news feed every hour (3600000 milliseconds)
setInterval(fetchAndUpdateNews, 3600000);
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          let reg;
          reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

          console.log('Service worker registrada!', reg);
          postNews();
        } catch (err) {
          console.log('Registro de service worker falhou!', err);
        }
      });
    }

    const apiKey = '48db080a49804110b572ed0f74b01982';
    let url = `https://newsapi.org/v2/everything?q=Apple&apiKey=${apiKey}`
    const main = document.querySelector('main');

    async function postNews() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        main.innerHTML = data.articles.map(createArticle).join('\n');
      } catch (error) {
        console.error('Erro ao obter notícias', error);
      }
    }

    function createArticle(article) {
      console.log(article);
      return `
        <div class="article">
          <a href="${article.url}" target="_blank">
            <img src="${article.urlToImage}" class="image" alt="${article.content}"/>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
          </a>
        </div>
      `;
    }

    async function searchNews() {
      const searchInput = document.getElementsByClassName('searchInput').value;
      url = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${apiKey}`;
      await postNews();
    }

    postNews();

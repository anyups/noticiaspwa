  if('serviceWorker' in navigator){
    window.addEventListener('load', async () => {
      try{
        let reg;
        reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });
  
        console.log('service worker registrada!', reg);
      } catch (err) {
        console.log('registro de service worker falhou!', err);
      }
    });
  }

  const apiKey = '48db080a49804110b572ed0f74b01982';
  let url = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`;
  const main = document.querySelector('main');

  async function postNews(){
    const res = await fetch(url);
    const data = await res.json();
    main.innerHTML = daat.articles.map(createArticle).join('\n');
  }

  function createArticle(article){
    console.log(article);
    return `
        <div class="article">
            <a href="${article.url}" target="_blank">
            <img src="${article.urlToImage}"
            class="image" alt="${article.content}"/>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a/>
        </div>
    `
  }
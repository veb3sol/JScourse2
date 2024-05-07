// Custom Http Module
function customHttp() {
  return {
    get(url, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
    post(url, body, headers, cb) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.addEventListener('load', () => {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(`Error. Status code: ${xhr.status}`, xhr);
            return;
          }
          const response = JSON.parse(xhr.responseText);
          cb(null, response);
        });

        xhr.addEventListener('error', () => {
          cb(`Error. Status code: ${xhr.status}`, xhr);
        });

        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }

        xhr.send(JSON.stringify(body));
      } catch (error) {
        cb(error);
      }
    },
  };
}
// Init http module
const http = customHttp();

// Блок отвечает за API
const newsService = (function(){
  const apiKey = '64521643b9fa4a1c9289d1292525ff9c'
  const apiUrl = 'https://newsapi.org/v2'
  return {
    topHeadlines(country='ua', cb){
      http.get(`${apiUrl}/top-headlines?country=${country}&category=technology&apiKey=${apiKey}`, cb)
    },
    everything(query, cb){
      http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, cb)
    }
  }
})();

//  init selects
// когда загрузится док - подгрузятся плагины материалайза
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
  loadNews();  // при загрузке страницы - вызываем функцию загрузки топ-новостей
});

// загрузка новостей при первой загрузке странички
function loadNews(){
  newsService.topHeadlines('ua', onGetResponse);
}

//функция которая отработает когда будут получены новост
function onGetResponse(err, res){
  renderNews(res.articles)
}

// рендер новостей
function renderNews(news){
  const newsContainer = document.querySelector('.row.grid-container')
  let fragment = ''
  news.forEach(newsItem => {
    fragment += newsTemplate(newsItem)
  })

  newsContainer.insertAdjacentHTML('afterbegin', fragment)

}

// рендерим 1 новость
function newsTemplate({urlToImage, title, description}){
  return `
  <div class="col s12">
    <div class="card">
      <div class="card-image">
        <img src="${urlToImage}" >
        <span class="card-title">${title || " "}</span>
      </div>
      <div class="card-content">
        <p>${description || ' '}</p>
      </div>
    </div>
  </div>
  `
}

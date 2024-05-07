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
    topHeadlines(country, cb){
      http.get(`${apiUrl}/top-headlines?country=${country}&category=technology&apiKey=${apiKey}`, cb)
    },
    everything(query, cb){
      console.log(query)
      http.get(`${apiUrl}/everything?q=${query}&apiKey=${apiKey}`, cb)
    }
  }
})();

// поля формы
const form = document.forms['newsControls']
const countrySelect = form.elements['country']
const searchInput = form.elements['search']

// слушатель отправки на форму
form.addEventListener('submit', e => {
  e.preventDefault()
  loadNews()
})

//  init selects
// когда загрузится док - подгрузятся плагины материалайза
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
  loadNews();  // при загрузке страницы - вызываем функцию загрузки топ-новостей
});

// загрузка новостей при первой загрузке странички
function loadNews(){
  showLoader();
  const country = countrySelect.value
  const searchText = searchInput.value
  if(!searchText){
    newsService.topHeadlines(country, onGetResponse)
  } else {
    newsService.everything(searchText, onGetResponse)
  }
  
}

//функция которая отработает когда будут получены новост
function onGetResponse(err, res){
  removeLoader()
  if(err){
    showAlert(err, 'error-msg')
    return
  }
  if(!res.articles.length){
    // показать что статьей таких нету !!!!
    console.log(111111)
    return
  }
  renderNews(res.articles)
}

// рендер новостей
function renderNews(news){
  const newsContainer = document.querySelector('.row.grid-container')
  if(newsContainer.children.length){
    clearContainer(newsContainer)
  }
  let fragment = ''
  news.forEach(newsItem => {
    fragment += newsTemplate(newsItem)
  })

  newsContainer.insertAdjacentHTML('afterbegin', fragment)

}

// очистка новостей
function clearContainer(clearContainer){
  // container.innerHTML = ''
  let child = clearContainer.lastElementChild;
  while(child){
    clearContainer.removeChild(child)
    child = clearContainer.lastElementChild
  }
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

function showAlert(msg, type = 'success'){
  M.toast({html: msg, classes: type})
  // матириалайз html - что показывать,  classes - какой класс подставить
}

// показ прилодера - с матириалз
function showLoader(){
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<div class="progress">
      <div class="indeterminate"></div>  
    </div>`);
}

// функция скрытия лоудера
function removeLoader(){
  const louder = document.querySelector('.progress')
  if(louder){
    louder.remove()
  }
}

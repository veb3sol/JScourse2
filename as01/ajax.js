
// получим нашу кнопку
const btn = document.querySelector('button')


function getPosts(cb){      //передаем колбэк
const xhr =  new XMLHttpRequest(); // создаем экземпляр

// открытие запроса (не отправляет запрос а только настраивает его)
xhr.open('get', 'https://jsonplaceholder.typicode.com/posts');
// 1пар - метод запроса
// url куда мы будем делать запрос

// подписываемся на событие
// load - событие когда мы успешно получили данные от сервера
xhr.addEventListener('load', () => {
    // при ошибке 404 - {} -- общение с сервером успешное
    const resp = JSON.parse(xhr.responseText) //преобразуем ответ от сервера в массив
    console.log('loaded')
    cb(resp)

});

// Обработка ошибок
xhr.addEventListener('error', () => {
    console.log('error') // вывод ошибки
})

// Делаем запрос на сервер
xhr.send();   // просто запрос, данные не передаем

//console.log(xhr.responseText) // пустая строка - ответ еще не пришел
}

function renderPosts(respo){
    const fragment = document.createDocumentFragment();
        respo.forEach(post => {
            const card = document.createElement('div')
            card.classList.add('card')
            const cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
            const title = document.createElement('h5')
            title.classList.add('card-title')
            title.textContent = post.title
            const article = document.createElement('p')
            article.classList.add('card-text')
            article.textContent = post.body
            cardBody.appendChild(title)
            cardBody.appendChild(article)
            card.appendChild(cardBody)
            fragment.appendChild(card)
        });

        container.appendChild(fragment)
}

const container = document.querySelector('.container')
btn.addEventListener('click', e => {
    getPosts(renderPosts)
} )




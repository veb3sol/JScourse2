
// получим наши кнопки
const btnGetPosts = document.querySelector('.btn-primary')
const btnAddPost = document.querySelector('.btn-danger')


function getPosts(cb){      //передаем колбэк
const xhr =  new XMLHttpRequest(); // создаем экземпляр
console.log(55555)
// открытие запроса (не отправляет запрос а только настраивает его)
xhr.open('get', 'http://jsonplaceholder.typicode.com/posts');
// 1пар - метод запроса
// url куда мы будем делать запрос

// подписываемся на событие
// load - событие когда мы успешно получили данные от сервера
xhr.addEventListener('load', () => {
    // при ошибке 404 - {} -- но общение с сервером будет считаться как успешное
    // xhr.responseText --- тут ответ от сервера
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

console.log(xhr.responseText) // пустая строка - ответ еще не пришел
}

// создание поста
function createPost(body, cb){  //отправляем тело запроса и колбэк
    console.log('111111')
    const xhr =  new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
    xhr.addEventListener('load', () => {
    const resp = JSON.parse(xhr.responseText)
    console.log('loaded')
    cb(resp)
    })

    // устанавливает заголовки что бы получать полный ответ
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    // Обработка ошибок
    xhr.addEventListener('error', () => {
    console.log('error') // вывод ошибки
    })
    xhr.send(JSON.stringify(body)); 
}
// создание 1 карточки поста
function cardTamplate(post){
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
    return card
}

// рендер постов
function renderPosts(respo){
    const fragment = document.createDocumentFragment();
        respo.forEach(post => {
            const card = cardTamplate(post)
            fragment.appendChild(card)
        });

        container.appendChild(fragment)
}

const container = document.querySelector('.container')

// обработчики на кнопки
btnGetPosts.addEventListener('click', e => {
    getPosts(renderPosts)
})
btnAddPost.addEventListener('click', e => {
    const newPost = {
        title: 'Новый пост',
        body: 'barrrrrrrrr',
        userId: 1,
    }
    createPost(newPost, (resp)=>{
        const card = cardTamplate(resp)
        container.insertAdjacentElement('afterbegin', card)
    })
})

// Корсы - предзапрос на сервер, и ответ в котором указано на какие адреса и на какие методы сервер даст ответ
// let promise = fetch(url, [options])
// 1 арг -- адрес куда делаем запрос
// 2 арг -- обьект с опциями запроса, если это не get запрос (метод, заголовки)

//const zap = fetch('https://jsonplaceholder.typicode.com/posts')
//console.log(zap)   // Promise { <pending> } - получаем обьект промиса

// zap
//     .then(response => {
//         console.log(response)       //получаем обьект ответа с методами
//         // console.log(response.json())    --- промис в котором есть посты
//         return response.json()
//     })
//     .then(posts => console.log(posts))     //получим тело ответа -- сами посты
//     .catch(err => console.log(err))

// заворачиваем все в функцию
// function myzz(idPost){
//     return new Promise((resolve, reject) =>{
//         fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`)
//         .then(res => res.json())
//         .then(post => resolve(post))
//         .catch(err => reject(err))
//     })
// }

// myzz(2).then(post => console.log(post))
// функция вернет или пост или ошибку

// необезательно fetch оборачивать в промис, так как он сам является промисом
// 2 вариант
function myzz2(idPost){    
    const[userType, postId] = idPost.split('-')   //но если в функцию попадет цифра - не отработает ничего!!!
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json())     
    }


myzz2('user-2')
    .then(post => console.log(post))
    .catch(err => console.log(err))
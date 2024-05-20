function http(){
    return {
        get(url, cb){
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.addEventListener("load", () => {
                  // если статус не 200 с чем то
                  if (Math.floor(xhr.status / 100) !== 2) {
                    cb(`Ошибка ${xhr.status}`, xhr);
                    return;
                  }
                  const resp = JSON.parse(xhr.responseText);
                //   console.log("loaded");
                  cb(null, resp);
                });
            
                // Обработка ошибок
                xhr.addEventListener("error", () => {
                  console.log("error"); // вывод ошибки
                });
                xhr.send();
              } catch (error) {
                cb(error)
              }
        },
        post(url, body, headers={}, cb){
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.addEventListener("load", () => {
                  // если статус не 200 с чем то
                  if (Math.floor(xhr.status / 100) !== 2) {
                    cb(`Ошибка ${xhr.status}`, xhr);
                    return;
                  }
                  const resp = JSON.parse(xhr.responseText);
                  console.log("loaded");
                  cb(null, resp);
                });

                // добавляем все заголовки если они есть
                if(headers){
                    Object.entries(headers).forEach(([key, value])=>{
                        xhr.setRequestHeader(key, value)
                    })
                }
            
                // Обработка ошибок
                xhr.addEventListener("error", () => {
                  console.log("error"); // вывод ошибки
                });
                xhr.send(JSON.stringify(body));
              } catch (error) {
                cb(error)
              }
        }
    }
}

// система которую тяжело поддерживать
const myHttp = http()

// myHttp.get(
//     `https://jsonplaceholder.typicode.com/posts`,
//     (err, res) => {
//         if(err){
//             console.log(err)
//             return
//         }
//         myHttp.get(
//             `https://jsonplaceholder.typicode.com/comments?postId=1`,
//             (err, res) => {
//                 if(err){
//                     console.log(err)
//                     return
//                 }
//                 myHttp.get(
//                     `https://jsonplaceholder.typicode.com/users/1`,
//                     (err, res) => {
//                         if(err){
//                             console.log(err)
//                             return
//                         }
//                         console.log('наконец то')
//                     }

//                 )
//             }
//         )
//     }
// )

// Способ написать все удобно
// функция получения поста
function getPost(id){
    return new Promise((resolve, reject) => {       //вернем промис
        // промис принимает функцию, у которой аргументы две функции
        // resolve - сработает когда все ок
        // reject - сработает когда ошибка
        myHttp.get(             // запрос принимает адрес  и колбэк
            `https://jsonplaceholder.typicode.com/posts/${id}`, 
            (err, res) => {         // колбэк принимает ошибку и ответ от сервера
                if(err){            // если есть ошибка - вызываем reject
                    reject(err)
                }
                resolve(res)    //если все ок -- resolve и передаем в него ответ сервера
            }
        )
    })
}

// функция получения коментов к посту
function getPostComments(post){

    const {id} = post
    return new Promise((resolve, reject) => {       
        myHttp.get(             
            `https://jsonplaceholder.typicode.com/comments?postId=${id}`, 
            (err, res) => {         
                if(err){            
                    reject(err)
                }
                resolve({post, comments: res}) //обьект - потому что в resolve можно передавать только один аргумент   
            }
        )
    })
}

// функция получения автора поста
function getUserCreatedPost(data){
    const {post: {userId}} = data
    console.log(userId)
    return new Promise((resolve, reject) => {       
        myHttp.get(             
            `https://jsonplaceholder.typicode.com/users/${userId}`, 
            (err, res) => {         
                if(err){            
                    reject(err)
                }
                resolve({...data, user: res})    
            }
        )
    })
}

// вызов функций способом с промисами

// console.log(getPost()) -- получим исполненный промис
//getPost().then(post => console.log(post))   // получим пост

// вызываем цепочной методы с помощью then
// getPost(56)
//     .then(post => getPostComments(post))
//     .then(data => getUserCreatedPost(data))
//     .then(fullData => console.log(fullData))
//     .catch(err => console.log(err))
//     .finally(() => console.log('final'))
// на выходе: автор пост, сам пост, коментарии к посту
// finally - выполняется всегда, есть ошибка или нету


// выполняем несколько промисов и получаем результат в одном then
// функция получения поста
function getPost2(id){
    return new Promise((resolve, reject) => {       //вернем промис
        // промис принимает функцию, у которой аргументы две функции
        // resolve - сработает когда все ок
        // reject - сработает когда ошибка
        myHttp.get(             // запрос принимает адрес  и колбэк
            `https://jsonplaceholder.typicode.com/posts/${id}`, 
            (err, res) => {         // колбэк принимает ошибку и ответ от сервера
                if(err){            // если есть ошибка - вызываем reject
                    reject(err)
                }
                resolve(res)    //если все ок -- resolve и передаем в него ответ сервера
            }
        )
    })
}

// функция получения коментов к посту
function getPostComments2(id){
    return new Promise((resolve, reject) => {       
        myHttp.get(             
            `https://jsonplaceholder.typicode.com/comments?postId=${id}`, 
            (err, res) => {         
                if(err){            
                    reject(err)
                }
                resolve(res) //обьект - потому что в resolve можно передавать только один аргумент   
            }
        )
    })
}

// функция получения автора поста 2
function getUserCreatedPost(userId){
    return new Promise((resolve, reject) => {       
        myHttp.get(             
            `https://jsonplaceholder.typicode.com/users/${userId}`, 
            (err, res) => {         
                if(err){            
                    reject(err)
                }
                resolve(res)    
            }
        )
    })
}

// Promise.all([
//     getPost2(23),
//     getPostComments2(23),
//     getUserCreatedPost(1)
// ]).then(fulData => console.log(fulData))
// then получит массив с тремя элементами - это ответы от функций(от функций-промисов)
// 23 - id статьи
// 1 - id автора

Promise.all([
    getPost2(1),
    getPostComments2(1),
    getUserCreatedPost(1)
]).then(([post, comments, user]) => console.log(post, comments, user))
.catch(err => console.log(err))
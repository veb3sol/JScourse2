// общий метод запросов
function myHttpRequest({ method, url } = {}, cb) {
  try {
    // const xhr = new XMLHttpRequest();
    xhr.open(method, url);
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

    // Обработка ошибок
    xhr.addEventListener("error", () => {
      console.log("error"); // вывод ошибки
    });
    xhr.send();
  } catch (error) {
    cb(error)
  }
}

// myHttpRequest(
//   {
//     method: "GET",
//     url: "https://jsonplaceholder.typicode.com/posts",
//   },
//   (err, res) => {
//     // тут проверяем есть ли ошибка и что то делаем
//     if (err) {
//       console.log(err);
//       return;
//     }

//     console.log(res);
//   }
// );

// универсальная функция для get и post
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
                  console.log("loaded");
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

// вызов общего метода
const myHttp = http() //вернется обьект с get и post

// отправка post
myHttp.post('https://jsonplaceholder.typicode.com/posts', {
    title: 'Новый пост',
    body: 'barrrrrrrrr',
    userId: 1,
}, {'Content-type':'application/json'}, (err, res) => {
    console.log(err, res)
} )
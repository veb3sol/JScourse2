// что бы цепочка функций при ошибке в одной из них не передавала ошибку по цепочке
// используем не колбэки а промисы

// промис принимает колбэк - resolve и reject - функции
// resolve - вызывается когда нету ошибок и все отработало хорошо
// reject - вызывается при ошибке

// если вызывается resolve то reject не может вызываться!!! - и на оборот!
// resolve и reject могут принимать только по одному аргументу!!!!
 
const promise = new Promise((resolve, reject) => {
    setTimeout(()=>resolve(Math.random()), 5000);
});

console.log(promise) // Promise <pending>  pending - статус, что обьявлено но не использовано

//promise.then(1arg, 2arg)   --- принимает функции!!!
// 1 arg - функция, которая выполняется когда норм отработала основная функция
// 2 arg - функция, которая выполнится если были ошибки

//promise.then(x => console.log(x)) // сработает через 5 сек

// могут быть цепочки then
promise.then(x => {
    console.log(x)
    return x
})
    .then(y => console.log(y))
    .catch(err => console.log(err)) 
    // подписываемся на ошибку в цепочке, не важно в каком then будет ошибка
    // и если даже ошибка будет в промисе - мы попадем в catch

// промисы, then, catch - для того что бы:
    //в асинхронных функциях не вызывать с одной функции другую
    // не передавать инфу об возможной ошибке с обной функции в другую
    // не проверять в следующий вызнаных функциях ошибки от предыдущих функций
    // вместо этого всего - catch - единый обработчик ошибок
    // если срабатывает reject - то then не выполняется - сразу выполняется catch
    // если не указать catch то может быть ошибка
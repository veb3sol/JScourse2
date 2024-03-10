// 15. Как работать с css variables из javascript
const s = window.getComputedStyle(document.body)
const ss = window.getComputedStyle(document.documentElement) //аналог
//console.log(ss) // обьект всех свойств
const ss1 = ss.getPropertyValue('--box-tg')
//console.log(ss1) //black - значение установленной переменной
const sss = document.body.style.getPropertyValue('--box-tg')
// console.log(sss) //пустая строка

// установка значения для всего документа (в root)
document.body.style.setProperty('--box-tg', 'red')

// изменение переменных css в блоке
document.querySelector('.box').style.setProperty('--box-tg', 'green')

// одну и ту же переменную можем задавать каждому элементу с разными значениями


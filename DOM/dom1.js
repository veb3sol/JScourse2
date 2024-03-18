// 1. Введение в DOM

const div = document.querySelector('div')       // получим первый div
console.log(div)        // весь тег полностью с внутренностями
// или посмотреть в ввиде обьекта 
console.dir(div)    // обьект с морем свойств и методов, внизу Prototype - указывает на класс элемента

// https://developer.mozilla.org/ru/docs/Web/API/Element -- что такое елемент и какие у него свойства и методы -- читать!!!

// получить все h1
const titles = document.querySelectorAll('h1')          // NodeList(2) -- список элементов
console.dir(titles)

// NodeList(2) -- псевдо массив - есть forEach но нету map

// для того что бы работать как с массивави - надо преобразовать в массив -- 
// 1 метод преобразования в массив -- Array.from(titles)

console.dir(Array.from(titles))                 // Array(2) получаем массив

// 2 метод преобразования в массив -- Старый метод преобразования в массив Array.prototype.slice.call(titles)  -- call - вызов в контексте
console.log(Array.prototype.slice.call(titles))     // тоже получим массив

// 3 метод преобразования в массив - используем иттератор
console.log([...titles])    //получаем массив с пом иттератора для NodeList


// при изменении инфы в ДОМе - NodeList не поменяется - это типа снимок нашего дома  !!!!

const h1 = document.getElementsByTagName('h1')      //HTMLCollection(2) [h1, h1] - меняется ДИНАМИЧЕСКИ!
console.log(h1)

// получить следующий элемент
console.log(div.nextSibling) // text - \n -- перенос строки воспринимается как следующий на тэгом текст
console.log(div.nextElementSibling)  // <script src="dom.js"></script> - следующий за домом тэг

// получить первый дочерний узел/элемент
console.log(div.firstChild)         // " Lorem ipsum " - получим текст в div
console.log(div.firstElementChild)  // a.link - получим ссылку внутри div -- получаем следующий тег

// console.log(document.body.firstChild.nextSibling)  -- и мы можем получить коментарий

console.log(document.body)  // весь документ 
console.log(document.links)     // все ссылки
console.log(document.forms)     // все формы

// BOM - неоф название которое нам предоставляет:       -- читать
// window - обьект с которого берем алерт, сеттаймаут....
// navigator - наш браузер и его свойства
// location - окружение -- части с которыми мы можем взаимодействовать ---- наверное части браузера???

// получить родительский элемент
console.log(div.parentElement)
console.log(div.parentNode)

const link = div.querySelector('.link')
console.log(link)       //<a href class="link">dolor</a>  -- та ссылка что в div
const par = link.parentElement      // div - вернет прямого родителя
console.log(par.closest('.content'))   // div - вернет ближайшего родителя с указаными параметрами
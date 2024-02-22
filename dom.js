// 1. Введение в DOM

const div = document.querySelector('div')
console.log(div)
// или посмотреть в ввиде обьекта 
console.dir(div)

// получить все h1
const titles = document.querySelectorAll('h1')          // NodeList(2)
console.dir(titles)
console.dir(Array.from(titles))                 // Array(2) получаем массив
console.log(Array.prototype.slice.call(titles))     // тоже получим массив
console.log([...titles])    //получаем массив с пом иттератора для NodeList

// при изменении инфы в ДОМе - NodeList не поменяется - это типа снимок нашего дома

const h1 = document.getElementsByTagName('h1')      //HTMLCollection(2) [h1, h1] - меняется ДИНАМИЧЕСКИ!
console.log(h1)

console.log(div.nextSibling) // text - \n -- перенос строки воспринимается как следующий на тэгом текст
console.log(div.nextElementSibling)  // <script src="dom.js"></script> - следующий за домом тэг

console.log(div.firstChild)         // " Lorem ipsum " - получим текст в div
console.log(div.firstElementChild)  // a.link - получим ссылку внутри div

console.log(document.body)  // весь документ 
console.log(document.links)     // все ссылки
console.log(document.forms)     // все формы

// получить родительский элемент
console.log(div.parentElement)
console.log(div.parentNode)

const link = div.querySelector('.link')
console.log(link)       //<a href class="link">dolor</a>  -- та ссылка что в div
console.log(link.parentElement)       // div - вернет прямого родителя
console.log(link.closest('.content'))       // div - вернет ближайшего родителя с указаными параметрами
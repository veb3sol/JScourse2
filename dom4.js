// 4. Манипуляция DOM элементами

const title = document.querySelector('h1')
//const div = document.querySelector('.content')

// замена содержимого тэга
//title.innerHTML = '<span>textiik</span>'        //небезопасный метод!!!!!

//замена текста - все даже тэги будут выведены в виде текста
//title.textContent = '<span>textiik2222</span>'              //<span>textiik2222</span>

// вставка на определенную позицию - их 4 
//title.insertAdjacentHTML('beforebegin', '<h2>Африка1</h2>')

// почему innerHTML - опасно применять?
//title.innerHTML += '<span>Добавка1</span>'
//const span = title.querySelector('span')
//console.log(span)       //<span>Добавка1</span> --- <span>newssss</span> c 20 строки!!!
//title.innerHTML += '<span>Добавка2</span>'
//span.innerHTML = 'newssss'      // НИЧЕГО НЕ ПОМЕНЯЛОСЬ!!! - innerHTML удалил все обьекты в title

// Вывод - если с блока взяли элемент, потом к блоку применили innerHTML, то при изменении элемента в блоке ничего не поменяется!!!!

// Создание элемента в title где innerHTML удалил все обьекты
const span1 = document.createElement('span')    // создаем элемент - его еще нету в разиметке
span1.textContent = "Это созданный новый элемент"       //наполняем элемент текстом
span1.classList.add('newclass')     //добавляем класс 
console.log(span1) 
// добавляем созданый элемент в разметку
title.appendChild(span1)        // добавляем как ребенка в title

div.appendChild(span1)  // если добавить еще в один элемент то с предыдущего он исчезнет а сюда добавится
// ДОМ-узлы могут быть только в одном экземпляре!

// если надо создать и добавить много элементов на страничку - код асинхронный поэтому надо создать фрагмент 
const fragment = document.createDocumentFragment()  //создаем пустой фрагмент
const colors = ['red', 'yellow', 'orange']          //у нас есть массив с названиями цветов
colors.forEach((color) => {                         //перебираем масив цветов
    const item = document.createElement('div')      //создаем блок
    item.classList.add(`bg-${color}`)               //в блок добавляем класс
    item.style.background = color               // добавляем фон через стили
    item.textContent = color                    // наполняем содержимое 
    fragment.appendChild(item)                  //добавляем блок в фрагмент
})
document.body.appendChild(fragment)         //добавляем содержимое фрагмента в body

// Фрагмент - это коробка в которую мы напихали элементов и потом всех их вместе добавили на страничку. при этом фрагмент выгружает все из себя в бади а сам пропадает

// Удаление элемента со страницы
// 1 способ - не поддерживается в E-11
// title.remove()
// 2 способ
// title.parentElement.removeChild(title)  -- удаление через обращение к родителю!
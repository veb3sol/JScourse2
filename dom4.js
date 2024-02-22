// 4. Манипуляция DOM элементами

const title = document.querySelector('h1')
const div = document.querySelector('.content')

// замена содержимого тэга
title.innerHTML = '<span>textiik</span>'        //небезопасный метод!!!!!

//замена текста - все даже тэги будут выведены в виде текста
title.textContent = '<span>textiik2222</span>'              //<span>textiik2222</span>

// вставка на определенную позицию - их 4 
title.insertAdjacentHTML('beforebegin', '<h2>Африка1</h2>')

// почему innerHTML - опасно применять?
title.innerHTML += '<span>Добавка1</span>'
const span = title.querySelector('span')
console.log(span)       //<span>Добавка1</span>
title.innerHTML += '<span>Добавка2</span>'
span.innerHTML = 'newssss'      // НИЧЕГО НЕ ПОМЕНЯЛОСЬ!!! - innerHTML удалил все обьекты в title

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
const fragment = document.createDocumentFragment()
const colors = ['red', 'yellow', 'orange']
colors.forEach((color) => {
    const item = document.createElement('div')
    item.classList.add(`bg-${color}`)
    item.style.background = color
    item.textContent = color
    fragment.appendChild(item)
})
document.body.appendChild(fragment)

// Фрагмент - это коробка в которую мы напихали элементов и потом всех их вместе добавили на страничку

// Удаление элемента со страницы
// 1 способ
// title.remove()
// 2 способ
// title.parentElement.removeChild(title)  -- удаление через обращение к родителю!
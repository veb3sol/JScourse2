// 3. Работа с атрибутами элементов

const div = document.querySelector('div')

console.log(div.classList)      //DOMTokenList ['content', value: 'content']
// вывод всех классов, value - как записано в коде

//добавить элементу классы - любое количество через зяпятую
div.classList.add('asd', 'nasda')

// удалить классы у элемента
div.classList.remove('nasda')

// проверить наличие такого класса
const f = div.classList.contains('asd')
console.log(f)  //true

// если класса нету тобудет добавлен, если есть то удален
div.classList.toggle('togle')

// получить все классы в виде строки
const allClass = div.className
console.log(allClass)  

const link = div.querySelector('.link')
console.log(link.href)  // можем вытянуть любой атрибут

// установка нового атрибута
div.setAttribute('id', 'myID')
console.log(div.id)
div.id = 'myID2'        // перезапись id
console.log(div.getAttribute('id')) // получение любого атрибута

// проверка наличия атрибута
console.log(div.hasAttribute('id'))     //true

// удаление атрибута
div.removeAttribute('id')

// в коде можно создавать свои атрибуты с приставкой data-
console.log(div.dataset)    //{myatr: 'myatrik'} - значение кастомного атрибута без data-
console.log(div.dataset.myatr)    //myatrik    считывание значения кастомного атрибута 

// перезапись кастомного атрибута
div.dataset.myatr = 'solo'
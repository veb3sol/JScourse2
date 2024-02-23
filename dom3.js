// 3. Работа с атрибутами элементов

const div = document.querySelector('div')

// Работа с классами
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
div.classList.toggle('togle') //true - если добавлен, false - если удален

// получить все классы в виде строки
const allClass = div.className
console.log(allClass)  

const link = div.querySelector('.link')
console.log(link.href)  // ссыдка, но можем вытянуть любой атрибут

// Работа с атрибутами
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
// например есть элемент с таким атрибутом    data-myatr = "myatrik"
console.log(div.dataset)    //{myatr: 'myatrik'} - обькт с значениями кастомных атрибутов без приставки data-
console.log(div.dataset.myatr)    //myatrik    считывание значения кастомного атрибута 

// перезапись кастомного атрибута
div.dataset.myatr = 'solo'
// 8. Обработка событий

// 1 способ повесить обработчик -- он не используется
// найдем кнопку и повесим на нее событие
const btn = document.querySelector('button')
// console.dir(btn)    // смотрим сколько разных свойств к кнопки
// btn.onclick = function(){
//     console.log('click')
// }
// так не делают - из-за недостатка
// недостаток метода - можно повесить 1 обработчик, второй просто перезапишет 1

// 2 способ повесить обработчик --- делают так ...
// btn.addEventListener('click', function(){
//     console.log('click e1')
// })
// btn.addEventListener('click', function(e){
//     console.log(e)
// })
// addEventListener - парам: 
// 1 - событие
// 2 - обработчик
//  3 - какойто обькт - о нем потом ???????
// e - event - принимает ф-ция его полюбому, в нем все о событии + море хороших методов (например target, координаты клика и тип клика)


// function clicker(e){
//     e.preventDefault()  // отмена дефолтных действий для ссылки
//     console.log(this)   // тут будет сам элемент а

// }
const link = document.querySelector('a')
// link.addEventListener('click', clicker)

// удаление события
// link.removeEventListener('click', clicker)

// если мы повесили анонимную функцию - то удалить обработчик не можем
// потому что 2 аргумент - это название именно того события которое удаляем

// const link2 = document.querySelector('.l2')
// const funForClick2 = () => {
//     console.log(this) //window -- потому что стрелочная функция
//     console.log('Клик по второй ссылке')
// }
// link2.addEventListener('click', funForClick2)
// удаляем слушатель на 2 ссылку
//link2.removeEventListener('click', funForClick2) // то же самое указываем что и при создании

// передаем в событие стрелочную функцию
// btn.addEventListener('click', e => {
//     console.log(this)   // тут будет window
//     console.log(e)
// })

// а если вешать не стрелочную а обычную функцию
// const link3 = document.querySelector('.l3')
// link3.addEventListener('click', funForClick3)
// function funForClick3(e){
//     console.log(this)       //сам тэг а -- потому что повесили обычную функцию, а не стрелочную
// }

// делегирование - автоматическое добавление элементов на страничку по клику например
const container = document.querySelector('.container')

btn.addEventListener('click', e  => {
    const div = document.createElement('div')
    const nestedBtn = document.createElement('button')
    nestedBtn.textContent = 'Кнопка'
    div.textContent = Math.random()
    div.appendChild(nestedBtn)
    container.appendChild(div)
})

// повесить обработчик на каждую добавленную кнопку
// вешаем на весь контейнер, а потом смотри - если кликнули по кнопке - то что то делаем
container.addEventListener('click', e => {
    // console.dir(e.target) - смотрим море методов у кнопки
    if(e.target.tagName === 'BUTTON'){
        console.log('клик по кнопке')
    }
})







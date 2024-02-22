// 8. Обработка событий

// найдем кнопку и повесим на нее событие
const btn = document.querySelector('button')
// console.dir(btn)    // смотрим сколько разных свойств к кнопки
// btn.onclick = function(){
//     console.log('click')
// }
// так не делают - из-за недостатка
// недостаток метода - можно повесить 1 обработчик, второй просто перезапишет 1

// делают так ...
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
// e - event - принимает ф-ция его полюбому, в нем все о событии + море хороших методов


function clicker(e){
    e.preventDefault()  // отмена дефолтных действий для ссылки
    console.log(this)   // тут будет сам элемент а

}
const link = document.querySelector('a')
link.addEventListener('click', clicker)

// удаление события
// link.removeEventListener('click', clicker)

// передаем в событие стрелочную функцию
// btn.addEventListener('click', e => {
//     console.log(this)   // тут будет window
//     console.log(e)
// })

const container = document.querySelector('.container')

btn.addEventListener('click', e  => {
    const div = document.createElement('div')
    const nestedBtn = document.createElement('button')
    nestedBtn.textContent = 'Кнопка'
    div.textContent = Math.random()
    div.appendChild(nestedBtn)
    container.appendChild(div)
})

container.addEventListener('click', e => {
    // console.dir(e.target) - смотрим море методов у кнопки
    if(e.target.tagName === 'BUTTON'){
        console.log('клик по кнопке')
    }

})







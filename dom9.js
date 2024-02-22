// 9. Всплытие и погружение события

// Всплытие - когда событие висит на родителе и на вложенном эл
const btn = document.querySelector('.btn')
const wrap = document.querySelector('.wrap')

btn.addEventListener('click', e => {
    // для предовращения всплытия
    e.stopPropagation()     // останавливаем действие события на родителя, его событие не сработает
    console.log('click btn')
})

wrap.addEventListener('click', e => {
    console.log('click wrap')
}, {capture: true})

document.body.addEventListener('click', e => {
    console.log('click body')
}, {capture: true})

// кликаем по кнопке а срабатывают оба события - это всплытие!

// при погружении:....
// при {capture: true} у родителей, даже при e.stopPropagation() - отрабатывают события родителей сверху вниз

// вообще сначала происходит погружение а потом всплытие
// просто погружение мы не отслеживаем

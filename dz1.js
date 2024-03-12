// ДЗ1

// 1
// Создать функц которая принимает 2 элемента и проверяет, 
// является ли первый родителем второго

const span = document.querySelector('span')
const parentSpan = document.querySelector('.parent-3')
const parentSpan1 = document.querySelector('.parent-1')
const parentSpan2 = document.querySelector('.pusto')

function isParent(par, elem){
    return par === elem.parentElement;
}

//console.log(isParent(parentSpan, span)) // true - родитель
//console.log(isParent(parentSpan1, span)) // false - непрямой родитель

// функция с учетом всех родителей
function isParent2(par, el){
    let curentParent = el.parentElement
    let isParent = false
    while(curentParent){
        isParent = par === curentParent
        // console.log(isParent)
        if(isParent){
            curentParent = null
            // console.log('vyx')
        } else {
            curentParent = curentParent.parentElement
        }
       
    }
    return isParent
}

// console.log(isParent2(parentSpan2, span)) 

// 2
// Получить список всех ссылок, которые не входят в ul

const allLink = document.querySelectorAll('a')
const ul = document.querySelector('ul')

function noLi(links){
    let rez = []
    for(let i = 0; i < links.length; i++){
        const isLi = aIsLi(links[i])
        if(!isLi){
            rez.push(links[i].innerText)
        }
    }  
    return rez
}

function aIsLi(linok){
    curentPar = linok.parentElement
    
    let isDa = false
    while(curentPar){
        if(curentPar === ul){
            curentPar = null
            isDa = true
            
        } else {
            curentPar = curentPar.parentElement
            // console.log(curentPar)
        }
    }
    return isDa
}
console.log(noLi(allLink))

// 3. найти эл который находится перед и после списка Ul
const ulik = document.querySelector('ul')
const doulik = ulik.previousElementSibling
const posleUlik = ulik.nextElementSibling
console.log(doulik, posleUlik)

// 1 Найти параграф и получить его текст
const pp = document.querySelector('p')
console.log(pp.textContent)

// 2 создать функцию, которая принимает аргумент - узел ДОМ и возращает инфу в ввиде обьекта -- тип узла, имя узла, кол дочерних узлов (если нету - 0)
const dd = document.querySelector('.parent-1')
console.dir(dd)

function uzelInfo(obj){
    const typeOb = obj.nodeType
    const nameOb = obj.nodeName
    const colUz = obj.childNodes.length
    const rez = {
        typeOb,
        nameOb,
        colUz
    }
    return rez
}
console.log(uzelInfo(dd))

// 3 получить массив, который состоит из текста ссылок внутри списка
const ulul = document.querySelector('ul')

function allAInUl(ul){
    const aInUl = ul.querySelectorAll('a')
    rez = []
    Object.values(aInUl).forEach(e => {
        rez.push(e.textContent)
    })
    return rez
}
console.log(allAInUl(ulul))

// 4 в параграфе заменить все дочерние текстовые узлы на "-text-"(вложенные
// теги должны остаться)

// children - все только теги внутри
// childrenNode - все что внутри вместе с текстом
// nodeType - пит ноды - 1 для тега, 3 для текста
// 

const elp = document.querySelector('p')
const [...childNodes] = elp.childNodes //nodeList перегоняем в массив
console.log(childNodes)      // [text, a, text, a, text]
childNodes.forEach(node => {
    if(node.nodeType === 3){
        node.textContent = '-text-'     // -text-dolor-text-accusantium-text-
    }
})

// 1 найти в коде ul и добавить класс list
const ul1 = document.querySelector('ul')
ul1.classList.add('ul1')

// 2 найти в коде ссылку, которая находится после ul, добавить ей id=link
const ul9 = document.querySelector('ul')



function aAfter(ul){
    let nextUl9 = ul.nextElementSibling
  
    if(nextUl9.tagName === 'A'){
        nextUl9.classList.add('pizdec')
    }else{
        const aaa = nextUl9.querySelectorAll('a')
        if(aaa){
            Object.values(aaa).forEach(a => {
                a.classList.add('pizzzzzz')
            })
        }
    }
    }


aAfter(ul9)

// 3 на li (через одного) установить класс item

const olshki = document.querySelectorAll('ol')
// console.log(olshki)
cherez(olshki)
function cherez(olshki){
let f = 0
 Object.values(olshki).forEach( e => {
    if(f === 0){
        e.classList.add('item') 
        f = 1
    } else {
        f = 0
    }
 })
}

// на все ссылки в примере установить класс custom-link
const aaa = document.querySelectorAll('a')
aaa.forEach(a => {
    a.classList.add('custom-list')
})



const users = [
    {
        _id: 'q123',
        name: 'Ivan',
        age: 26,
        balance: 156
    },
    {
        _id: 's894',
        name: 'Petro',
        age: 45,
        balance: 156
    },
    {
        _id: 'x154',
        name: 'Sanya',
        age: 96,
        balance: 156
    },
    {
        _id: 'f568',
        name: 'Tatar',
        age: 78,
        balance: 156
    }
]

const sxema = {
    index: '#',
    name: 'Имя',
    age: 'Возраст',
    balance: 'Баланс',
}

// функция генерации шапки таблицы
function generateThead(sxema){
    const thead = document.createElement('thead')
    const tr = generateTr(sxema, 'th')
    thead.appendChild(tr)
    return thead
}

// функция генерации строки - или простой или для шапки
function generateTr(sxema, tegName='td'){
    const tr = document.createElement('tr')
    Object.values(sxema).forEach(val => {
        const td = document.createElement(tegName)
        td.textContent = val
        tr.appendChild(td)
    })
    return tr
}

// функция генерации тела таблицы
function generateTbody(sxema, items){
    const tbody = document.createElement('tbody')
    items.forEach((item, index) => {
        item.index = index+1
        const itemSxema = generateItemsSchema(sxema, item)
        const tr = generateTr(itemSxema, 'td')
        tbody.appendChild(tr)
    })
    return tbody
}

// функция генерации схемы таблицы для строуи боди таблицы
// sxema - общая схема таблицы, какие в ней вообще есть столбцы
// item - обьект с юзера, по данным которого мы построим строку
function generateItemsSchema(sxema, item){
    const itemSxem = Object.keys(sxema).reduce((acc, el) => {
        if(el in item){
            acc[el] = item[el]
        }
        return acc
    }, {})
    return itemSxem
}

// для генерации самого тега таблицы
function generateTableTamplate(){
    const table = document.createElement('table')
    table.classList.add('table')
    return table

}

// функция генерации тотала - последней строки
function generateTotal(sxema, users){
const total = users.reduce((acc, utem) => acc + parseFloat(utem.balance) , 0)
const tr = document.createElement('tr')
const td = document.createElement('td')
const colCol = Object.keys(sxema).length
td.insertAdjacentHTML('beforeend', `Общий баланс: ${total}`)
td.setAttribute('colspan', colCol)
td.setAttribute('align', 'right')
tr.appendChild(td)
return tr

}

// общая функция, с которой все будет начинаться
function initTable(sxema, users){
    const container = document.querySelector('.table-container')
    const table = generateTableTamplate()
    const header = generateThead(sxema)
    table.appendChild(header)
    const body = generateTbody(sxema, users)
    table.appendChild(body)

    const total = generateTotal(sxema, users)
    table.appendChild(total)


    container.appendChild(table)
}

initTable(sxema, users);
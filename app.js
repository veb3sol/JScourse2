// список задач
const tasks = [
    {
        _id: '01',
        completed: true,
        body: "Это текст для задачи №01",
        title: 'Задача 01'
    },
    {
        _id: '02',
        completed: true,
        body: "Это текст для задачи №02",
        title: 'Задача 02'
    },
    {
        _id: '03',
        completed: true,
        body: "Это текст для задачи №03",
        title: 'Задача 03'
    },
    {
        _id: '04',
        completed: true,
        body: "Это текст для задачи №04",
        title: 'Задача 04'
    },
    {
        _id: '05',
        completed: true,
        body: "Это текст для задачи №05",
        title: 'Задача 05'
    }
];

// 3 темы
const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };



// самовызывающаяся функция
(function(arrofTasks){
    // создаем обьект обьектов
    const objOfTasks = arrofTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
    }, {});

    //   последняя сохраненная тема
    let lastSelectTheme = localStorage.getItem('appTheme') || 'default';

    // Elements UI
    setTheme(lastSelectTheme)
    const listContainer = document.querySelector('.tasks-list-section .list-group');
    const form = document.forms['addTask']      // находим форму по имени
    const inputTitle = form.elements['title']   //находим импуты в форме по имени
    const inputBody = form.elements['body']
    const themeSelect = document.getElementById('themSelect')

    renderAllTasks(objOfTasks)

    // вешаем на форму обработчик submit
    form.addEventListener('submit', onFormSubmmitHandler)
    listContainer.addEventListener('click', onDeleteHendler) // по клику на список записей
    themeSelect.addEventListener('change', onThemeSelectHandler) // на изменение в селекте


    function renderAllTasks(tasksList){
        if(!tasksList){
            console.error('Передайте список задач');
            return;
        }
        // Создаем фрагмент который будем наполнять задачами
        const frag = document.createDocumentFragment()
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task)
            frag.appendChild(li)
        })

        listContainer.appendChild(frag)
    }

    function listItemTemplate({_id, title, body} = {}){
        // console.log(_id, title)
        const li = document.createElement('li')
        li.classList.add('list-group-item', 'd-flex', 'aligh-items-center', 'flex-wrap', 'mt-2')

        // на li вводим новый атрибут со значением _id
        li.setAttribute('data-task-id', _id)

        const span = document.createElement('span')
        span.textContent = title
        span.style.fontWeight = "bold"

        const delBut = document.createElement('button')
        delBut.textContent = 'Удалить'
        delBut.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn')

        const article = document.createElement('p')
        article.textContent = body
        article.classList.add('mt-2', 'w-100')

        li.appendChild(span)
        li.appendChild(delBut)
        li.appendChild(article)

        return li
    }

    // обработчик нажатия на кнопку формы - при отправке записи
    function onFormSubmmitHandler(e){
        e.preventDefault()
        // значение полей
        const titleValue = inputTitle.value
        const bodyValue = inputBody.value
        
        //проверяем или пользователь ввел все поля
        if(!titleValue || !bodyValue){
            alert('Заполните все поля формы')
            return
        }

        const taskok = createNewTask(titleValue, bodyValue)
        const listItem = listItemTemplate(taskok)
        listContainer.insertAdjacentElement('afterbegin', listItem)
        form.reset()    // очистка формы - она будет такая как после загрузки
    }

    function createNewTask(title, body){
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`
        }

        objOfTasks[newTask._id] = newTask

        return {...newTask}
    }

    // функция удаления задачи
    function deleteTask(id){
        const {title} = objOfTasks[id]
        const isConfirm = confirm(`Точно удалить задачу: ${title}`)
        if(!isConfirm) return isConfirm
        delete objOfTasks[id]
        return isConfirm
    }

    // удаление элемента с разметки
    function deleteTaskFromHtml(confirmed, el){
        if(confirmed){
            el.remove()
        }
        
    }
    
    function onDeleteHendler({target}){
        if(target.classList.contains('delete-btn')){
            // находим родитель с атрибутом data-task-id который равен _id
            const parent = target.closest('[data-task-id]')
            // извлекаем _id с найденого родителя
            const id = parent.dataset.taskId    //task-id хранится как taskId
            
            const confirmed = deleteTask(id)
            deleteTaskFromHtml(confirmed, parent)
            
        }
    }
   
    // обработчик события изменения Селекта
    function onThemeSelectHandler(e){
        const selectTheme = themeSelect.value // узнали значение селекта - название темы
        // спрашиваем у юзера или он точно желает установить тему
        const isConfirmed = confirm(`Вы действительно желаете установить тему: ${selectTheme}`)
        if(!isConfirmed) {
            themeSelect.value = lastSelectTheme
            return
        }
        setTheme(selectTheme)
        lastSelectTheme = selectTheme
        localStorage.setItem('appTheme', lastSelectTheme)
    }

    // установщик Темы - возможно той, которая будет приходить с сервера
    // name - название темы
    function setTheme(name){
       // получаем тему из обьекта с темами
       const selectedThemOdj = themes[name]
       //перебираем ключи и значения в теме
       Object.entries(selectedThemOdj).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value)
       })    
    }

})(tasks);
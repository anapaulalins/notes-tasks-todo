const toggle = document.querySelector('#toggle')
const menu = document.querySelector('.menu')

const btnNotes = document.querySelector('.notes')
const btnTasks = document.querySelector('.tasks')
const btnToDo = document.querySelector('.to-do')

const contentNotes = document.querySelector('.content-notes')
const contentTasks = document.querySelector('.content-tasks')
const contentTodo = document.querySelector('.content-to-do')

const title = document.querySelector('.title')
const titleNotes = document.querySelector('.title-notes')
const titleTasks = document.querySelector('.title-tasks')
const titleTodo = document.querySelector('.title-todo')

// start notes
const noteInput = document.querySelector('.note-input')
const btnNote = document.querySelector('.btn-note')
const titleNote = document.querySelector('.title-note')
const exit = document.querySelector('.fa-sign-out-alt')
const noteHide = document.querySelector('.note-hide')
const noteMenu = document.querySelector('.note-menu')
const notesContainer = document.querySelector('.notes-container')
const newItemNotes = document.querySelector('.new-item-notes')
const input = document.querySelector('.input')
// end notes
// start tasks 
const noStatuscontainer = document.querySelector('.no-status-container')
const inputStatus = document.querySelector('.input-no-status')
const formStatus = document.querySelector('.form-status')
const countNoStatus = document.querySelector('.count-no-status')

const inProgressContainer = document.querySelector('.in-progress-container')
const countInProgress = document.querySelector('.count-in-progress')

const completedeContainer = document.querySelector('.completed-container')
const countCompleted = document.querySelector('.count-completed')

const trashTasks = document.querySelector('#trash-tasks')
// end tasks
// start to-do
const todoContainer = document.querySelector('.to-do-container')
const todoList = document.querySelector('.todo-list')
const todoInput = document.querySelector('.input-to-do-list')
const formTodo = document.querySelector('.form-to-do')
const trashTodoLis = document.querySelector('#trash-to-do')
// end to-do
const container = document.querySelector('.container')

const local_storage_notes = 'key.note'
const local_storage_id_selected = 'nore.id'
const local_storage_tasks_status = 'key.taskStatus'
const local_storage_tasks_in_progress = 'key.inProgress'
const local_storage_tasks_completed = 'key.completed'
const local_storage_todo_list = 'key.todo'

let arrNotes = JSON.parse(localStorage.getItem(local_storage_notes)) || []
let arrTaskstatus = JSON.parse(localStorage.getItem(local_storage_tasks_status)) || []
let arrTaskInProgress = JSON.parse(localStorage.getItem(local_storage_tasks_in_progress)) || []
let arrTaskCompleted = JSON.parse(localStorage.getItem(local_storage_tasks_completed)) || []
let arrTodoList = JSON.parse(localStorage.getItem(local_storage_todo_list)) || []
//let selectedId = JSON.parse(localStorage.getItem(local_storage_id_selected))
const colors = ['#fdfd96', '#afff94', '#ff94ff', '#ff94b2']

let seleid = ''
let taskIdSelected = ''

btnNote.addEventListener('click', () => {
    arrNotes.push(noteObj(noteInput.value))
    creteNote()
    save()
    noteInput.value = null
    removeActive([input])
})

newItemNotes.addEventListener('click', () => {
    active(input)
})

toggle.addEventListener('click', () => {
    menu.classList.toggle('remove')
})

btnNotes.addEventListener('click', () => {
    active(btnNotes)
    removeActive([btnTasks, btnToDo])
    removehide(contentNotes)
    addHide([contentTasks, contentTodo])
    changeTitle(titleNotes)
})
btnTasks.addEventListener('click', () => {
    active(btnTasks)
    removeActive([btnNotes, btnToDo])
    removehide(contentTasks)
    addHide([contentNotes, contentTodo])
    changeTitle(titleTasks)
})
btnToDo.addEventListener('click', () => {
    active(btnToDo)
    removeActive([btnTasks, btnNotes])
    removehide(contentTodo)
    addHide([contentTasks, contentNotes])
    changeTitle(titleTodo)
})


// notes start 
function noteObj(value) {
    return {
        id: Date.now().toString(),
        title: value,
        text: ''
    }
}


function color() {
    let index = Math.floor(Math.random() * colors.length)
    let cor = colors[index]
    return cor

}
function creteNote() {
    clear(notesContainer)
    arrNotes.forEach((e, index) => {
        const note = document.createElement('div')
        note.classList.add('note')
        note.dataset.noteId = e.id
        note.style.background = color()
        note.innerHTML = `<div class="note-menu" >
        <div class="note-menu-header">
         <h3 class="title-note">${e.title}</h3>
         <i class="fas fa-ellipsis-h fa-lg"></i>
        </div>
        <div class="btns-notes hide" id="${e.id}">
        <p id="btn-note-save">save</p>
        <p id="btn-note-delete">delete</p>
        </div>
        </div>
        <textarea name="" id="${index}" cols="30" rows="10" class="note-area">${e.text}</textarea>
        `
        notesContainer.appendChild(note)
    })
}
saveNote()
function saveNote() {
    notesContainer.addEventListener('click', (event) => {
        const noteContent = event.target.parentNode.parentNode.parentNode
        const noteContentId = noteContent.dataset.noteId
        const noteMenu = event.target.parentNode.parentNode
        const noteUp = arrNotes.find(note => note.id === noteContentId)
        const indexNote = arrNotes.indexOf(noteUp)
        const textArea = document.getElementById(indexNote)
        noteMenu.childNodes.forEach(note => {
            if (noteContentId === note.id) {
                const noteBtns = note
                noteBtns.classList.toggle('active')
                noteBtns.childNodes.forEach(btn => {
                    if (btn.id === 'btn-note-save') {
                        const btnSaveNote = btn
                        btnSaveNote.addEventListener('click', () => {
                            noteUp.text = textArea.value
                            save()
                        })
                    } else if (btn.id === 'btn-note-delete') {
                        const btnDeleteNote = btn
                        btnDeleteNote.addEventListener('click', () => {
                            arrNotes.splice(indexNote, 1)
                            noteContent.style.display = 'none'
                            save()
                            console.log(arrNotes)
                        })
                    }
                })
            }
        })

    })
}

const trashNotes = document.querySelector('#trash-notes')
trashNotes.addEventListener('click', () => {
    localStorage.removeItem(local_storage_notes)
    delItems(notesContainer, arrNotes)
})
// notes end

// tasks start

function taskObj(value) {
    return {
        id: Date.now().toString(),
        value: value
    }
}

formStatus.addEventListener('submit', (event) => {
    event.preventDefault()
    arrTaskstatus.push(taskObj(inputStatus.value))
    inputStatus.value = null
    creteTask()
    save()
})

function creteTask() {
    clear(noStatuscontainer)
    arrTaskstatus.forEach(task => {
        const tasks = document.createElement('div')
        tasks.classList.add('task')
        tasks.dataset.taskId = task.id
        tasks.innerHTML = `
        <div class="task-no-status-content" id="task-no-status-content">
        <p>${task.value}</p>
        <i class="fas fa-ellipsis-h fa-lg fa-task"></i>
        </div>
        <div class="sub hide" id="${task.id}">
        <p id="btn-in-progress">in-prgress</p>
        <p id="btn-completed">completed</p>
        <p id="btn-delete">delete</p>
         </div>
        `

        countNoStatus.innerHTML = arrTaskstatus.length
        noStatuscontainer.appendChild(tasks)

    })
}


getTaskdiv(noStatuscontainer)
getTaskdiv(inProgressContainer)
getTaskdiv(completedeContainer)

function getTaskdiv(element) {
    element.addEventListener('click', (event) => {
        const taskDiv = event.target.parentElement.parentElement
        taskDiv.childNodes.forEach(task => {
            if (taskDiv.dataset.taskId === task.id) {
                const subDiv = task
                subDiv.classList.toggle('active')
                subDiv.childNodes.forEach(e => {
                    if (e.id === 'btn-in-progress') {
                        let btnIn = e
                        inProgressTask(btnIn)
                    } else if (e.id === 'btn-completed') {
                        let btnCompleted = e
                        completedTask(btnCompleted)
                    } else if (e.id === 'btn-delete') {
                        let btnDelete = e
                        deletetask(btnDelete)
                    }
                })
            }
        })
    })
}

function del(count, arr) {
    taskIdSelected = event.target.parentElement.parentElement
    let taskSelected = arr.find(task => task.id === taskIdSelected.dataset.taskId)
    let index = arr.indexOf(taskSelected)
    arr.splice(index, 1)
    count.innerHTML = arr.length
    taskIdSelected.style.display = 'none'
}

function deletetask(value) {
    let valueChild = value.parentNode.parentNode.childNodes
    valueChild.forEach(e => {
        if (e.id === 'task-no-status-content') {
            value.addEventListener('click', (event) => {
                del(countNoStatus, arrTaskstatus)
                save()
            })
        } else if (e.id === 'task-in-progress-content') {
            value.addEventListener('click', (event) => {
                del(countInProgress, arrTaskInProgress)
                save()
            })
        } else if (e.id === 'task-completed-content') {
            value.addEventListener('click', (event) => {
                del(countCompleted, arrTaskCompleted)
                save()
            })
        }
    })

}
function inProgressTask(value) {
    value.addEventListener('click', (event) => {
        taskIdSelected = event.target.parentElement.parentElement
        let taskSelected = arrTaskstatus.find(task => task.id === taskIdSelected.dataset.taskId)
        arrTaskInProgress.push(taskSelected)
        del(countNoStatus, arrTaskstatus)
        save()
        createInProgress()
    })
}
function completedTask(value) {
    value.addEventListener('click', (event) => {
        taskIdSelected = event.target.parentElement.parentElement
        taskIdSelected.childNodes.forEach(tasks => {
            if (tasks.id === 'task-no-status-content') {
                let taskSelected = arrTaskstatus.find(task => task.id === taskIdSelected.dataset.taskId)
                arrTaskCompleted.push(taskSelected)
                del(countNoStatus, arrTaskstatus)
                console.log(tasks.id, 'func')
            } else if (tasks.id === 'task-in-progress-content') {
                let taskSelected = arrTaskInProgress.find(task => task.id === taskIdSelected.dataset.taskId)
                arrTaskCompleted.push(taskSelected)
                del(countInProgress, arrTaskInProgress)
            }
        })
        save()
        createCompletedTask()
    })
}

function createInProgress() {
    clear(inProgressContainer)
    arrTaskInProgress.forEach(task => {
        const tasks = document.createElement('div')
        tasks.classList.add('task')
        tasks.dataset.taskId = task.id
        tasks.innerHTML = `
        <div class="task-in-progress-content" id="task-in-progress-content">
        <p>${task.value}</p>
        <i class="fas fa-ellipsis-h fa-lg fa-task"></i>
        </div>
        <div class="sub hide" id="${task.id}">
        <p id="btn-completed">completed</p>
        <p id="btn-delete">delete</p>
         </div>
        `
        countInProgress.innerHTML = arrTaskInProgress.length
        inProgressContainer.appendChild(tasks)
    })
}

function createCompletedTask() {
    clear(completedeContainer)
    arrTaskCompleted.forEach(task => {
        const tasks = document.createElement('div')
        tasks.classList.add('task')
        tasks.dataset.taskId = task.id
        tasks.innerHTML = `
        <div class="task-completed-content" id="task-completed-content">
        <p>${task.value}</p>
        <i class="fas fa-ellipsis-h fa-lg fa-task"></i>
        </div>
        <div class="sub hide" id="${task.id}">
        <p id="btn-delete">delete</p>
         </div>
        `
        countCompleted.innerHTML = arrTaskCompleted.length
        completedeContainer.appendChild(tasks)
    })

}

function delItems(value, arr, count) {
    value.childNodes.forEach(task => {
        task.style.display = 'none'
    })
    while (arr.length) {
        arr.pop()
    }
    count.innerHTML = '0'
}

trashTasks.addEventListener('click', () => {
    localStorage.removeItem(local_storage_tasks_status)
    localStorage.removeItem(local_storage_tasks_in_progress)
    localStorage.removeItem(local_storage_tasks_completed)
    delItems(noStatuscontainer, arrTaskstatus, countNoStatus)
    delItems(inProgressContainer, arrTaskInProgress, countInProgress)
    delItems(completedeContainer, arrTaskCompleted, countCompleted)
})

// tasks end

formTodo.addEventListener('submit', (event) => {
    event.preventDefault()
    arrTodoList.push(createObjTodo(todoInput.value))
    todoInput.value = null
    creteTodoList()
    save()
})

trashTodoLis.addEventListener('click', () => {
    localStorage.removeItem(local_storage_todo_list)
    delItems(todoList, arrTodoList)
})

function creteTodoList() {
    clear(todoList)
    arrTodoList.forEach(list => {
        const li = document.createElement('li')
        li.dataset.todoId = list.id
        li.innerHTML = `<div> <input type="checkbox" name="" id="${list.id}">
        <label for="${list.id}">${list.value}</label></div>
        <p>DELETE</p>`
        if (list.checked === true) {
            li.innerHTML = `<div> <input type="checkbox" name="" id="${list.id}" checked>
        <label for="${list.id}">${list.value}</label></div>
        <p id="btn-delete-todo">DELETE</p>`
        }

        todoList.appendChild(li)
        selectedCheck()
        deleteItemTodo(li)
    })

}

function deleteItemTodo(element) {
    element.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'p') {
            let getIdTodo = event.target.parentNode.dataset.todoId
            let findIdTodo = arrTodoList.find(list => list.id === getIdTodo)
            let indexTodo = arrTodoList.indexOf(findIdTodo)
            arrTodoList.splice(indexTodo, 1)
            console.log(getIdTodo, findIdTodo, indexTodo)
            console.log(arrTodoList)
            save()
            event.target.parentNode.style.display = 'none'
        }
    })
}

function selectedCheck() {
    let inputCheckbox = document.querySelectorAll('[type="checkbox"]')
    inputCheckbox.forEach(list => {
        list.addEventListener('click', (event) => {
            let listId = list.id
            let getListId = arrTodoList.find(list => list.id === listId)
            getListId.checked = true
            save()
        })
    })
}

function createObjTodo(value) {
    return {
        id: Date.now().toString(),
        value: value,
        checked: false
    }
}


// to-do


function save() {
    localStorage.setItem(local_storage_notes, JSON.stringify(arrNotes))
    localStorage.setItem(local_storage_tasks_status, JSON.stringify(arrTaskstatus))
    localStorage.setItem(local_storage_tasks_in_progress, JSON.stringify(arrTaskInProgress))
    localStorage.setItem(local_storage_tasks_completed, JSON.stringify(arrTaskCompleted))
    localStorage.setItem(local_storage_todo_list, JSON.stringify(arrTodoList))
    //localStorage.setItem(local_storage_id_selected, selectedId)
}


function active(element) {
    element.classList.add('active')
}

function removeActive(elements) {
    elements.forEach(element => {
        element.classList.remove('active')
    });
}
function removehide(element) {
    element.classList.remove('hide')
}
function addHide(elements) {
    elements.forEach(element => {
        element.classList.add('hide')
    });
}
function changeTitle(element) {
    title.innerHTML = element.textContent
}

function clear(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

creteTodoList()
createCompletedTask()
createInProgress()
creteTask()
creteNote()


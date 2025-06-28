let $ = document
const userInput = $.querySelector('#input-todo')
const addTodoBtn = $.querySelector('#add-btn')
const removeAllBtn = $.querySelector('#remove-all-btn')
const todoList = $.querySelector('#my-list')

let arrayTodos = []

const checkinput = event => {
    if (event.keyCode === 13) {
        insertTodo()
    }
}
const insertTodo = e => {
    if (userInput.value == '') {
        alert('please enter your task')
    } else {
        let newTodo = {
            id: arrayTodos.length + 1,
            title: userInput.value,
            status: false
        }
        userInput.value = ''
        arrayTodos.push(newTodo)
        setToTodoList(arrayTodos)
        setToLocal(arrayTodos)
    }
}
const setToTodoList = todos => {
    let classLabel = null
    let statusBtn = null
    todoList.innerHTML = ''
    todos.forEach(function (todo) {
        if (todo.status) {
            classLabel = 'done'
            statusBtn = 'Undone'
        } else {
            classLabel = ''
            statusBtn = 'done'
        }
        todoList.innerHTML += `<li>
        <label class="${classLabel}">${todo.title}</label>
        <span>
        <input type="button" class="status" value="${statusBtn}" onclick="todoStatus(${todo.id})">
        <input type="button" class="remove" value="Remove" onclick="removeTodo(${todo.id})">
        </span>
        </li>`
    })
}
const setToLocal = todos => {
    localStorage.setItem('todos', JSON.stringify(todos))
}
const getLocalTodos = e => {
    userInput.focus()
    arrayTodos = JSON.parse(localStorage.getItem('todos'))
    if (arrayTodos) {
        setToTodoList(arrayTodos)
    } else {
        arrayTodos = []
    }
}
const todoStatus = todoId => {
    arrayTodos.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.status = !todo.status
        }
    })
    setToLocal(arrayTodos)
    setToTodoList(arrayTodos)
}
const removeTodo = todoId => {
    let selectedIndex = arrayTodos.findIndex(function (todo) {
        return todo.id == todoId
    })
    arrayTodos.splice(selectedIndex, 1)
    console.log(arrayTodos)
    setToLocal(arrayTodos)
    setToTodoList(arrayTodos)
}
const removeAllTodos = e => {
    localStorage.removeItem("todos")
    todoList.innerHTML = ''
    arrayTodos = []
}
window.addEventListener('load', getLocalTodos)
userInput.addEventListener('keypress', checkinput)
addTodoBtn.addEventListener('click', insertTodo)
removeAllBtn.addEventListener('click', removeAllTodos)
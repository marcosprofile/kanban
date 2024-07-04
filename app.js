const tasks = document.querySelectorAll('.tasks li')
const columns = document.querySelectorAll('.tasks')
const addTaskForm = document.querySelector('#add-task-form')
const addTaskInput = document.querySelector('input')
let draggedTask = null


addTaskForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const newTaskText = addTaskInput.value.trim()

  if(newTaskText !== '') {
    const newTask = document.createElement('li')
    newTask.textContent = newTaskText
    newTask.setAttribute('draggable', true)
    newTask.addEventListener('dragstart', function(event) {
      draggedTask = newTask
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/html', newTask.innerHTML)
    })

    document.querySelector('#todo').appendChild(newTask)
    addTaskInput.value = ''
  }
})

for (const element of tasks) {
  const task = element

  task.addEventListener('dragstart', function(event) {
    draggedTask = task
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', task.innerHTML)
  })
  
  task.addEventListener('dragend', function() {
    draggedTask = null
  })
}

for (const element of columns) {
  const column = element

  column.addEventListener('dragover', function(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    column.classList.add('dragover')
    column.classList.add('dragging')
  })

  column.addEventListener('dragleave', function() {
    column.classList.remove('dragover')
    column.classList.remove('dragging')
  })

  column.addEventListener('drop', function(event) {
    event.preventDefault()
    const task = document.createElement('li')
    task.innerHTML = event.dataTransfer.getData('text/html')
    task.setAttribute('draggable', true)
    task.addEventListener('dragstart', function(event) {
      draggedTask = task
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/html', task.innerHTML)
    })

    column.appendChild(task)
    column.classList.remove('dragover')
    column.classList.remove('dragging')

    const previousColumn = draggedTask.parentNode
    previousColumn.removeChild(draggedTask)
  })
}
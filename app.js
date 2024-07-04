const tasks = document.querySelectorAll('.tasks li')
const columns = document.querySelectorAll('.tasks')
const addTaskForm = document.querySelector('#add-task-form')
const addTaskInput = document.querySelector('input')
let draggedTask = null

// Function for add events of drag and drop to a task
function dragDropTask(task) {
  task.addEventListener('dragstart', function(event) {
    draggedTask = task
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', task.innerHTML)
  })

  task.addEventListener('dragend', function() {
    draggedTask = null
  })
}

// Events of drag and drop in all existing tasks
tasks.forEach(task => dragDropTask(task))

// Add new task
addTaskForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const newTaskText = addTaskInput.value.trim()

  if (newTaskText !== '') {
    const newTask = document.createElement('li')
    newTask.textContent = newTaskText
    newTask.setAttribute('draggable', true)
    dragDropTask(newTask)
    document.querySelector('#todo').appendChild(newTask)
    addTaskInput.value = ''
  }
})

// Events of drag and drop in all columns
columns.forEach(column => {
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
    if (draggedTask) {
      column.appendChild(draggedTask)
      column.classList.remove('dragover')
      column.classList.remove('dragging')
    }
  })
})

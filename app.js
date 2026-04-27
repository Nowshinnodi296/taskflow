let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card' + (task.completed ? ' completed' : '');
    card.innerHTML = `
      <div class="task-info">
        <h3 ${task.completed ? 'style="text-decoration:line-through;color:#999"' : ''}>${task.name}</h3>
        <p>Due: Today · Priority: High</p>
      </div>
      <div>
        <button class="done-btn" onclick="markDone(${index})">${task.completed ? 'Undo' : 'Done'}</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(card);
  });
  updateCounter();
}

function addTask() {
  const input = document.getElementById('taskInput');
  if (input.value.trim() === '') return;
  tasks.push({ name: input.value, completed: false });
  input.value = '';
  saveTasks();
  renderTasks();
}

function markDone(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function updateCounter() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  document.getElementById('counter').textContent = done + ' of ' + total + ' done';
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

renderTasks();
let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const taskList = document.getElementById('task-list');

  if (input.value.trim() === '') return;

  const card = document.createElement('div');
  card.className = 'task-card';
  card.innerHTML = `
    <div class="task-info">
      <h3>${input.value}</h3>
      <p>Due: Today · Priority: High</p>
    </div>
    <button class="done-btn" onclick="markDone(this)">Done</button>
  `;

  taskList.appendChild(card);
  input.value = '';
  updateCounter();
}

function markDone(btn) {
  const card = btn.parentElement;
  card.classList.toggle('completed');
  btn.textContent = card.classList.contains('completed') ? 'Undo' : 'Done';
  updateCounter();
}

function updateCounter() {
  const total = document.querySelectorAll('.task-card').length;
  const done = document.querySelectorAll('.completed').length;
  document.getElementById('counter').textContent =
    done + ' of ' + total + ' done';
}
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
  });
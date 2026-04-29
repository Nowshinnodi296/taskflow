import { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:5000';

function TaskCard({ task, onDone, onDelete }) {
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = task.dueDate && task.dueDate < today && !task.completed;

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} priority-${task.priority} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-info">
        <h3>{task.name}</h3>
        <p>
          <span className={`badge ${task.priority}`}>{task.priority}</span>
          · Due: <span className={isOverdue ? 'overdue-text' : ''}>{task.dueDate || 'Today'}</span>
        </p>
      </div>
      <div>
        <button className="done-btn" onClick={() => onDone(task.id)}>
          {task.completed ? 'Undo' : 'Done'}
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('high');
  const [dueDate, setDueDate] = useState('');

  // load tasks from backend when app opens
  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  async function addTask() {
    if (input.trim() === '') return;
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input, priority, dueDate })
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setInput('');
    setDueDate('');
  }

  async function markDone(id) {
    const res = await fetch(`${API}/tasks/${id}`, { method: 'PUT' });
    const updated = await res.json();
    setTasks(tasks.map(t => t.id === id ? updated : t));
  }

  async function deleteTask(id) {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== id));
  }

  const done = tasks.filter(t => t.completed).length;

  return (
    <div className="container">
      <div className="header">
        <h1>Task Flow</h1>
        <span className="counter">{done} of {tasks.length} done</span>
      </div>

      <div className="input-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDone={markDone}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
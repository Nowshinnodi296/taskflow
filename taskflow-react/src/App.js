import { useState } from 'react';
import './App.css';

function TaskCard({ task, index, onDone, onDelete }) {
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
        <button className="done-btn" onClick={() => onDone(index)}>
          {task.completed ? 'Undo' : 'Done'}
        </button>
        <button className="delete-btn" onClick={() => onDelete(index)}>
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

  function addTask() {
    if (input.trim() === '') return;
    setTasks([...tasks, { name: input, completed: false, priority, dueDate }]);
    setInput('');
    setDueDate('');
  }

  function markDone(index) {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
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
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            index={index}
            onDone={markDone}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
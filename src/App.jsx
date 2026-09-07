import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <div className="todo-container">
        
        {/* TOP SECTION: Title */}
        <div className="todo-top">
          <h1>My To-Do List</h1>
        </div>

        {/* MIDDLE SECTION: Input Form */}
        <div className="todo-middle">
          <form onSubmit={handleAddTask} className="todo-form">
            <input
              type="text"
              className="todo-input"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="add-btn">Add</button>
          </form>
        </div>

        {/* BOTTOM SECTION: Task List */}
        <div className="todo-bottom">
          <ul className="todo-list">
            {tasks.length === 0 ? (
              <p className="empty-state">No tasks yet. <br></br> Add one above!</p>
            ) : (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className={`todo-item ${task.completed ? 'completed' : ''}`}
                >
                  <span
                    className="task-text"
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    {task.text}
                  </span>
                  <div className="task-actions">
                    <button
                      className="complete-btn"
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;
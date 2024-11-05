import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState(['General']);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent adding empty tasks

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, i) => (i === editIndex ? { ...todo, text: editInput, category: categoryInput || 'General', dueDate, priority } : todo));
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([
        ...todos,
        { text: input, completed: false, category: categoryInput || 'General', dueDate: dueDate || 'No due date', priority }
      ]);
    }
    setInput('');
    setCategoryInput('');
    setDueDate('');
    setPriority('Low');
  };

  const addCategory = (e) => {
    e.preventDefault();
    if (categoryInput.trim() && !categories.includes(categoryInput)) {
      setCategories([...categories, categoryInput]);
      setCategoryInput('');
    }
  };

  const toggleComplete = (index) => {
    const newTodos = todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const isOverdue = (dueDate) => {
    if (dueDate === 'No due date') return false;
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate < currentDate;
  };

  const editTask = (index) => {
    const todoToEdit = todos[index];
    setEditIndex(index);
    setEditInput(todoToEdit.text);
    setCategoryInput(todoToEdit.category);
    setDueDate(todoToEdit.dueDate);
    setPriority(todoToEdit.priority);
  };

  const filteredTodos = todos.filter(todo => {
    const categoryMatch = categoryFilter ? todo.category === categoryFilter : true;
    const priorityMatch = priorityFilter ? todo.priority === priorityFilter : true;
    return categoryMatch && priorityMatch;
  });

  return (
    <div className="app">
      <h1>To-Do List App with Due Dates</h1>

      {/* Form to add a new category */}
      <form onSubmit={addCategory}>
        <input
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          placeholder="Add new category"
        />
        <button type="submit">Add Category</button>
      </form>

      {/* Form to add a new to-do */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <select onChange={(e) => setCategoryInput(e.target.value)}>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit" disabled={!input.trim()}>Add Task</button>
      </form>

      {/* Filter section */}
      <div>
        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Display list of to-dos */}
      <ul>
        {filteredTodos.length === 0 ? (
          <li>No tasks found</li>
        ) : (
          filteredTodos.map((todo, index) => (
            <li key={index} className={`${todo.completed ? 'completed' : ''} ${isOverdue(todo.dueDate) ? 'overdue' : ''}`}>
              <span onClick={() => toggleComplete(index)}>
                {todo.text} ({todo.category}) - Due: {todo.dueDate} - Priority: {todo.priority}
              </span>
              <button onClick={() => deleteTodo(index)}>Delete</button>
              <button onClick={() => editTask(index)}>Edit</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (newTask.trim()) {
      const res = await axios.post('http://localhost:5000/tasks', { title: newTask, completed: false });
      setTasks([...tasks, res.data]);
      setNewTask('');
    }
  };

  const toggleComplete = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask);
    setTasks(tasks.map(t => (t._id === task._id ? updatedTask : t)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <Container maxWidth="sm">
      <h1>To-Do List</h1>
      <TextField
        label="Add a new task"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? addTask() : null)}
      />
      <Button variant="contained" color="primary" onClick={addTask} style={{ marginTop: '10px' }}>
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id} dense>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />
            <ListItemText primary={task.title} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => deleteTask(task._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;

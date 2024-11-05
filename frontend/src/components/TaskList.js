import React from 'react';
import { List, ListItem, ListItemText, Checkbox, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, toggleComplete, deleteTask }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task._id} dense>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleComplete(task)}
          />
          <ListItemText
            primary={task.title}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" onClick={() => deleteTask(task._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;

import React, { useState } from 'react';
import './App.css';
import TaskInputField from './components/TaskInputField';
import { Task } from './models/model';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './components/TaskList';

const App: React.FC = () => {

  const [taskText, settaskText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText) {
      setTasks([...tasks, { id: uuidv4(), taskText, isDone: false }])
      settaskText("");
    }
  }

  return (
    <div className="App">
      <span className="heading"> My Tasklist </span>
      <TaskInputField taskText={taskText} settaskText={settaskText} handleAdd={handleAdd} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;

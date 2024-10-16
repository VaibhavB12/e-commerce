import React, { Component } from "react";
import Tasks from "./Tasks";
import { Paper, TextField, Checkbox, Button } from "@mui/material"; // Updated import for MUI
import { addTask, updateTask, deleteTask } from './Services/taskServices'; // Add this line to import functions
import "./App.css";

class App extends Component {
    state = { tasks: [], currentTask: "" };

    handleChange = (event) => {
        this.setState({ currentTask: event.currentTarget.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const { data } = await addTask({ task: this.state.currentTask });
            const tasks = [...originalTasks, data]; // Add new task to the list
            this.setState({ tasks, currentTask: "" });
        } catch (error) {
            console.log(error);
        }
    };

    handleUpdate = async (id) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === id);
            tasks[index] = { ...tasks[index], completed: !tasks[index].completed };
            this.setState({ tasks });
            await updateTask(id, { completed: tasks[index].completed });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (id) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter((task) => task._id !== id);
            this.setState({ tasks });
            await deleteTask(id);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    render() {
        const { tasks, currentTask } = this.state;
        return (
            <div className="app">
                <header className="app-header">
                    <h1>My To-Do List</h1>
                </header>
                <div className="main-content">
                    <Paper elevation={3} className="todo-container">
                        <form onSubmit={this.handleSubmit} className="task-form">
                            <TextField
                                variant="outlined"
                                size="small"
                                className="task-input"
                                value={currentTask}
                                required
                                onChange={this.handleChange}
                                placeholder="Add New TO-DO"
                            />
                            <Button className="add-task-btn" color="primary" variant="outlined" type="submit">
                                Add Task
                            </Button>
                        </form>
                        <div className="tasks-list">
                            {tasks.map((task) => (
                                <Paper key={task._id} className="task-item">
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={() => this.handleUpdate(task._id)}
                                        color="primary"
                                    />
                                    <div className={task.completed ? "task-text completed" : "task-text"}>
                                        {task.task}
                                    </div>
                                    <Button onClick={() => this.handleDelete(task._id)} color="secondary" className="delete-task-btn">
                                        Delete
                                    </Button>
                                </Paper>
                            ))}
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default App;

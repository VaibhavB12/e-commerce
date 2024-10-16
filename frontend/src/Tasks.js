import React, { Component } from "react";
import { addTask, getTasks, updateTask, deleteTask } from '../src/Services/taskServices';

class Tasks extends Component {
    state = { tasks: [], currentTask: "" };

    async componentDidMount() {
        try {
            const { data } = await getTasks();
            this.setState({ tasks: data });
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const { data } = await addTask({ task: this.state.currentTask });
            this.setState({ tasks: [...originalTasks, data], currentTask: "" });
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
        // You can return null or render the children as needed
        return null;
    }
}

export default Tasks;

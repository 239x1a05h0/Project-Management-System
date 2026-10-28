const Task = require("../models/task");
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("project", "name")
            .populate("team", "name")
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            project,
            team,
            assignedTo,
            priority,
            dueDate
        } = req.body;
        const task = await Task.create({
            title,
            description,
            project,
            team,
            assignedTo,
            priority,
            dueDate,
            createdBy: req.user.id
        });
        const newTask = await Task.findById(task._id)
            .populate("project", "name")
            .populate("team", "name")
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        Object.assign(task, req.body);
        await task.save();
        const updatedTask = await Task.findById(task._id)
            .populate("project", "name")
            .populate("team", "name")
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(
            req.params.id
        );
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.json({
            message: "Task deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {getTasks,createTask,updateTask,deleteTask};
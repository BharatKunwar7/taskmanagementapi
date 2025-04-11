const Task = require('../models/taskModel');
const {taskValidation} = require('../validations/taskValidation');

const createTask = async (req, res) => {
    const { error } = taskValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
  
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

 const getTasks = async (req, res) => {
    const { page = 1, limit = 10, sort = 'createdAt', status } = req.query;
    const filter = status ? { status } : {};
  
    try {
      const tasks = await Task.find(filter)
        .sort({ [sort]: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));
  
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const updateTask = async (req, res) => {
    const { error } = taskValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
  
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
  };
const Task = require("../models/task");

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title Is required" });
    }
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
    });
    return res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).json({ message: "task not found" });
    }
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Not Authorized" });
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).json({ message: "task not found" });
    }
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Not Authorized" });
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).json({ message: "task not found" });
    }
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "Not Authorized" });
    }
    await task.deleteOne();
    return res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTask, getTasks, updateTask, deleteTask };

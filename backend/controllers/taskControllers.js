const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updatedTask)
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.status(200).json({message: 'Task deleted'})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

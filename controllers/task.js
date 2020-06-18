const Task = require('../models/Task');

const createTask = async (req, res) => {
  req.body.organizationId = req.employee.organizationId;
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const query = req.query.employeeId ? req.query.employeeId : { $exists: true };
  const tasks = await Task.find({
    employeeId: query,
    organizationId: req.employee.organizationId
  });
  res.json(tasks);
};

const getTask = async (req, res) => {
  res.json(req.task);
};

const toggleState = async (req, res) => {
  req.task.state = req.task.state === 'in-progress' ? 'done' : 'in-progress';
  await req.task.save();
  res.json(req.task);
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  toggleState
};

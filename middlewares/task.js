const Task = require('../models/Task');
const CustomError = require('../helper/CustomError');

const validateTaskOwner = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new CustomError(404, 'Not Found Task!');
  if (!task.organizationId.equals(req.employee.organizationId))
    throw new CustomError(403, 'Not Authorized!');
  req.task = task;
  next();
};

module.exports = {
  validateTaskOwner,
};

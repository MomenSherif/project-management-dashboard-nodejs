const Project = require('../models/Project');
const CustomError = require('../helper/CustomError');

const validateProjectOwner = async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new CustomError(404, 'Not Found Project!');
  if (!project.organizationId.equals(req.employee.organizationId))
    throw new CustomError(403, 'Not Authorized!');
  req.project = project;
  next();
};

module.exports = {
  validateProjectOwner,
};

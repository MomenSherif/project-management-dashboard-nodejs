const Project = require('../models/Project');

const createProject = async (req, res) => {
  req.body.organizationId = req.employee.organizationId;
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
};

const deleteProject = async (req, res) => {
  await req.project.remove();
  res.json({ message: 'Deleted Successfully' });
};

const updateProject = async (req, res) => {
  const updates = Object.keys(req.body);
  updates.forEach((update) => {
    req.project[update] = req.body[update];
  });
  await req.project.save();
  res.json(req.project);
};

const getProject = (req, res) => {
  res.json(req.project);
};

const getProjects = async (req, res) => {
  const projects = await Project.find({
    organizationId: req.employee.organizationId,
  });

  res.json(projects);
};

module.exports = {
  createProject,
  deleteProject,
  updateProject,
  getProject,
  getProjects,
};

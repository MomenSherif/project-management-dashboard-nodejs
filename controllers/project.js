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

const getProject = async (req, res) => {
  await Project.populate(req.project, {
    path: 'organizationId',
    select: 'name',
  });
  res.json(req.project);
};

const getProjects = async (req, res) => {
  const projects = await Project.find({
    organizationId: req.employee.organizationId,
  }).sort({ startDate: -1 });

  res.json(projects);
};

const assignTeam = async (req, res) => {
  const isAssigned = req.project.teams.some((id) => id.equals(req.body.teamId));
  const operator = isAssigned ? '$pull' : '$addToSet';
  const message = `${isAssigned ? 'Removed' : 'Assigned'} Successfully`;
  await req.project.updateOne({
    [operator]: {
      teams: req.body.teamId,
    },
  });
  res.json({ message });
};

module.exports = {
  createProject,
  deleteProject,
  updateProject,
  getProject,
  getProjects,
  assignTeam,
};

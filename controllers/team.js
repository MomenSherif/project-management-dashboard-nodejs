const Team = require('../models/Team');
const Employee = require('../models/Employee');

const createTeam = async (req, res) => {
  // const employee = await Employee.findOne({ email: req.body.email });
  const team = new Team({
    ...req.body,
    organizationId: req.employee.organizationId,
    // leaderId: employee._id,
  });
  // employee.role = 'team-leader';
  // employee.teamId = team._id;
  // await Promise.all([team.save(), employee.save()]);
  await team.save();
  res.status(201).json(team);
};

const deleteTeam = async (req, res) => {
  await req.team.remove();
  res.json({ message: 'Deleted Successfully' });
};

const updateTeam = async (req, res) => {
  const employee = await Employee.findOne({ email: req.body.email });

  if (req.team.leaderId) {
    const formerLeader = await Employee.findById(req.team.leaderId);
    formerLeader.role = 'employee';
    await formerLeader.save();
  }

  req.body.leaderId = employee._id;
  employee.role = 'team-leader';
  employee.teamdId = req.team._id;

  const updates = Object.keys(req.body);
  updates.forEach((update) => {
    req.team[update] = req.body[update];
  });

  await Promise.all([req.team.save(), employee.save()]);
  res.json(req.team);
};

const getTeam = async (req, res) => {
  const { team } = req;
  await Team.populate(team, [
    { path: 'leaderId', select: 'firstName lastName email' },
    { path: 'employees', select: 'firstName lastName phoneNumber email role' },
    { path: 'projects', select: 'title state' },
  ]);

  res.json(team);
};

const getTeams = async (req, res) => {
  const teams = await Team.find({
    organizationId: req.employee.organizationId,
  }).populate([
    { path: 'leaderId', select: 'firstName lastName email' },
    { path: 'employees', select: 'firstName lastName phoneNumber email role' },
    { path: 'projects', select: 'title state' },
  ]);

  res.json(teams);
};

module.exports = {
  createTeam,
  deleteTeam,
  updateTeam,
  getTeam,
  getTeams,
};

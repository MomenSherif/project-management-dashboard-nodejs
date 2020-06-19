const Employee = require('../models/Employee');
const Team = require('../models/Team');
const CustomError = require('../helper/CustomError');

const signIn = async (req, res) => {
  const employee = await Employee.findByCredentials(req.body);
  if (!employee) throw new CustomError(401, 'Invalid email or password!');
  const token = await employee.generateAuthToken();
  res.json({ employee, token });
};

const createEmployee = async (req, res) => {
  const team = await Team.findOne({
    name: req.body.teamId,
    organizationId: req.employee.organizationId,
  });
  req.body.teamId = team._id;
  req.body.organizationId = req.employee.organizationId;
  const employee = new Employee(req.body);
  await employee.save();
  res.json(employee);
};

const getEmployees = async (req, res) => {
  const employees = await Employee.find({
    organizationId: req.employee.organizationId,
  });
  res.json(employees);
};

const getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate({
    path: 'organizationId',
    select: 'name',
  });
  const emp = await employee
    .populate({
      path: 'teamId',
      select: 'name',
    })
    .execPopulate();
  const empTasks = await emp.populate('tasks').execPopulate();
  console.log(empTasks);
  if (!emp) throw new CustomError(404, 'Employee not Found!');
  res.json(empTasks);
};

const assignToTeam = async (req, res) => {
  const employee = await Employee.findOne({ email: req.body.email });
  employee.role = 'employee';
  employee.teamId = req.body.teamId;
  await employee.save();
  res.json(employee);
};

module.exports = {
  signIn,
  getEmployees,
  getEmployee,
  assignToTeam,
  createEmployee,
};

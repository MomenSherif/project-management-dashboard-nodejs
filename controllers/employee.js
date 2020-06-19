const Employee = require('../models/Employee');
const CustomError = require('../helper/CustomError');

const signIn = async (req, res) => {
  const employee = await Employee.findByCredentials(req.body);
  if (!employee) throw new CustomError(401, 'Invalid email or password!');
  const token = await employee.generateAuthToken();
  res.json({ employee, token });
};

const getEmployees = async (req, res) => {
  const employees = await Employee.find({
    organizationId: req.employee.organizationId,
  });
  res.json(employees);
};

const getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate([
    {
      path: 'organizationId',
      select: 'name',
    },
    {
      path: 'teamId',
      select: 'name',
    },
    { path: 'tasks' },
  ]);
  console.log(employee);
  if (!employee) throw new CustomError(404, 'Employee not Found!');
  res.json(employee);
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
};

const Employee = require('../models/Employee');
const CustomError = require('../helper/CustomError');

const signIn = async (req, res) => {
  const employee = await Employee.findByCredentials(req.body);
  if (!employee) throw new CustomError(401, 'Invalid email or password!');
  const token = await employee.generateAuthToken();
  res.json({ employee, token });
};

module.exports = {
  signIn,
};

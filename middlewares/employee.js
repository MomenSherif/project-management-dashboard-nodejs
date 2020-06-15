const Employee = require('../models/Employee');
const CustomError = require('../helper/CustomError');

const isValidEmailInOrganization = async (req, res, next) => {
  const employee = await Employee.findOne({
    email: req.body.email,
    organizationId: req.employee.organizationId,
  });

  if (!employee) throw new CustomError(404, 'Employee not found!');
  next();
};

module.exports = {
  isValidEmailInOrganization,
};

const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const CustomError = require('../helper/CustomError');
const Employee = require('../models/Employee');
const { jwtSecretKey } = require('../config');

const jwtVerify = promisify(jwt.verify);

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) throw new CustomError(401, 'Unauthorized!');

  const token = req.headers.authorization.replace('Bearer ', '');

  const { _id } = await jwtVerify(token, jwtSecretKey).catch((e) => {
    throw new CustomError(401, 'Unauthorized Expired Token!');
  });

  req.employee = await Employee.findById(_id);
  next();
};

const isBusinessOwner = (req, res, next) => {
  if (req.employee.role !== 'business-owner')
    throw new CustomError(403, 'Not Authorized!');

  next();
};

const isTeamLeader = async (req, res, next) => {
  const employee = await Employee.findById(req.body.employeeId);

  if (
    req.employee.role !== 'team-leader' ||
    !req.employee.teamId.equals(employee.teamId)
  )
    throw new CustomError(403, 'Not Authorized!');

  next();
};

module.exports = {
  authenticate,
  isBusinessOwner,
  isTeamLeader,
};

const express = require('express');
const Employee = require('../models/Employee');
const {
  signIn,
  getEmployees,
  getEmployee,
  assignToTeam,
  createEmployee,
} = require('../controllers/employee');
const { authenticate, isBusinessOwner } = require('../middlewares/auth');
const { isValidEmailInOrganization } = require('../middlewares/employee');

const router = express.Router();

// Employee Login
router.post('/sign-in', signIn);

// Create Employee
router.post('/', authenticate, isBusinessOwner, createEmployee);

// Get Employees
router.get('/', authenticate, getEmployees);

// Get Employee
router.get('/:id', authenticate, getEmployee);

// Assign Team to Employee
router.post(
  '/assign-to-team',
  authenticate,
  isValidEmailInOrganization,
  assignToTeam
);

module.exports = router;

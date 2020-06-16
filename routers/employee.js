const express = require('express');
const Employee = require('../models/Employee');
const {
  signIn,
  getEmployees,
  getEmployee,
  assignToTeam,
} = require('../controllers/employee');
const { authenticate, isBusinessOwner } = require('../middlewares/auth');
const { isValidEmailInOrganization } = require('../middlewares/employee');

const router = express.Router();

// Employee Login
router.post('/sign-in', signIn);

// Create Employee
router.post('/', authenticate, isBusinessOwner, async (req, res) => {
  req.body.organizationId = req.employee.organizationId;
  const employee = new Employee(req.body);
  await employee.save();
  res.json(employee);
});

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

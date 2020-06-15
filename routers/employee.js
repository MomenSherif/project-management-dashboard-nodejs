const express = require('express');
const Employee = require('../models/Employee');
const { signIn } = require('../controllers/employee');
const { authenticate, isBusinessOwner } = require('../middlewares/auth');

const router = express.Router();

// Employee Login
router.post('/sign-in', signIn);

router.post('/', authenticate, isBusinessOwner, async (req, res) => {
  req.body.organizationId = req.employee.organizationId;
  const employee = new Employee(req.body);
  await employee.save();
  res.json(employee);
});

module.exports = router;

const express = require('express');

const { authenticate, isTeamLeader } = require('../middlewares/auth');
const { validateTaskOwner } = require('../middlewares/task');
const {
  createTask,
  getTask,
  getTasks,
  toggleState,
} = require('../controllers/task');

const router = express.Router();

// Create Task
router.post('/', authenticate, isTeamLeader, createTask);

// Get Task
router.get('/:id', authenticate, validateTaskOwner, getTask);

// Get Tasks
router.get('/', authenticate, getTasks);

// Toggle Task State
router.post('/:id', authenticate, validateTaskOwner, toggleState);

module.exports = router;

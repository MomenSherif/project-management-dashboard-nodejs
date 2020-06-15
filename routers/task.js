const express = require('express');

const { authenticate, isTeamLeader } = require('../middlewares/auth');
const { validateTaskOwner } = require('../middlewares/task');
const { createTask, getTask, getTasks } = require('../controllers/task');

const router = express.Router();

// Create Task
router.post('/', authenticate, isTeamLeader, createTask);

// Get Task
router.get('/:id', authenticate, validateTaskOwner, getTask);

// Get Tasks
router.get('/', authenticate, getTasks);

module.exports = router;

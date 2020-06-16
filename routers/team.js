const express = require('express');
const {
  createTeam,
  deleteTeam,
  updateTeam,
  getTeam,
  getTeams,
} = require('../controllers/team');
const { isValidEmailInOrganization } = require('../middlewares/employee');
const { validateTeamOwner } = require('../middlewares/teams');
const { authenticate, isBusinessOwner } = require('../middlewares/auth');

const router = express.Router();

// Create Team
router.post('/', authenticate, isBusinessOwner, createTeam);

// Delete Team
router.delete('/:id', authenticate, validateTeamOwner, deleteTeam);

// Uopdate Team
router.patch(
  '/:id',
  authenticate,
  validateTeamOwner,
  isValidEmailInOrganization,
  updateTeam
);

// Get Team
router.get('/:id', authenticate, validateTeamOwner, getTeam);

// Get Teams
router.get('/', authenticate, getTeams);

module.exports = router;

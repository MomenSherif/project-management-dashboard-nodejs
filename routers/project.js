const express = require('express');
const {
  createProject,
  deleteProject,
  updateProject,
  getProject,
  getProjects,
} = require('../controllers/project');
const { authenticate, isBusinessOwner } = require('../middlewares/auth');
const { validateProjectOwner } = require('../middlewares/project');

const router = express.Router();

// Create Project
router.post('/', authenticate, isBusinessOwner, createProject);

// Delete Project
router.delete(
  '/:id',
  authenticate,
  isBusinessOwner,
  validateProjectOwner,
  deleteProject
);

// Update Project
router.patch(
  '/:id',
  authenticate,
  validateProjectOwner,
  isBusinessOwner,
  updateProject
);

// Get Project
router.get('/:id', authenticate, validateProjectOwner, getProject);

// Get Projects
router.get('/', authenticate, getProjects);

module.exports = router;

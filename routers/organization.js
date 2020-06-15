const express = require('express');

const { createOrganization } = require('../controllers/organizations');

const router = express.Router();

// Sign-up an Organization & it's owner
router.post('/', createOrganization);

module.exports = router;

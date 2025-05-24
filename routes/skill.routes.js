const express = require('express');
const router = express.Router();
const { getSkills } = require('../controllers/skill.controller');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, getSkills);

module.exports = router;

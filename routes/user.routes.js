const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth');

router.post('/', verifyToken, createUser);

module.exports = router;

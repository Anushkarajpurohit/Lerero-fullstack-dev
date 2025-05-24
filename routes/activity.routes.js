const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');
const {
  createActivity,
  updateActivity,
  deleteActivity,
  listActivities
} = require('../controllers/activity.controller');

router.post('/', verifyToken, createActivity);
router.put('/:id', verifyToken, updateActivity);
router.delete('/:id', verifyToken, deleteActivity);
router.get('/', verifyToken, listActivities); 

module.exports = router;

const express = require('express');
const { check } = require('express-validator');

const friendsControllers = require('../controllers/friend-controllers');

const router = express.Router();

router.patch(
  '/add',
  [check('userId').not().isEmpty(), check('friendId').not().isEmpty()],
  friendsControllers.addFriendRequest,
);

module.exports = router;

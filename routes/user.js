const express = require('express');
const userRouter = express.Router();
const { createUser } = require('../controllers/user');

userRouter.route('/').post(createUser);

module.exports = userRouter;

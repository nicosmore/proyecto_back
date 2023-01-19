const express = require('express');
const UsersControllers = require('../../controllers/users.controller');
const usersCont = new UsersControllers();

const router = express.Router();

module.exports = router;
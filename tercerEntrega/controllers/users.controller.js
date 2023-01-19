const { HTTP_STATUS } = require("../constants/api.constants");
const { UsersDao } = require("../models/daos/app.daos");
const { successResponse } = require("../utils/api.utils");

const usersDao = new UsersDao();

class UsersControllers {
  getUsers = async (req, res, next) => {
    try {
      const users = await usersDao.getAll();
      const response = successResponse(users);
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersControllers;

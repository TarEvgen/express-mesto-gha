const userData = require('../data.json');

const getUsers = (req, res) => {
  res.status(200);
  res.send(userData);
};

const getUserById = (req, res) => {};

const createUser = (req, res) => {};

const updateUserById = (req, res) => {};

const deleteUserById = (req, res) => {};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}

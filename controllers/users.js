const Users = require("../models/users");

const getUsers = (req, res) => {
  return Users.find({}).then((users) => {
    return res.status(200).send(users);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  return Users.findById(id).then((user) => {
    return res.status(200).send(user);
  });
  // res.status(200);
  // res.send(userData.find((user) => user.name === name));
};

const createUser = (req, res) => {
  const newUserData = req.body;
  console.log(req.body, "newUserData");

  return Users.create(newUserData).then((newUser) => {
    console.log(newUser);
    return res.status(201).send(newUser);
  });

  // console.log(newUser);
  //res.status(201);
  //res.send('Пользователь создан');
};

const updateUserById = (req, res) => {};

const deleteUserById = (req, res) => {};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

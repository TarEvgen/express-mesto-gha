const Users = require('../models/users');

const getUsers = (req, res) => {
  return Users.find({})
    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      return res.status(400).send({ message: 'Ошибка на сервере' });
    });
};

const getUserById = (req, res) => {
  console.log(req.params, 'req.params');
  const { _id } = req.params;
  return Users.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные'
        });
      }
      return res.status(400).send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const newUserData = req.body;
  console.log(req.body, 'newUserData');

  return Users.create(newUserData)
    .then((newUser) => {
      console.log(newUser);
      return res.status(201).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные'
        });
      }
      return res.status(400).send({ message: 'Ошибка на сервере' });
    });
};

const updateUser = (req, res) => {
  Users.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })

    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'Пользователя не существует' });
      }
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные'
        });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const deleteUserById = (req, res) => {};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
};

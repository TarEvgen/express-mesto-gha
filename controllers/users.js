const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');
const NotFoundError = require('../errors/not-found-err');
const BedRequest = require('../errors/bed-request');
const Unauthorized = require('../errors/unauthorized');

const saltRounds = 10;

const { ERROR_REQUEST, ERROR_FOUND, ERROR_SERVER } = require('../errors/const');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль');
      }

      bcrypt.compare(
        password,
        user.password,
        (err, isPasswordValue) => {
          if (!isPasswordValue) {
            next(new Unauthorized('Неправильные почта или пароль'));
          } else {
            const token = jwt.sign({ id: user._id }, 'super-strong-secret', {
              expiresIn: '7d',
            });
            return res.send({ token });
          }
        })
    })
    .catch((err) => next(err));
};

const getUsers = (req, res) => {
  Users.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  const { _id } = req.params;
  return Users.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        return res.send(user);
      }
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    Users.create({
      name, about, avatar, email, password: hash,
    })
      .then(() => {
        res.status(201).send({
          name, about, avatar, email, password: hash,
        });
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          next (new BedRequest('Переданны не корректные данныеrr' ) )
        }
        next (error)
      });
  });
};

const getUser = (req, res) => {
  Users.findById(req.user.id).then((user) => {
    res.send(user);
  });
};

const updateUser = (req, res) => {
  Users.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  })

    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(ERROR_FOUND).send({ message: 'Пользователя не существует' });
      }
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_REQUEST)
          .send({ message: 'Переданы некорректные данные___' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  login,
  getUser,
};

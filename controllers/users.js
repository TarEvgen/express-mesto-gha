const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');

const NotFoundError = require('../errors/not-found-err');
const BedRequest = require('../errors/bed-request');
const Unauthorized = require('../errors/unauthorized');
const Conflict = require('../errors/conflict');

const saltRounds = 10;

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
            const token = jwt.sign({ id: user._id }, 'secret', {
              expiresIn: '7d',
            });
            res.send({ token });
          }
        },
      );
    })
    .catch((err) => next(err));
};

const getUsers = (req, res, next) => {
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
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BedRequest('Переданны некорректные данные'));
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, saltRounds)
    .then((hash) => Users.create({
      name, about, avatar, email, password: hash,
    })
      .then((newUser) => {
        res.status(201).send({
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
          email: newUser.email,
          _id: newUser._id,
        });
      }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь уже существует'));
      }
      if (err.name === 'CastError') {
        next(new BedRequest('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res) => {
  Users.findById(req.user.id).then((user) => {
    res.send(user);
  });
};

const updateUser = (req, res, next) => {
  Users.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  })

    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BedRequest('Переданны некорректные данные'));
      }
      next(err);
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

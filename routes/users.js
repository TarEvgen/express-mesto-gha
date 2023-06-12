const router = require('express').Router();
const {getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById } = require('../controllers/users')

const userData = require('../data.json');

/*
router.get('/', (req, res) => {
  res.send('hello word2');
});*/

router.get('/users', getUsers );

router.get('/users/:name', (req, res) => {
  const { name } = req.params;
  res.status(200);
  res.send(userData.find((user) => user.name === name));
});

router.post('/users', (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  res.status(201);
  res.send('Пользователь создан');
});


module.exports = router;
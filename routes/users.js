const router = require('express').Router();

const {getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById } = require('../controllers/users');

router.get('', getUsers);

router.get('/:name', getUserById);

router.post('', createUser);

router.patch('/:name', updateUserById);

router.delete('/:name', deleteUserById);

module.exports = router;
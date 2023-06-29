const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  getUser,
} = require('../controllers/users');

router.get('', getUsers);

router.get('/me', getUser);

router.get('/:_id', getUserById);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateUser);

module.exports = router;

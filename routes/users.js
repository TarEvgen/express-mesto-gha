const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  getUser,
} = require('../controllers/users');

const {
  checkBodyUser,
} = require('../middlewares/validation');

router.get('', getUsers);

router.get('/me', getUser);

router.get('/:_id', getUserById);

router.patch('/me', checkBodyUser, updateUser);
router.patch('/me/avatar', checkBodyUser, updateUser);

module.exports = router;

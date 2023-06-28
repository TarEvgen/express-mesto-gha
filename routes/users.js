const router = require('express').Router();

const {
  getUsers,
  getUserById,
  //createUser,
  updateUser,
  getUser,
} = require('../controllers/users');

router.get('', getUsers);

router.get('/me', getUser )


router.get('/:_id', getUserById);

//router.post('', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUser);

module.exports = router;

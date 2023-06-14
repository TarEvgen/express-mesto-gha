const router = require('express').Router();

const {getUsers,
  getUserById,
  createUser, updateUser} = require('../controllers/users');

router.get('', getUsers);

router.get('/:_id', getUserById);

router.post('', createUser);



router.patch('/me', updateUser);

/*
router.delete('/:_id', deleteUserById);*/

module.exports = router;
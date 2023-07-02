const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

const NotFoundError = require('../errors/not-found-err');

const auth = require('../middlewares/auth');

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;

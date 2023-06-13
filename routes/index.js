const router = require('express').Router();
const userRoutes = require('./users');

router.get('/', (req, res) => {
  res.send('hello word2');
});

router.use('/users', userRoutes);

module.exports = router
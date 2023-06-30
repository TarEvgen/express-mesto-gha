const router = require('express').Router();

const {
  getCards,
  createCards,
  deleteCardById,
  likeCardById,
  dislikeCardById,
} = require('../controllers/cards');

const {
  checkBodyCard,
} = require('../middlewares/validation');

router.get('', getCards);

router.post('', checkBodyCard, createCards);

router.delete('/:cardId', deleteCardById);

router.put('/:cardId/likes', likeCardById);

router.delete('/:cardId/likes', dislikeCardById);

module.exports = router;

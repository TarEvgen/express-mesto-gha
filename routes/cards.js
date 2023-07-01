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
  checkParamsId
  
} = require('../middlewares/validation');

router.get('', getCards);

router.post('', checkBodyCard, createCards);

router.delete('/:cardId', checkParamsId, deleteCardById);

router.put('/:cardId/likes', checkParamsId, likeCardById);

router.delete('/:cardId/likes', checkParamsId, dislikeCardById);

module.exports = router;

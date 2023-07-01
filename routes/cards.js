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
  checkParamsId,

} = require('../middlewares/validation');

router.get('', getCards);

router.post('', checkBodyCard, createCards);

router.delete('/:_id', checkParamsId, deleteCardById);

router.put('/:_id/likes', checkParamsId, likeCardById);

router.delete('/:_id/likes', checkParamsId, dislikeCardById);

module.exports = router;

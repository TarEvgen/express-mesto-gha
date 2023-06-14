const router = require('express').Router();

const {getCards,

  createCards, deleteCardById

  } = require('../controllers/cards');


router.get('', getCards);

//router.get('/:_id', getUserById);

router.post('', createCards);

router.delete('/:cardId', deleteCardById);

module.exports = router;


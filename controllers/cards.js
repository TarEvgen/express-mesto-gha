const Cards = require('../models/cards');

const NotFoundError = require('../errors/not-found-err');
const BedRequest = require('../errors/bed-request');

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => next(err));
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;

  Cards.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner.toString() !== req.user.id) {
        throw new NotFoundError('Вы не можете удалять чужие карточки');
      } else {
        return Cards.findByIdAndRemove(cardId).then(() => {
          res.send({ messege: 'Карточка удалена' });
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BedRequest('Переданны не корректные данные'));
      } else {
        next(err);
      }
    });
};

const createCards = (req, res, next) => {
  const newCardsData = req.body;
  const owner = req.user.id;
  return Cards.create({
    name: newCardsData.name,
    link: newCardsData.link,
    owner,
  })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BedRequest('Переданны не корректные данные'));
      } else {
        next(err);
      }
    });
};

const likeCardById = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BedRequest('Переданны не корректные данные'));
      } else {
        next(err);
      }
    });
};

const dislikeCardById = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BedRequest('Переданны не корректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCardById,
  likeCardById,
  dislikeCardById,
};

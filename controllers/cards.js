const Cards = require('../models/cards');

const getCards = (req, res) => {
  return Cards.find({})
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch(() => {
      return res.status(400).send({ message: 'Ошибка на сервере' });
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      } else {
        return res.send({ messege: 'Карточка удалена' });
      }
    })
    .catch(() => {
      return res.status(400).send({ message: 'Ошибка на сервере' });
    });
};

const createCards = (req, res) => {
  const newCardsData = req.body;
  const owner = req.user._id;

  return Cards.create({
    name: newCardsData.name,
    link: newCardsData.link,
    owner,
  })
    .then((newCard) => {
      return res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные'
        });
      }
      return res.status(400).send({ message: 'Ошибка на сервере' });
    });
};

const likeCardById = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      return res.status(400).send({ message: 'Ошибка на сервере' });
    });
};

const dislikeCardById = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        return res.status(404).send({ message: 'Карточка не найден' });
      }
    })
    .catch((err) => {
      return res.status(400).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCardById,
  likeCardById,
  dislikeCardById,
};

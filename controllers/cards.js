const Cards = require('../models/cards');

const {
  ERROR_REQUEST,
  ERROR_FOUND,
  ERROR_SERVER,
} = require('../errors/const');

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Cards.findById(cardId)

 // Cards.findOne(cardId)
 //Cards.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
       return res.status(ERROR_FOUND).send({ message: 'Карточка не найдена' });
       // console.log(card, 'card')
      } 
      if (card.owner.toString() !== req.user.id) {
        console.log(card.owner.toString(), 'card.owner')
        console.log(req.user.id, 'req.user.id')

        res.status(ERROR_FOUND).send({ message: 'Вы не можете удалять чужие карточки' });

      } else { 
        
       return Cards.findByIdAndRemove(cardId)
       .then(() => {res.send({ messege: 'Карточка удалена' })})


        console.log('что то тут не то')
       // return card.remove({ messege: 'Карточка удалена' })
      res.send({ messege: 'Карточка удалена' })
        
        //.then(()=> res.send({ messege: 'Карточка удалена' }))
/*
      //Cards.findByIdAndRemove(cardId)
     // .then ((card) => {

        //return res.send({ messege: 'Карточка удалена' });
       // console.log(card.owner, 'card.owner')
        //console.log(req.user.id, 'req.user.id')
*/
      
      }
        
    
        
      
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_REQUEST).send({ message: 'Переданны некорректные данные' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
      }
    });
};

const createCards = (req, res) => {
  const newCardsData = req.body;
  console.log(newCardsData, 'newCardsData')
  const owner = req.user.id;
  console.log(owner, 'owner')
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
        return res.status(ERROR_REQUEST).send(
          { message: 'Переданы некорректные данные' },
        );
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const likeCardById = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(ERROR_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_REQUEST).send({ message: 'Переданны некорректные данные' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
      }
    });
};

const dislikeCardById = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(ERROR_FOUND).send({ message: 'Карточка не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_REQUEST).send({ message: 'Переданны некорректные данные' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
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

const Cards = require("../models/cards");

const getCards = (req, res) => {
  return Cards.find({}).then((cards) => {
    return res.status(200).send(cards);
  });
};
/*
const getCardsById = (req, res) => {
  console.log(req.params, 'req.params')
  const { _id } = req.params;
  return Users.findById(_id).then((user) => {
    if(!user){
      return res.status(404).send({message: 'Пользователь не найден'});
    }
    return res.status(200).send(user);
  }).catch((err)=>{
    return res.status(500).send({message: 'Ошибка на сервере'})
  })
  // res.status(200);
  // res.send(userData.find((user) => user.name === name));
};*/


const deleteCardById = (req, res) => {
  const { cardId } = req.params;
   Cards.findById(cardId).then((card) =>{
    if(!card) {
      return res.status(404).send({massage: 'Карточка не найдена'})
    } else {
    return card.deleteOne().then(()=>{ res.send({massege: 'Карточка удалена'})

    })
  }
  })

}


const createCards = (req, res) => {
  const newCardsData = req.body;
  const owner =req.user._id
  console.log(owner, "newCardsData");
 console.log(owner, "owner");
  return Cards.create({name: newCardsData.name, link: newCardsData.link , owner}).then((newCard) => {
    console.log(newCard);
    return res.status(201).send(newCard);
  })
  .catch((err)=>{
    if(err.name === 'ValidationError'){
    return res.status(400).send({message: `${Object.values(err.errors).map((err) => err.message).join(", ")}`})
    }
    return res.status(500).send({message: 'Ошибка на сервере'})
  })
};


const likeCardById = (req, res) =>
{Cards.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: {likes: req.user._id}},
  { new: true },
).then((card) =>{

  if(card) {



    res.send(card)} else {

      res.status(404).send({ message: "карточка не найден" })

    }



}).catch((err) => {
  return res.status(500).send({message: 'Ошибка на сервере'})
})
}

const dislikeCardById = (req, res) =>
{ Cards.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id }  }, // убрать _id из массива
  { new: true },
).then((card) =>{
  if(card) {



    res.send(card)} else {

      res.status(404).send({ message: "карточка не найден" })

    }
}).catch((err) => {
  return res.status(500).send({message: 'Ошибка на сервере'})
})

}



module.exports = {
  getCards,
  createCards, deleteCardById, likeCardById, dislikeCardById
};

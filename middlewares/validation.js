const { celebrate, Joi, errors, Segments } = require('celebrate');



const checkBodyLogin = celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })

})


const checkBodyCard = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    })

})

const checkBodyUser = celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
    })

})

module.exports = {
    checkBodyLogin,
    checkBodyCard,
    checkBodyUser,
   
  };
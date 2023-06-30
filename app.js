const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {errors} = require('celebrate');


const routes = require('./routes');


const {
  checkBodyLogin
} = require('./middlewares/validation');



const {
  login,
  createUser,
} = require('./controllers/users');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {});

app.use(bodyParser.json());

app.post('/signin', checkBodyLogin, login);
app.post('/signup', checkBodyLogin, createUser);

/*
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});
*/


app.use(routes);

/////////////////////
app.use(errors());

app.use((err, req, res, next) => {
// res.status(err.statusCode).send({ message: err.message });


 const { statusCode = 500, message } = err;

 res
   .status(statusCode)
   .send({
     // проверяем статус и выставляем сообщение в зависимости от него
     message: statusCode === 500
       ? 'На сервере произошла ошибка'
       : message
   });

 // res.status(500).send({ message: 'На сервере произошла ошибка__000' });
  //next()
});

//////////////////////


app.listen(PORT, () => {});

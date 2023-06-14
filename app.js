const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;



mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
.then(()=>{
  console.log('к БД подключен')
})

app.use(bodyParser.json());




app.use((req, res, next) => {
  req.user = {
    _id: '64886556a0729f365906aca7' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(routes)

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};





app.listen(PORT, () => {
  console.log(`Сервер запушен на порту ${PORT}`);
});

/*
module.exports.createCard = (req, res) => {
  console.log(req.user._id, 'gggggg'); // _id станет доступен
};*/
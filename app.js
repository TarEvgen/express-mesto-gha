const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {
  console.log('к БД подключен');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Сервер запушен на порту ${PORT}`);
});

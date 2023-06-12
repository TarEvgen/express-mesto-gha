const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello word2');
});

app.listen(3000, () => {
  console.log('Сервер запушен на порту 3000');
});

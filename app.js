const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/users');

const app = express();

const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
  res.send('hello word2');
});
/*
app.get('/users', (req, res) => {
  res.status(200);
  res.send(userData);
});

app.get('/users/:name', (req, res) => {
  const { name } = req.params;
  res.status(200);
  res.send(userData.find((user) => user.name === name));
});
*/

app.use(bodyParser.json());
/*
app.post('/users', (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  res.status(201);
  res.send('Пользователь создан');
});
*/

app.use(routes)


app.listen(PORT, () => {
  console.log(`Сервер запушен на порту ${PORT}`);
});

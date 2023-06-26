const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');

const {
  login,
  createUser,
} = require('./controllers/users');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {});

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser); 


app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});



app.use(routes);

app.listen(PORT, () => {});

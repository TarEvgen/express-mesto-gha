const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: false,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (data) => validator.isEmail(data),
    },
  },
  password: {
    type: String,
    select: false,
    required: true,

  },
});

module.exports = mongoose.model('user', userSchema);

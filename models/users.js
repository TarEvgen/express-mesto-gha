const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: false,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: false,
    validate: {
      validator: function (data) {
        return validator.isURL(data)
      }
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
   validate: {
     validator: function (data) {
     return validator.isEmail(data)
     }
   }
  },
  password: {
    type: String,
    select: false,
    required: true,

  },
});

module.exports = mongoose.model('user', userSchema);

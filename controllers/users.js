
const bcrypt = require('bcrypt');

const Users = require('../models/users');

const jwt = require('jsonwebtoken');




const saltRounds = 10;
const JWT_SECRET = 'unique-secret-key'


const {
  ERROR_REQUEST,
  ERROR_FOUND,
  ERROR_SERVER,
} = require('../errors/const');



const login = (req, res) => {

const { email, password } = req.body;
//console.log({ email, password } )

return Users.findOne({email})


    .then((user) => {
    
      if (!user) {
        return res.status(ERROR_FOUND).send({ message: 'Неправильные почта или пароль' });
      }


      bcrypt.compare(password, user.password, function(err, isPasswordValue) {
        // result == true
      

        if (!isPasswordValue) {
          return res.status(ERROR_FOUND).send({ message: 'неправильный пароль__' });
        }
const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
        // создать и отдать токен
            
       

        return res.send({token})
          
        
        });
        
  })
 .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(ERROR_REQUEST).send(
        { message: 'Переданы некорректные данные' },
      );
    }
    return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере  00000' });
  });


}

const getUsers = (req, res) => {
  Users.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const getUserById = (req, res) => {
  const { _id } = req.params;
  return Users.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_REQUEST).send(
          { message: 'Переданы некорректные данные' },
        );
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  console.log(name, about, avatar, email, password)
  
  
  bcrypt.hash(password, saltRounds, function(err, hash) {
    
    return Users.create({ name, about, avatar, email, password: hash })
    .then(({ name, about, avatar, email, password: hash }) => {
      
      res.status(201).send({ name, about, avatar, email, password: hash });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_REQUEST).send(
          { message: 'Переданы некорректные данные' },
        );
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });





    
    
  })
  
 
    
};

const updateUser = (req, res) => {
  Users.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })

    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(ERROR_FOUND).send({ message: 'Пользователя не существует' });
      }
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_REQUEST).send(
          { message: 'Переданы некорректные данные' },
        );
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  login
};

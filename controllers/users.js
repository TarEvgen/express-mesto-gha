const Users = require("../models/users");

const getUsers = (req, res) => {
  return Users.find({}).then((users) => {
    return res.status(200).send(users);
  });
};

const getUserById = (req, res) => {
  console.log(req.params, 'req.params')
  const { _id } = req.params;
  return Users.findById(_id).then((user) => {
    if(!user){
      return res.status(404).send({message: 'Пользователь не найден'});
    }
    return res.status(200).send(user);
  }).catch((err)=>{
    return res.status(500).send({message: 'Ошибка на сервере'})
  })
  // res.status(200);
  // res.send(userData.find((user) => user.name === name));
};

const createUser = (req, res) => {
  const newUserData = req.body;
  console.log(req.body, "newUserData");

  return Users.create(newUserData).then((newUser) => {
    console.log(newUser);
    return res.status(201).send(newUser);
  })
  .catch((err)=>{
    if(err.name === 'ValidationError'){
    return res.status(400).send({message: `${Object.values(err.errors).map((err) => err.message).join(", ")}`})
    }
    return res.status(500).send({message: 'Ошибка на сервере'})
  })

  // console.log(newUser);
  //res.status(201);
  //res.send('Пользователь создан');
};

const updateUser = (req, res) => {

  Users.findByIdAndUpdate(req.user._id)
};

router.patch('/:id', (req, res) => {
  // обновим имя найденного по _id пользователя
  User.findByIdAndUpdate(req.params.id, { name: 'Виктор Гусев' })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});



const deleteUserById = (req, res) => {};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
};

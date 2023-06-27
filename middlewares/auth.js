const jwt = require('jsonwebtoken');

/*

const handleAuthError = (res) => {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  };
  
  */

  const extractBearerToken = (header) => {
     return header.replace('Bearer ', '');
  };










module.exports = (req, res, next) => {
    // тут будет вся авторизация
const { authorization } =req.headers

if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = extractBearerToken(authorization);

  let payload;
try {
  payload = jwt.verify(token, 'some-secret-key');
} catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();

  }; 


















/*
const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
*/
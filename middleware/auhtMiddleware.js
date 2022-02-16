const jwt = require('jsonwebtoken');

//todo

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({message: 'Нет авторизации'});
    }

    const decoded = token.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({message: 'Нет авторизации', e});
    throw e;
  }
};

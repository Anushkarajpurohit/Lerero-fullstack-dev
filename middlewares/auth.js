const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../controllers/Auth.controller.js');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized user: Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized user maybeeeeeee' });
  }
};

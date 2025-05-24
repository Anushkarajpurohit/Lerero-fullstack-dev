const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let tokenBlacklist = [];

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) return res.status(401).json({ message: 'invalid login' });

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: 'invalid login' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'invalid login' });

  const token = jwt.sign({ id: user._id, profile: user.profile }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return res.status(200).json({ token, profile: user.profile });
};

exports.logout = async (req, res) => {

  const token = req.query.token;
  console.log(req.query.token);
  if (!token) return res.status(401).json({ message: 'Unauthorized user' });

  
  return res.status(200).json({ message: 'logout success' });
};

exports.isTokenBlacklisted = token => tokenBlacklist.includes(token);



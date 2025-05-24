const User = require('../models/Users');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const { name, email, username, password, profile, skill } = req.body;

  if (req.user.profile !== 'board') {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  if (!name || !email || !username || !password || !profile) {
    return res.status(422).json({ message: 'Data cannot be processed' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(422).json({ message: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      profile,
      skill
    });

    await newUser.save();

    return res.status(200).json({ message: 'create success' });
  } catch (error) {
    return res.status(422).json({ message: 'Data cannot be processed' });
  }
};

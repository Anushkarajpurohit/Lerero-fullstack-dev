
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/Users'); // adjust path as needed
require('dotenv').config();

const seedBoardUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const existing = await User.findOne({ username: 'josh' });
    if (existing) {
      console.log(' Board user already exists');
    } else {
      const hashedPassword = await bcrypt.hash('josh1', 10);
      await User.create({
        name: 'josh',
        email: 'josh@example.com',
        username: 'josh1',
        password: hashedPassword,
        profile: 'board',
        skill: 'React' // optional
      });
      console.log(' Board user seeded');
    }

    process.exit();
  } catch (error) {
    console.error('Error seeding board user:', error);
    process.exit(1);
  }
};

seedBoardUser();

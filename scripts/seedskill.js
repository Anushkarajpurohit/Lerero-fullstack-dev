// scripts/seedSkills.js
const mongoose = require('mongoose');
const Skill = require('../models/Skill');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Skill.insertMany([
     { skill_name: 'JavaScript' },
  { skill_name: 'React' },
  { skill_name: 'Node.js' },
  { skill_name: 'Python' },
  { skill_name: 'Java' },
  ]);
  console.log('Skills seeded');
  process.exit();
});

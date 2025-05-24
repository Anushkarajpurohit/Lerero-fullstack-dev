const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { 
    type: String, 
    required: true, 
    enum: ['board', 'expert', 'trainer', 'competitor'] 
  },
  skill: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

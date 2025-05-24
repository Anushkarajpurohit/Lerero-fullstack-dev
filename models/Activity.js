const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  skill: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  startdate: { type: Date, required: true },
  enddate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        return value > this.startdate;
      },
      message: 'End date must be after start date'
    }
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);

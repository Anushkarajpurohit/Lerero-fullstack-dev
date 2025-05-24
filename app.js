require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use('/v1/auth', require('./routes/Auth.routes'));
app.use('/v1/user', require('./routes/user.routes'));
app.use('/v1/activity', require('./routes/activity.routes'));      //  create, update, delete 
app.use('/v1/activities', require('./routes/activity.routes'));    //  listing by skill
                                        
app.use('/v1/skills', require('./routes/skill.routes'));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => {
  console.log('Connected to MongoDB');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch(err => console.error('Mongo connection error:', err));

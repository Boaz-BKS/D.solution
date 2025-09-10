const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/dsolution', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = require('./models/User');

const hash = '$2a$12$/IIPIuqIRox26dsMpe.1iuRe2zgJFnjz51rlkm6ZRcDcChK/q4vKq';

const dummyUser = new User({
  email: 'test@example.com',
  password: hash,
  firstName: 'Test',
  lastName: 'User',
  isVerified: true
});

dummyUser.save()
  .then(() => {
    console.log('Dummy user created successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error creating dummy user:', err);
    mongoose.connection.close();
  });
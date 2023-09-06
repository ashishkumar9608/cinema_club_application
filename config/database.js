const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://127.0.0.1:27017/movies';



mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose.connection;

const mongoose = require('mongoose');
const { mongoUri } = require('../config');

function init() {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', (e) => {
    console.log(e);
    console.log('Mongo db [MongooseConnectionError]');
  });

  db.once('open', () => {
    console.log('MongoDB connected successfully');
  });
}

module.exports = { init };

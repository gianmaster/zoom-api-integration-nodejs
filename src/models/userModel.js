const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  zoomReference: Object,
});

module.exports = model('Users', UserSchema);

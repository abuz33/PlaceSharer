const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }],
  sentRequests: [{ user: { type: mongoose.Types.ObjectId, ref: 'User' }, date: Date }],
  getRequests: [{ user: { type: mongoose.Types.ObjectId, ref: 'User' }, date: Date }],
  friends: [{ type: mongoose.Types.ObjectId, required: false, default: null, ref: 'User' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

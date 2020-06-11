const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  creator: {  type: String, required: true},
  reviewTxt: { type: String, required: true, minlength: 6 },
  place: { type: String, required: true }
});

reviewSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Review', reviewSchema);

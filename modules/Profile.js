const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  status: {type: String, default: null},
  rating: {type: Number, default: 0},
  description: {
    city: {type: String, default: null},
    skils: {type: Array, default: null},
  },
});

module.exports = model('Profile', schema);

const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  status: {type: String, default: null},
  rating: {type: Number, default: 0},
  isOnline: {type: Boolean, default: false},
  birthDate: {type: Date, required: true},
  description: {
    city: {type: String, default: null},
    skils: {type: Array, default: null},
  },
  createDate: {type: Date, default: new Date()},
  owner: {type: Types.ObjectId, ref: 'User'},
});

module.exports = model('Profile', schema);

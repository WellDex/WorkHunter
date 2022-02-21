const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  birthDate: {type: Date, required: true},
  isBlocked: {type: Boolean, default: false},
  isOnline: {type: Boolean, default: false},
  createDate: {type: Date, default: new Date()},
  profile: [{type: Types.ObjectId, ref: 'Profile'}],
  notes: [{type: Types.ObjectId, ref: 'Note'}],
});

module.exports = model('User', schema);

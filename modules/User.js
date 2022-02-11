const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  avatar: {type: String, default: null},
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  status: {type: String, default: null},
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isOnline: {type: Boolean, default: false},
  birthDay: {type: Date, required: true},
  // gallery: [{type: Types.ObjectId, ref: 'Gallery'}],
  // posts: [{type: Types.ObjectId, ref: 'Post'}],
  // friends: [{type: Types.ObjectId, ref: 'Friend'}],
});

module.exports = model('User', schema);

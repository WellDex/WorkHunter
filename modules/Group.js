const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  title: {type: String, required: true},
  description: {type: String, default: null},
  avatar: {type: String, default: null},
  subscribers: {type: Array, default: []},
  createDate: {type: String, default: new Date()},
  isBlocked: {type: Boolean, default: false},
  owner: {type: Types.ObjectId, ref: 'User'},
});

module.exports = model('Group', schema);

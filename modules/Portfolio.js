const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  link: {type: String, required: true},
  title: {type: String, required: true},
  avatar: {type: String, default: null},
  createDate: {type: Date, default: new Date()},
  owner: {type: Types.ObjectId, ref: 'User'},
});

module.exports = model('Portfolio', schema);

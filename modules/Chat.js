const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  members: {type: Array, default: []},
  createDate: {type: Date, default: new Date()},
});

module.exports = model('Chat', schema);

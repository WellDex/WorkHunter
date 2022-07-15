const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  chatId: {type: String},
  sender: {type: String},
  text: {type: String},
  createDate: {type: Date, default: new Date()},
});

module.exports = model('Message', schema);

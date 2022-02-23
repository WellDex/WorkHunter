const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  text: {type: String, required: true},
  subscribers: {type: Array, default: []},
  createDate: {type: Date, default: new Date()},
  owner: {type: Types.ObjectId, ref: 'User'},
});

module.exports = model('Note', schema);

const {Schema, model, Types} = require('mongoose');
//todo
const schema = new Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  status: {type: Boolean, default: false}, //banned
  todos: [{type: Types.ObjectId, ref: 'Todo'}],
});

module.exports = model('User', schema);

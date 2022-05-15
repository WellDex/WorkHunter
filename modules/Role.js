const {Schema, model} = require('mongoose');

const schema = new Schema({
  name: {type: String, unique: true},
});

module.exports = model('Role', schema);

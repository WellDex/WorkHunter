const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  title: {type: String, required: true},
  childrens: {type: [], default: []},
  children: {type: [], default: []},
  parent: {type: String, default: null},
  createDate: {type: Date, default: new Date()},
});

module.exports = model('Category', schema);

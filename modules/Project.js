const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  title: {type: String, required: true},
  description: {type: String, default: ''},
  budjet: {type: Number, required: true},
  rate: {type: [], default: []},
  category: {type: Number, default: 0}, //todo
  subcategory: {type: Number, default: 0}, //todo
  marks: {type: Array, default: []}, //todo
  performer: {
    type: {id: String, avatar: String, firstName: String, lastName: String},
    default: null,
  },
  updatedDate: {type: Date, default: null},
  isCheck: {type: Boolean, default: false},
  createDate: {type: Date, default: new Date()},
  owner: {type: Types.ObjectId, ref: 'User'},
});

module.exports = model('Project', schema);

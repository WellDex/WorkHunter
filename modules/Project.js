const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  title: {type: String, required: true},
  description: {type: String, default: ''},
  budjet: {type: Number, required: true},
  rate: {type: [], default: []},
  category: {type: String, required: true},
  marks: {
    type: [
      {
        name: {type: String, required: true},
      },
    ],
    default: [],
  },
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

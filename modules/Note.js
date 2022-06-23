const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  text: {type: String, required: true},
  subscribers: {type: Array, default: []},
  createDate: {type: Date, default: new Date()},
  refOwner: {type: String, enum: ['User', 'Group'], default: 'User'},
  user: {
    name: {type: String, default: ''},
    avatar: {type: String, default: null},
  },
  owner: {type: Types.ObjectId, ref: 'User'},
});

module.exports = model('Note', schema);

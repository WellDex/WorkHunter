const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  img: {type: String, required: true},
  createDate: {type: Date, default: new Date()},
  refOwner: {type: String, enum: ['User', 'Group'], default: 'User'},
  owner: {type: Types.ObjectId, ref: 'User'},
});

module.exports = model('Gallery', schema);

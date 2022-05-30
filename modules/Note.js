const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  text: {type: String, required: true},
  subscribers: {type: Array, default: []},
  createDate: {type: Date, default: new Date()},
  refOwner: {type: String, enum: ['User', 'Group'], default: 'User'},
  owner: {type: Types.ObjectId, ref: 'User'},
});

var PeopleSchema = new Schema({
  externalModelType: {
    type: String,
  },
  peopleType: {
    type: Schema.Types.ObjectId,
    refPath: 'externalModelType',
  },
});

module.exports = model('Note', schema);

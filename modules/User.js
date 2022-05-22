const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  // registation
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  // profile
  profile: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    status: {type: String, default: null},
    rating: {type: Number, default: 0},
    birthDate: {type: Date, required: true},
    description: {type: String, default: null},
    city: {type: String, default: null},
    school: [
      {
        name: {type: String, default: null},
      },
    ],
    university: [
      {
        name: {type: String, default: null},
        faculty: {type: String, default: null},
        startDate: {type: String, default: null},
        endDate: {type: String, default: null},
      },
    ],
    isSearchWork: {type: Boolean, default: false},
    career: [
      {
        placeOfWork: {type: String, default: null},
        position: {type: String, default: null},
        startDate: {type: String, default: null},
        endDate: {type: String, default: null},
      },
    ],
    skills: [{name: {type: String, default: null}}],
    phoneNumber: {type: String, default: null},
    email: {type: String, default: null},
    friends: {type: Array, default: null},
    groups: {type: Array, default: null},
    isOnline: {type: Boolean, default: false},
  },
  // options
  role: {type: String, default: 'USER'},
  isBlocked: {type: Boolean, default: false},
  createDate: {type: Date, default: new Date()},
  // dep
  notes: [{type: Types.ObjectId, ref: 'Note'}],
  portfolio: [{type: Types.ObjectId, ref: 'Portfolio'}],
});

module.exports = model('User', schema);

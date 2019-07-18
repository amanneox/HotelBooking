const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const model = mongoose.model('RoomType', {
roomType:{
  type :String,
  required: true
},
roomPrice:{
  type: String,
  required:true
},

});

module.exports = model;

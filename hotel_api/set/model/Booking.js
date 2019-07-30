const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const model = mongoose.model('Booking', {
  cID:{
  type :ObjectId,
  required: true
},
userID:{
  type: ObjectId,
  required:true
},
roomList:[
  {
    type: String
  }
],
cInDate:{
  type:Date,
  required:true
},
cOutDate:{
  type:Date,
  required:true
}

});

module.exports = model;

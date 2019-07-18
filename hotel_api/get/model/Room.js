const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const model = mongoose.model('Room', {
  roomNo:{
  type :String,
  required: true
},
rating:{
  type: Number,
  required:true
},
roomType:{
  type:String,
  required:true
}.
description:{
  type: String
},
isReserved:{
  type:Boolean,
  default: false
},
imageList:[
  {
    img_url : String
  }
]

});

module.exports = model;

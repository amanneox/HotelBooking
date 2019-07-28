const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const model = mongoose.model('Customer', {
  name:{
  type :String,
  required: true
},
number:{
  type: Number,
  required:true
},
email:{
  type:String,
  required:true
}

});

module.exports = model;

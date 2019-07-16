const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const model = mongoose.model('Grocery', {
  name:{
  type :String,
  required: true
},
quantity:{
  type: Number,
  required:true
},
unit:{
  type:String,
  required:true
}

});

module.exports = model;

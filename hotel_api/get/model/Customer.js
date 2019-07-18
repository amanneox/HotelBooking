const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const model = mongoose.model('Customer', {
  cName:{
  type :String,
  required: true
},
cNumber:{
  type: Number,
  required:true
},
cEmail:{
  type:String,
  required:true
}

});

module.exports = model;

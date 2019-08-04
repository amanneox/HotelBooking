const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const model = mongoose.model('Rent', {
cID:{
  type: ObjectId,
  required: true
},
amount:{
  type: String,
  required:true
},
isActive:{
  type:Boolean,
  default: true
}

});

module.exports = model;

const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const model = mongoose.model('Staff', {
  name:{
  type :String,
  required: true
},
number:{
  type: Number,
  required:true
},
job:{
  type:String,
  required:true
},
salary:{
  type:String
},
isActive:{
  type: Boolean,
  default: true
},
joinDate:{
  type:Date,
  default: Date.now
}

});

module.exports = model;

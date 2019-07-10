const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const model = mongoose.model('Authorities', {
  userID:{
  type :ObjectId,
  required: true
},
authorities:{
  type: String,
  required:true
}

});

module.exports = model;

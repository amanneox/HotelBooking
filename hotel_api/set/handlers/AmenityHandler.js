const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const AmenityModel = require('../model/Amenity.js')

require('dotenv').config()
mongoose.Promise = Promise;

const mongoString = process.env.MONGO_URI; // MongoDB Url

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: {
    'Content-Type': 'text/plain',
    "Access-Control-Allow-Origin": "*",
  },
  body: message || 'Incorrect id',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => db.close());

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, {
    useMongoClient: true
  }), fn);
}

module.exports.createAmenity = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const amenity = new AmenityModel({
    name: data.name,
    quantity: data.quantity,
    unit: data.unit,
  })


  dbConnectAndExecute(mongoString, () => (
    amenity
    .save()
    .then(() => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        id: amenity.id
      }),
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};
module.exports.updateAmenity = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  if (!validator.isAlphanumeric(id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  const amenity = new AmenityModel({
    _id: id,
    name: data.name,
    quantity: data.quantity,
    unit: data.unit,
  });

  if (amenity.validateSync()) {
    callback(null, createErrorResponse(400, 'Incorrect parameter'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    AmenityModel.findByIdAndUpdate(id, amenity)
    .then(() => callback(null, {
      statusCode: 200,
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
      body: JSON.stringify('Ok')
    }))
    .catch(err => callback(err, createErrorResponse(err.statusCode, err.message)))
  ));
};

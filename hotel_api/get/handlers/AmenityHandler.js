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

module.exports.amenity = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    AmenityModel
    .find({
      _id: event.pathParameters.id
    })
    .then(amenity => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(amenity)
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}

module.exports.getAmenitys = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    AmenityModel
    .find()
    .then(amenity => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(amenity)
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))

}

module.exports.deleteAmenity = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'))
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    AmenityModel
    .remove({
      _id: event.pathParameters.id
    })
    .then(() => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify('Ok')
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}

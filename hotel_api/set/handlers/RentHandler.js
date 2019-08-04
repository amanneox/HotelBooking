const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const RentModel = require('../model/Rent.js')

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

module.exports.createRent = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const rent = new RentModel({

    cID: data.cID,
    amount: data.amount,

  })


  dbConnectAndExecute(mongoString, () => (
    rent
    .save()
    .then(() => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        id: rent.id
      }),
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.updateRent = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  if (!validator.isAlphanumeric(id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  const rent = new RentModel({
    _id: id,
    amount: data.amount,
    isActive: data.isActive
  });


  dbConnectAndExecute(mongoString, () => (
    RentModel.findByIdAndUpdate(id, rent)
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

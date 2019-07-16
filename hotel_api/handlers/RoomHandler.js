const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const RoomModel = require('../model/Room.js')

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

module.exports.room = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    RoomModel
    .find({
      _id: event.pathParameters.id
    })
    .then(room => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(room)
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}


module.exports.createRoom = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const room = new RoomModel({
    roomNo: data.roomNo,
    rating: data.rating,
    roomType: data.roomType,
    description: data.description,
    imageList: data.imageList
  })


  dbConnectAndExecute(mongoString, () => (
    room
    .save()
    .then(() => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        id: room.id
      }),
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.deleteRoom = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    RoomModel
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
  ));
};

module.exports.updateRoom = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  if (!validator.isAlphanumeric(id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  const room = new RoomModel({
    _id: id,
    roomNo: data.roomNo,
    rating: data.rating,
    roomType: data.roomType,
    description: data.description,
    imageList: data.imageList
  });

  if (room.validateSync()) {
    callback(null, createErrorResponse(400, 'Incorrect parameter'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    RoomModel.findByIdAndUpdate(id, room)
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

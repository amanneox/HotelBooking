const mongoose = require('mongoose')
const Promise = require('bluebird')
const validator = require('validator')
const UserModel = require('../model/User.js')
const { token } = require('../lib/token.js')
const { hash ,unhash } = require('../lib/hash.js')
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

module.exports.user = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    UserModel
    .find({
      _id: event.pathParameters.id
    })
    .then(user => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(user)
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))
}

module.exports.listUsers = async (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    UserModel
    .find()
    .then(user => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(user)
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ))

}


module.exports.authenticate = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const res = dbConnectAndExecute(mongoString, () => (
    UserModel
    .find({
      email: data.email
    })
    .then(function(value) {
      if (value != []) {
        const userhash = unhash(data.password, value[0].salt)
        console.log(userhash)
        if (value[0].password == userhash.passwordHash) {
          const jwttoken = token(value[0])

          const obj = {
            ...value[0],
            token: jwttoken
          }
          callback(null, {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(obj)
          })
        } else {
          callback(null, {
            statusCode: 401,
            headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
              msg: 'Invalid Credentials'
            })
          })
        }
      } else {
        callback(null, {
          statusCode: 401,
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            msg: 'No Email Found'
          })
        })
      }
    })
  ).catch(err => callback(null, createErrorResponse(err.statusCode, err.message))))
}
module.exports.createUser = (event, context, callback) => {
  const data = JSON.parse(event.body)
  console.log(data)
  const hashkey = hash(data.password)
  const user = new UserModel({
    name: data.name,
    city: data.city,
    email: data.email,
    number: data.number,
    username: data.username,
    password: hashkey.passwordHash,
    salt: hashkey.salt
  })

  dbConnectAndExecute(mongoString, () => (
    user
    .save()
    .then(() => callback(null, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({id: user.id}),
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.deleteUser = (event, context, callback) => {
  if (!validator.isAlphanumeric(event.pathParameters.id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    UserModel
    .remove({
      _id: event.pathParameters.id
    })
    .then(() => callback(null, {
      statusCode: 200,
      body: JSON.stringify('Ok')
    }))
    .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

module.exports.updateUser = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  if (!validator.isAlphanumeric(id)) {
    callback(null, createErrorResponse(400, 'Incorrect id'));
    return;
  }

  const user = new UserModel({
    _id: id,
    name: data.name,
    city: data.city,
    email: data.email,
    number: data.number,
    username: data.username,
  });

  if (user.validateSync()) {
    callback(null, createErrorResponse(400, 'Incorrect parameter'));
    return;
  }

  dbConnectAndExecute(mongoString, () => (
    UserModel.findByIdAndUpdate(id, user)
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

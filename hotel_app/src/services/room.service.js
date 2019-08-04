// import config from 'config'
/* eslint-disable */
import axios from 'axios'
const config = {
  getUrl:'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev',
  setUrl:'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev'
}
export const roomService = {
  create,
  createType,
  getAll,
  getRoomTypes,
  getById,
  update,
  getByIdType,
  delete: _delete
}

async function getAll(){
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
  }
try {
  const res = await axios.get(`${config.getUrl}/room/list`)
//  console.log(res.data)
  return res.data
} catch (error) {
    return Promise.reject(error)
}
}
async function getRoomTypes() {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
  }
try {
  const res = await axios.get(`${config.getUrl}/roomType/list`)
//  console.log(res.data)
  return res.data
} catch (error) {
    return Promise.reject(error)
}
}
async function create(room) {
//  console.log(room,'@@@')
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...room
  }
//  console.log(roomType,'@@@')
  try {
    const res = await axios.post(`${config.setUrl}/room`, requestOptions)
//    console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

async function createType(roomType){
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...roomType
  }
//  console.log(roomType,'@@@')
  try {
    const res = await axios.post(`${config.setUrl}/roomType`, requestOptions)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

async function getById (id) {
//  console.log(id)
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
  }
try {
  const res = await axios.get(`${config.getUrl}/room/${id}`)
//  console.log(res.data)
  return res.data
} catch (error) {
    return Promise.reject(error)
}
  }
  async function getByIdType (id) {
  //  console.log(id)
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
     },
    }
  try {
    const res = await axios.get(`${config.getUrl}/roomType/${id}`)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
    }
async function update (room) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...room
  }
//  console.log(roomType,'@@@')
  try {
    const res = await axios.put(`${config.setUrl}/room/${room._id}`, requestOptions)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete (id) {
  try {
    const res = await axios.get(`${config.getUrl}/room/delete/${id}`)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

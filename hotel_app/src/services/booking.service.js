// import config from 'config'
/* eslint-disable */
import axios from 'axios'
const config = {
  getUrl:'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev',
  setUrl:'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev'
}
export const bookingService = {
  create,
  getAll,
  getById,
  update,
  bookRoom,
  unbookRoom,
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
  const res = await axios.get(`${config.getUrl}/booking/list`)
//  console.log(res.data)
  return res.data
} catch (error) {
    return Promise.reject(error)
}
}

async function create(booking) {
//  console.log(booking,'@@@')
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...booking
  }
//  console.log(bookingType,'@@@')
  try {
    const res = await axios.post(`${config.setUrl}/booking`, requestOptions)
//    console.log(res.data)
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
  const res = await axios.get(`${config.getUrl}/booking/${id}`)
//  console.log(res.data)
  return res.data
} catch (error) {
    return Promise.reject(error)
}
  }

async function update (booking) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...booking
  }
//  console.log(bookingType,'@@@')
  try {
    const res = await axios.put(`${config.setUrl}/booking/${booking._id}`, requestOptions)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

async function bookRoom (room) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
  }
//  console.log(bookingType,'@@@')
  try {
    const res = await axios.put(`${config.setUrl}/room/book/${room}`, requestOptions)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}
async function unbookRoom (room) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
  }
//  console.log(bookingType,'@@@')
  try {
    const res = await axios.put(`${config.setUrl}/room/unbook/${room}`, requestOptions)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}
// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete (data) {
  try {
    const res = await axios.get(`${config.getUrl}/booking/delete/${data.id}`)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

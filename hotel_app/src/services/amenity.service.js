
import axios from 'axios'
import { config } from './config.js'

export const amenityService = {
  create,
  getAll,
  getById,
  update,
  delete: _delete
}
// List all the amenity
async function getAll () {
  try {
    const res = await axios.get(`${config.getUrl}/amenity/list`)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

// create a new amenity
async function create (amenity) {
//  console.log(amenity,'@@@')
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    ...amenity
  }
  //  console.log(amenityType,'@@@')
  try {
    const res = await axios.post(`${config.setUrl}/amenity`, requestOptions)
    //    console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

// get amenity by id
async function getById (id) {
  try {
    const res = await axios.get(`${config.getUrl}/amenity/${id}`)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

// update amenity
async function update (amenity) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    ...amenity
  }
  //  console.log(amenityType,'@@@')
  try {
    const res = await axios.put(`${config.setUrl}/amenity/${amenity._id}`, requestOptions)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete (id) {
  try {
    const res = await axios.get(`${config.getUrl}/amenity/delete/${id}`)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

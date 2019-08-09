import axios from 'axios'
import { config } from './config.js'
export const bookingService = {
  create,
  getAll,
  getById,
  update,
  bookRoom,
  unbookRoom,
  delete: _delete
}

async function getAll () {
  try {
    const res = await axios.get(`${config.getUrl}/booking/list`)

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function create (booking) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    ...booking
  }

  try {
    const res = await axios.post(`${config.setUrl}/booking`, requestOptions)

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getById (id) {
  try {
    const res = await axios.get(`${config.getUrl}/booking/${id}`)

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function update (booking) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    ...booking
  }

  try {
    const res = await axios.put(`${config.setUrl}/booking/${booking._id}`, requestOptions)

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function bookRoom (room) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }

  try {
    const res = await axios.put(`${config.setUrl}/room/book/${room}`, requestOptions)

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}
async function unbookRoom (room) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }

  try {
    const res = await axios.put(`${config.setUrl}/room/unbook/${room}`, requestOptions)

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}
// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete (data) {
  try {
    const res = await axios.get(`${config.getUrl}/booking/delete/${data.id}`)

    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

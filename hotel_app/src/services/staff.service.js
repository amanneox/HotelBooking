import axios from 'axios'
import { config } from './config.js'
export const staffService = {
  create,
  getAll,
  getById,
  update,
  delete: _delete
}

async function getAll () {
  try {
    const res = await axios.get(`${config.getUrl}/staff/list`)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function create (staff) {
//  console.log(staff,'@@@')
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    ...staff
  }
  //  console.log(staffType,'@@@')
  try {
    const res = await axios.post(`${config.setUrl}/staff`, requestOptions)
    //    console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getById (id) {
  try {
    const res = await axios.get(`${config.getUrl}/staff/${id}`)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function update (staff) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    ...staff
  }
  //  console.log(staffType,'@@@')
  try {
    const res = await axios.put(`${config.setUrl}/staff/${staff._id}`, requestOptions)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete (id) {
  try {
    const res = await axios.get(`${config.getUrl}/staff/delete/${id}`)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

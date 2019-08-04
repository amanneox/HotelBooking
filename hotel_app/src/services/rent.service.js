// import config from 'config'
/* eslint-disable */
import axios from 'axios'
const config = {
  getUrl:'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev',
  setUrl:'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev'
}
export const rentService = {
  create,
  getAll,
  getById,
  update,
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
  const res = await axios.get(`${config.getUrl}/rent/list`)
//  console.log(res.data)
  return res.data
} catch (error) {
    return Promise.reject(error)
}
}

async function create(rent) {
//  console.log(rent,'@@@')
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...rent
  }
//  console.log(rentType,'@@@')
  try {
    const res = await axios.post(`${config.setUrl}/rent`, requestOptions)
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
  const res = await axios.get(`${config.getUrl}/rent/${id}`)
//  console.log(res.data)
  return res.data
} catch (error) {
    return Promise.reject(error)
}
  }

async function update (rent) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...rent
  }
//  console.log(rentType,'@@@')
  try {
    const res = await axios.put(`${config.setUrl}/rent/${rent._id}`, requestOptions)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete (id) {
  try {
    const res = await axios.get(`${config.getUrl}/rent/delete/${id}`)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

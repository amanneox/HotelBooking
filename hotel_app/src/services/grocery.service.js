// import config from 'config'
/* eslint-disable */
import axios from 'axios'
const config = {
  getUrl:'https://w8hvzw7rj7.execute-api.ap-south-1.amazonaws.com/dev',
  setUrl:'https://0h36d9fv5f.execute-api.ap-south-1.amazonaws.com/dev'
}
export const groceryService = {
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
  const res = await axios.get(`${config.getUrl}/grocery/list`)
//  console.log(res.data)
  return res.data
} catch (error) {
    return Promise.reject(error)
}
}

async function create(grocery) {
//  console.log(grocery,'@@@')
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...grocery
  }
//  console.log(groceryType,'@@@')
  try {
    const res = await axios.post(`${config.setUrl}/grocery`, requestOptions)
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
  const res = await axios.get(`${config.getUrl}/grocery/${id}`)
//  console.log(res.data)
  return res.data
} catch (error) {
    return Promise.reject(error)
}
  }

async function update (grocery) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...grocery
  }
//  console.log(groceryType,'@@@')
  try {
    const res = await axios.put(`${config.setUrl}/grocery/${grocery._id}`, requestOptions)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete (id) {
  try {
    const res = await axios.get(`${config.getUrl}/grocery/delete/${id}`)
  //  console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

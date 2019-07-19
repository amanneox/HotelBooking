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

function update (user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }

  return fetch(`${config.setUrl}/room/${user.id}`, requestOptions).then(handleResponse)
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

async function handleResponse (response) {
  //console.log(response.data)
  return await response.data.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.data) {
      if (response.status !== 200) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}

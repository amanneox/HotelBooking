// import config from 'config'
/* eslint-disable */
import axios from 'axios'
const config = {
  apiUrl:'https://ajp80vnp26.execute-api.ap-south-1.amazonaws.com/dev'
}
export const roomService = {
  create,
  createType,
  getAll,
  getById,
  update,
  delete: _delete
}

async function getAll(){

}
async function create() {

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
  console.log(roomType,'@@@')
  try {
    const res = await axios.post(`${config.apiUrl}/roomType`, requestOptions)
    console.log(res.data)
    return res.data
  } catch (error) {
      return Promise.reject(error)
  }
}

async function getById (id) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
  }
try {
  const res = await axios.get(`${config.apiUrl}/room/${id}`, requestOptions)
  console.log(res.data)
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

  return fetch(`${config.apiUrl}/room/${user.id}`, requestOptions).then(handleResponse)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete (id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(`${config.apiUrl}/room/${id}`, requestOptions).then(handleResponse)
}

async function handleResponse (response) {
  console.log(response.data)
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

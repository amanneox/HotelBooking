// import config from 'config'
/* eslint-disable */
import axios from 'axios'
const config = {
  apiUrl:'https://ajp80vnp26.execute-api.ap-south-1.amazonaws.com/dev'
}
export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
}

async function login (email, password) {
  console.log(email,password)

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   email,
   password
  }
try {
  const res = await axios.post(`${config.apiUrl}/user/authenticate`, requestOptions)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.data.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes

        localStorage.setItem('user', JSON.stringify(user.data._doc))
      }
      return user.data
    })
  //  console.log(res.data,'@@@')
  //  return res.data
  }
catch (error) {
      console.log(error)
      return Promise.reject('Invalid Credentials')
    }
}

async function getAll(){

}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

async function register (user) {
  const payload = {
    name:user.name,
    number:user.number,
    email: user.email,
    password: user.password,
    username: user.email.split('@')[0]
  }
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
   },
   ...payload
  }
  try {
      const res = await axios.post(`${config.apiUrl}/user`,requestOptions)
      console.log(res.data,'@@@')
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
  const res = await axios.get(`${config.apiUrl}/user/${id}`, requestOptions)
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

  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete (id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  }

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse)
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

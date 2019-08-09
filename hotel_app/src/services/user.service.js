import axios from 'axios'
import { config } from './config.js'
export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update
}

async function login (email, password) {
//  console.log(email,password)

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    email,
    password
  }
  try {
    await axios.post(`${config.setUrl}/user/authenticate`, requestOptions)
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
  } catch (error) {
    //  console.log(error)
    return Promise.reject(new Error('Invalid Credentials'))
  }
}

async function getAll () {

}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

async function register (user) {
  const payload = {
    name: user.name,
    number: user.number,
    email: user.email,
    password: user.password,
    username: user.email.split('@')[0]
  }
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    ...payload
  }
  try {
    const res = await axios.post(`${config.setUrl}/user`, requestOptions)
    //  console.log(res.data,'@@@')
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getById (id) {
  try {
    const res = await axios.get(`${config.getUrl}/user/${id}`)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function update (user) {
//  console.log(user)
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    ...user
  }
  //  console.log(staffType,'@@@')
  try {
    const res = await axios.put(`${config.setUrl}/user/${user._id}`, requestOptions)
    //  console.log(res.data)
    return res.data
  } catch (error) {
    return Promise.reject(error)
  }
}

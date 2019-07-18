var jwt = require('jsonwebtoken')
require('dotenv').config()
const secret =  process.env.SECRET // Configure Your Secret Key

module.exports.token = (body) => genToken(body)
function genToken(body) {
  const token = jwt.sign({ user: body }, secret)
  return token
}

const crypto = require('crypto')
module.exports.hash = (password) => saltHashPassword(password)

module.exports.unhash = (password,salt) => saltUnhashPassword(password,salt)

const genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length)   /** return required number of characters */
}

const sha512 = function(password, salt){
    const hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
    hash.update(password)
    const value = hash.digest('hex')
    return {
        salt:salt,
        passwordHash:value
    }
}

function saltHashPassword(userpassword) {
    const salt = genRandomString(16) /** Gives us salt of length 16 */
    const passwordData = sha512(userpassword, salt)
    return passwordData
}



function saltUnhashPassword (password,salt) {
  const passwordData = sha512(password, salt)
  return passwordData
}

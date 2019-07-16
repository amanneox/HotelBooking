module.exports.success = (body) => buildResponse(200, body)

module.exports.failure = (body) => buildResponse(500, body)

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  }
}

var token = require('../access_token');

module.exports = [
{
  request: {
    path: '/key',
    method: 'GET'
  },
  response: {
    data: {
      access_token: token.getToken()
    }
  }
}]

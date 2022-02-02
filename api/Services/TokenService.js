import jsonwebtoken from 'jsonwebtoken'

class TokenService {
  static createLoginToken({ user, expiresIn = 10000, scope = ['test', 'dummy'] }) {
    const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
    const accessToken = jsonwebtoken.sign(
      {
        ...user,
        scope,
      },
      'dummy',
      {
        expiresIn
      }
    )
    return { accessToken, refreshToken }
  }

}

module.exports = TokenService

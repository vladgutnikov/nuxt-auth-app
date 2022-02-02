import { usersList } from '../DB'
const TokenService = require('../Services/TokenService')

let currentUser = {}

class AuthController {
  static login(req, res) {
    const { email, password } = req.body
    const user = usersList.find((availableUser) => availableUser.email === email && availableUser.password === password)
    if (!user) {
      res.status(404).send()
    }
    currentUser = user

    const loginToken = TokenService.createLoginToken({ user })
    res.json(loginToken)
  }

  static logout(req, res) {
    currentUser = {}
    res.status(200).send()
  }

  static user(req, res) {
    res.status(200).send({ user: currentUser })
  }
}

module.exports = AuthController

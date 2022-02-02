import { usersList } from '../DB'

class UserController {
  static getUsers(req, res) {
    const users = usersList.map(user => {
      const { password, ...rest } = user
      return rest
    })
    res.json({data: users})
  }
}

module.exports = UserController

import PromiseRouter from 'express-promise-router'
const AuthController = require('../Controllers/AuthController.js')
const UserController = require('../Controllers/UserController.js')

const router = PromiseRouter()

router.use('/auth', [
  router.post('/login', AuthController.login),
  router.post('/logout', AuthController.logout),
  router.get('/user', AuthController.user),
])
router.use('/users', [
  router.get('/', UserController.getUsers),
])


export default router

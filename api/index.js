import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'
import routes from './Routes/api'

const app = express()
app.use(
  jwt({
    secret: 'dummy',
    algorithms: ['sha1', 'RS256', 'HS256']
  }).unless({
    path: ['/api/auth/login', '/api/auth/logout']
  })
)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(routes)

app.use((err, req, res) => {
  res.status(401).send(err)
});

export default {
  path: '/api',
  handler: app
}

import Express from 'express'
import Http from 'http'
import core from './src/core'
import bodyParser from 'body-parser'

/**
 *
 * instance server
 *
 */
const app = Express()
const Server = Http.Server(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 *
 * runner the core (routes modules, middlewares modules)
 *
 */

core.loadResources(app)

/**
 *
 * start server
 *
 */

Server.listen('3002', () => {
  console.log('funfando...')
})

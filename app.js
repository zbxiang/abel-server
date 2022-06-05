require('module-alias/register')

const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const json = require('koa-json')
const path = require('path')
const InitManager = require('./core/init')
const static = require('koa-static')
const log4js = require('./utils/log4j')
const onerror = require('koa-onerror')
const router = require('koa-router')()

const app = new Koa()
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// app.use(parser())
app.use(static(path.join(__dirname, './static')))
router.prefix('/api')
InitManager.initCore(router)
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  log4js.error(`${err.stack}`)
});

module.exports = app
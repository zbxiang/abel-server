require('module-alias/register')

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const json = require('koa-json')
const koajwt = require('koa-jwt')
const path = require('path')
const InitManager = require('./core/init')
const static = require('koa-static')
const log4js = require('./utils/log4j')
const onerror = require('koa-onerror')
const router = require('koa-router')()
const util = require('./utils/util')
const { PRIVATE_KEY } = require('./config/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  log4js.info(`get params:${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post params:${JSON.stringify(ctx.request.body)}`)
  await next().catch((err) => {
    if (err.status == '401') {
      ctx.status = 200;
      ctx.body = util.fail('Token认证失败', util.CODE.AUTH_ERROR)
    } else {
      throw err;
    }
  })
})

app.use(koajwt({ secret: `${PRIVATE_KEY}` }).unless({
  path: [/^\/api\/user\/login/]
}))

// app.use(parser())
// app.use(static(path.join(__dirname, './static')))


router.prefix('/api')
InitManager.initCore(router)
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  log4js.error(`${err.stack}`)
});

module.exports = app
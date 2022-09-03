const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const util = require('./../../../utils/util')
const leaveService = require('./../../../models/leaveModel')

router.prefix('/leave')

router.get('/count', async (ctx) => {
    let authorization = ctx.request.headers.authorization
    let { data } = util.decoded(authorization)
    try {
        let params = {}
        params.curAuditUserName = data.userName
        params.$or = [{ applyState: 1 }, { applyState: 2}]
        const total = await leaveService.leaveCount(params)
        ctx.body = util.success(total)
    } catch (error) {
        ctx.body = util.fail(`查询异常：${error.message}`)
    }
})

module.exports = router
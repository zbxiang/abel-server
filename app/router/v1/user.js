const router = require('koa-router')()
const { User } = require('../../../models/userModel')
const util = require('../../../utils/util')
router.prefix('/v1/user')

// 登录
router.post('/login', async (ctx) => {
    try {
        const { userName, userPwd } = ctx.request.body
        const res = await User.userLogin(userName, userPwd)
    } catch (error) {
        ctx.body = util.fail(error.msg)
    }
})

module.exports = router
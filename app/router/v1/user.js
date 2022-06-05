const router = require('koa-router')()
const userService = require('../../../models/userModel')
const util = require('../../../utils/util')
const jwt = require('jsonwebtoken')
const {PWD_SALT,PRIVATE_KEY, JWT_EXPIRED} = require('./../../../config/index')
const md5 = require('md5')
router.prefix('/users')

// 登录
router.post('/login', async (ctx, next) => {
    try {
        const { userName, userPwd } = ctx.request.body
        const res = await userService.login({userName, userPwd: md5(`${userPwd}${PWD_SALT}`)}, next)
        if (res) {
            const data = res
            const token = jwt.sign(
                {userName},
                PRIVATE_KEY,
                { expiresIn: JWT_EXPIRED}
            )
            data.token = token
            ctx.body = util.success(data)
        } else {
            ctx.body = util.fail('账号或密码不正确')
        }
    } catch (error) {
        ctx.body = util.fail(error.msg)
    }
})

// 获取用户对应的权限菜单
router.get('/getPermissionList', async (ctx) => {
    let authorization = ctx.request.headers.authorization
    let { data } = util.decoded(authorization)
    console.log(authorization)
})

module.exports = router
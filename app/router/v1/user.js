const router = require('koa-router')()
const userService = require('../../../models/userModel')
const menuService = require('./../../../models/menuModel')
const util = require('../../../utils/util')
const jwt = require('jsonwebtoken')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('./../../../config/index')
const md5 = require('md5')
router.prefix('/users')

// 登录
router.post('/login', async (ctx, next) => {
    try {
        const { userName, userPwd } = ctx.request.body
        const res = await userService.login({ userName, userPwd: md5(`${userPwd}${PWD_SALT}`) }, next)
        if (res) {
            const data = res
            const token = jwt.sign({
                data
            }, PRIVATE_KEY, { expiresIn: JWT_EXPIRED })
            data.token = token
            ctx.body = util.success(data)
        } else {
            ctx.body = util.fail('账号或密码不正确')
        }
    } catch (error) {
        ctx.body = util.fail(error.msg)
    }
})

// 用户列表
router.get('/list', async (ctx, next) => {
    try {
        // 根据条件查询所有用户列表
        const params = ctx.request.query
        let res = await userService.getUserList(params) || []
        ctx.body = util.success(res, '操作成功')
    } catch (error) {
        ctx.body = util.fail(`查询异常：${error.stack}`)
    }
})

// 获取全量用户列表
router.get('/all/list', async (ctx) => {
    try {
        let res = await userService.getUserAllList() || []
        ctx.body = util.success(res, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

// 用户新增
router.post('/addUser', async (ctx) => {
    try {
        const query = ctx.request.body
        const{ userName, userEmail } = query
        if (!userName || !userEmail) {
            ctx.body = util.fail('参数错误', util.CODE.PARAM_ERROR)
            return
        }
        await userService.addUser(query)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

// 获取用户对应的权限菜单
router.get('/getPermissionList', async (ctx) => {
    let authorization = ctx.request.headers.authorization
    let { data } = util.decoded(authorization)
    let menuList = await getMenuList(data.role, data.roleList)
    // let actionList = getAction(JSON.parse(JSON.stringify(menuList)))
    // ctx.body = util.success({ menuList, actionList })
    // console.log(authorization)
})

async function getMenuList(userRole, roleKeys) {
    let rootList = []
    // 系统管理员 查询所有的菜单列表
    if (userRole == 0) {
        rootList = await menuService.getMenuList({}) || []
    } else {
        // 根据用户拥有的角色，获取权限列表
        // 先查找用户对应的角色有哪些
        let roleList = await RoleService.getRoleList({ _id: {}})
        let permissionList = []
        roleList.map(role => {
            let { checkedKeys, halfCheckedKeys } = role.permissionList
            permissionList = permissionList.concat(...checkedKeys, ...halfCheckedKeys)
        })
        permissionList = [...new Set(permissionList)]
        rootList = await menuService.getMenuList({}) || []
    }
    return util.getTreeMenu(rootList, null, [])
}

module.exports = router
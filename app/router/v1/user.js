const router = require('koa-router')()
const userService = require('../../../models/userModel')
const menuService = require('./../../../models/menuModel')
const RoleService = require('./../../../models/roleModel')
const util = require('../../../utils/util')
const jwt = require('jsonwebtoken')
const { PWD_SALT, PRIVATE_KEY, JWT_EXPIRED } = require('./../../../config/index')
const md5 = require('md5')
router.prefix('/user')

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
router.post('/add', async (ctx) => {
    const{ userName, userEmail, mobile, job, state, roleList, deptId, sex, remark} = ctx.request.body
    if (!userName || !userEmail || !deptId) {
        ctx.body = util.fail('参数错误', util.CODE.PARAM_ERROR)
        return
    }
    const res = await userService.findOneUser({userName, userEmail})
    if (res) {
        ctx.body = util.fail(`系统监测到有重复的用户，信息如下：${res.userName} - ${res.userEmail}`)
    } else {
        try {
            await userService.addUser({
                userName,
                userPwd: md5('123456'),
                userEmail,
                role: 1, //默认普通用户
                roleList,
                job,
                state,
                deptId,
                mobile,
                sex,
                remark
            })
            ctx.body = util.success(null, '操作成功')
        } catch (error) {
            ctx.body = util.fail(error.stack)
        }
    }
})

// 用户编辑
router.post('/update', async (ctx) => {
    try {
        const { ...params } = ctx.request.body
        params.userPwd ?
            (params.userPwd = md5(`${params.userPwd}${PWD_SALT}`))
            :
            (delete params.userPwd)
        await userService.userUpdate(params)
        ctx.body = util.success(null, '更新成功')
    } catch (error) {
        ctx.body = util.fail(error.stack, '更新失败')
    }
})

// 用户删除/批量删除
router.post('/delete', async (ctx) => {
    // 待删除的用户Id数组
    const { userIds } = ctx.request.body
    const res = await userService.deleteUser({userIds: eval(userIds)})
    if (res.affectedRows) {
        ctx.body = util.success(res, `共删除成功${res.affectedRows}条`)
        return
    }
    ctx.body = util.fail('删除失败')
})

// 获取用户对应的权限菜单
router.get('/getPermissionList', async (ctx) => {
    let authorization = ctx.request.headers.authorization
    let { data } = util.decoded(authorization)
    let menuList = await getMenuList(data.role, [].slice.call(eval(data.roleList)))
    let actionList = getAction(JSON.parse(JSON.stringify(menuList)))
    ctx.body = util.success({ menuList, actionList })
})

// 获取用户对应的权限菜单
router.get('/getMenuListByRoleId', async (ctx) => {
    ctx.body = util.success([])
    // let authorization = ctx.request.headers.authorization
    // let { data } = util.decoded(authorization)
    // let menuList = await getMenuList(data.role, util.arrayLikeArray(data.roleList))
    // let actionList = getAction(JSON.parse(JSON.stringify(menuList)))
    // ctx.body = util.success({ menuList, actionList })
})

async function getMenuList(userRole, roleKeys) {
    let rootList = []
    // 系统管理员 查询所有的菜单列表
    if (userRole == 0) {
        rootList = await menuService.getMenuList({}) || []
    } else {
        // 根据用户拥有的角色，获取权限列表
        // 先查找用户对应的角色有哪些
        let roleList = await RoleService.getRolesPermissionList({ _ids: roleKeys })
        let permissionList = []
        roleList.map(role => {
            let { checkedKeys, halfCheckedKeys } = JSON.parse(role.permissionList)
            permissionList = permissionList.concat(...checkedKeys, ...halfCheckedKeys)
        })
        permissionList = [...new Set(permissionList)]
        rootList = await menuService.getMenuPermissionList({_ids: permissionList})
    }
    return util.getTreeMenu(rootList, null, [])
}

function getAction(list) {
    let actionList = []
    const deep = (arr) => {
      while (arr.length) {
        let item = arr.pop()
        if (item.action) {
          item.action.map(action => {
            actionList.push(action.menuCode)
          })
        }
        if (item.children && !item.action) {
          deep(item.children)
        }
      }
    }
    deep(list)
    return actionList
}

module.exports = router
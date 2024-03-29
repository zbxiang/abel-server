const router = require('koa-router')()
const util = require('./../../../utils/util')
const roleService = require('./../../../models/roleModel')

router.prefix('/roles')

// 查询所有角色列表
router.get('/allList', async (ctx) => {
    try {
        let res = await roleService.getRolesAllList() || []
        ctx.body = util.success(res, '操作成功')
    } catch (error){
        ctx.body = util.fail(`查询失败：${error.stack}`)
    }
})

// 按页获取角色列表
router.get('/list', async (ctx) => {
    try {
        const params = ctx.request.query
        let res = await roleService.getRolesList(params) || []
        ctx.body = util.success(res, '操作成功')
    }catch (error) {
        ctx.body = util.fail(`查询失败：${error.stack}`)
    }
})

// 角色操作：创建、编辑和删除
// 添创建
router.post('/add', async (ctx) => {
    try {
        const { roleName, remark } = ctx.request.body
        await roleService.addRole({ roleName, remark })
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
    
})

// 编辑
router.post('/update', async (ctx) => {
    try {
        const { _id, roleName, remark } = ctx.request.body
        if (_id) {
            await roleService.updateRole({ _id, roleName, remark })
            ctx.body = util.success(null, '操作成功')
        }else {
            ctx.body = util.fail('缺少参数params: _id')
            return
        }
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

// 删除
router.post('/delete', async (ctx) => {
    try {
        const { _id } = ctx.request.body
        if (_id) {
            await roleService.delteRole({ _id })
            ctx.body = util.success(null, '操作成功')
        }else {
            ctx.body = util.fail('缺少参数params: _id')
            return
        }
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

// 权限设置
router.post('/update/permission', async (ctx) => {
    const query = ctx.request.body
    try {
        await roleService.findByIdAndUpdate(query)
        ctx.body = util.success(null, "权限设置成功")
    } catch (error) {
        ctx.body = util.fail('权限设置失败')
    }
})

module.exports = router
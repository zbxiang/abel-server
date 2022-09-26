const router = require('koa-router')()
const util = require('../../../utils/util')
const menuService = require('../../../models/menuModel')

router.prefix('/menu')

// 菜单列表查询
router.get('/list', async (ctx) => {
    const { name, status } = ctx.request.query
    const params = {}
    name && (params.name = name)
    status && (params.status = status)
    let menuList = await menuService.getMenuList(params) || []
    if (name) {
        ctx.body = util.success(menuList)
    } else {
        console.log('sgksjdgjdjgsd')
        console.log(menuList)
        const permissionList = util.getTreeMenuList(menuList, null, [])
        ctx.body = util.success(permissionList)
    }
})


// 菜单编辑、删除、新增功能
// 新增
router.post('/add', async (ctx) => {
    const { ...params }= ctx.request.body
    try {
        await menuService.menuAdd(params)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

// 编辑
router.post('/update', async (ctx) => {
    const { ...params }= ctx.request.body
    try {
        await menuService.updateMenu(params)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

// 编辑
router.get('/delete', async (ctx) => {
    try {
        const query = ctx.request.query
        await menuService.deleteMenu(query)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

module.exports = router
const router = require('koa-router')()
const util = require('./../../../utils/util')
const menuService = require('./../../../models/menuModel')

router.prefix('/menu')

// 菜单列表查询
router.get('/list', async (ctx) => {
    // const { menuName, menuState, pageSize, pageNum } = ctx.request.query
    // const params = {}
    // if (menuName) params.menuName = menuName
    // if (menuState) params.menuState = menuState
    // if (pageSize) params.pageSize = pageSize
    // if (pageNum) params.pageNum = pageNum
    const params = ctx.request.query
    let rootList = await menuService.getMenuList(params) || []
    ctx.body = util.success(rootList)
})

// 菜单编辑、删除、新增功能
// 新增
router.post('/addMenu', async (ctx) => {
    try {
        const query = ctx.request.body
        await menuService.addMenu(query)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

// 编辑
router.post('/updateMenu', async (ctx) => {
    try {
        const query = ctx.request.body
        await menuService.updateMenu(query)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

// 编辑
router.get('/deleteMenu', async (ctx) => {
    try {
        const query = ctx.request.query
        await menuService.deleteMenu(query)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

module.exports = router
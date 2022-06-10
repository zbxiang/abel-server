const router = require('koa-router')()
const util = require('./../../../utils/util')
const menuService = require('./../../../models/menuModel')

router.prefix('/menu')

// 菜单列表查询
router.get('/list', async (ctx) => {
    const { menuName, menuState } = ctx.request.query
    const params = {}
    if (menuName) params.menuName = menuName
    if (menuState) params.menuState = menuState
    let rootList = await menuService.getMenuList(params) || []
    console.log(menuName, menuState)
})

// 菜单编辑、删除、新增功能
router.post('/operate', async (ctx) => {
    console.log(ctx.request.body)
    const { _id, action, ...params } = ctx.request.body
    let res, info
    try {
        if (action == 'add') {
            res = await menuService.addMenu(params)
        }
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

module.exports = router
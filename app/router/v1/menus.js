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
    let rootList = await menuService.menuList(params) || []
    console.log(menuName, menuState)
})

module.exports = router
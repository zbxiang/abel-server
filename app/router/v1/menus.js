const router = require('koa-router')()
const util = require('./../../../utils/util')
const Menu = require('./../../../models/menuModel')

router.prefix('/menu')

// 菜单列表查询
router.get('/list', async (ctx) => {
    console.log('sdgsjdkgsdkg')
})

module.exports = router
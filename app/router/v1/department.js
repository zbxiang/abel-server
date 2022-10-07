const router = require('koa-router')()
const util = require('./../../../utils/util')
const departmentService = require('../../../models/departmentModel')

router.prefix('/department')

// 部门树形列表
router.get('/list', async (ctx) => {
    let { name } = ctx.request.query
    let params = {}
    if (name) params.name = name
    let rootList = await departmentService.getDepartmentList(params)
    if (name) {
        ctx.body = util.success(rootList)
    } else {
        let tressList = getTreeDepartment(rootList, null, [])
        ctx.body = util.success(tressList)
    }
})

// 递归拼接树形列表
function getTreeDepartment(rootList, id, list) {
    for (let i = 0; i < rootList.length; i++) {
        let item = rootList[i]
        if (String(item.parentIds.slice().pop()) == String(id)) {
            list.push(item)
        }
    }
    list.map(item => {
        item.children = []
        getTreeDepartment(rootList, item.id, item.children)
        if (item.children.length == 0) {
            delete item.children;
        }
    })
    return list
}

// 部门操作 创建 编辑 删除
router.post('/add', async (ctx) => {
    try {
        const params = ctx.request.body
        await departmentService.departmentAdd(params)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

router.post('/update', async (ctx) => {
    try {
        const { ...params } = ctx.request.body
        await departmentService.departmentUpdate(params)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

module.exports = router
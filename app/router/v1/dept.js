const router = require('koa-router')()
const util = require('./../../../utils/util')
const deptService = require('../../../models/departmentModel')

router.prefix('/dept')

// 部门树形列表
router.get('/list', async (ctx) => {
    let { deptName } = ctx.request.query
    let params = {}
    if (deptName) params.deptName = deptName
    let rootList = await deptService.getDeptList(params)
    if (deptName) {
        ctx.body = util.success(rootList);
    } else {
        let tressList = getTreeDept(rootList, null, [])
        ctx.body = util.success(tressList)
    }
})

// 递归拼接树形列表
function getTreeDept(rootList, id, list) {
    for (let i = 0; i < rootList.length; i++) {
        let item = rootList[i]
        let parentId = []
        // 转数组类型
        eval(item.parentId.slice()).forEach((its) => {
            parentId.push(its)
        })
        if (String(parentId.pop()) == String(id)) {
            list.push(item)
        }
    }
    list.map(item => {
        item.children = []
        getTreeDept(rootList, item._id, item.children)
        if (item.children.length == 0) {
            delete item.children;
        }
    })
    return list;
}

// 部门操作 创建 编辑 删除
router.post('/add', async (ctx) => {
    try {
        const params = ctx.request.body
        await deptService.addDept(params)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

router.post('/update', async (ctx) => {
    try {
        const { _id, ...params } = ctx.request.body
        await deptService.updateDept(_id, params)
        ctx.body = util.success(null, '操作成功')
    } catch (error) {
        ctx.body = util.fail(error.stack)
    }
})

module.exports = router
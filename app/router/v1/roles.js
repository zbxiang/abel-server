const router = require('koa-router')()
const util = require('./../../../utils/util')
const roleService = require('./../../../models/roleModel')

router.prefix('/roles')

// 角色操作：创建、编辑和删除
router.post('/operate', async (ctx) => {
    const { _id, roleName, remark, action } = ctx.request.body;
    console.log(ctx.request.body)
    let res, info;
    try {
        if (action == 'create') {
            res = await roleService.addRole({ roleName, remark })
            info = "创建成功"
        } // else if (action == 'edit') {
    //     if (_id) {
    //       let params = { roleName, remark }
    //       params.update = new Date();
    //       res = await Role.findByIdAndUpdate(_id, params)
    //       info = "编辑成功"
    //     } else {
    //       ctx.body = util.fail("缺少参数params: _id")
    //       return;
    //     }
    //   } else {
    //     if (_id) {
    //       res = await Role.findByIdAndRemove(_id)
    //       info = "删除成功"
    //     } else {
    //       ctx.body = util.fail("缺少参数params: _id")
    //       return;
    //     }
    //   }
        ctx.body = util.success(res, info)
    } catch (error) {
      ctx.body = util.fail(error.stack)
    }
})

module.exports = router
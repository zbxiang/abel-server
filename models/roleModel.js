const db = require('./../core/db')
const tableName = 'role'
const util = require('./../utils/util')

// 获取角色列表
const getRoleList = async function () {
    return new Promise(async (reslove, reject) => {
        let RolesAllListSql = `select * from ${tableName}`
        db.querySql(RolesAllListSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('获取列表失败'))
            })
    })
}

// 获取所有角色列表
const getRolesAllList = async function () {
    return new Promise(async (reslove, reject) => {
        let RolesAllListSql = `select _id, roleName from ${tableName}`
        db.querySql(RolesAllListSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('获取列表失败'))
            })
    })
}

// 获取角色表信息
// const getRoleList = async function (query) {
//     const {
//         roleName,
//         pageSize,
//         pageNum,
//         sort
//     } = query
//     const { page, skipIndex } = util.pager({ pageNum, pageSize })
//     let RolesListSql = `select * from ${tableName}`
//     let where = 'where'
//     roleName && (where = db.andLike(where, 'roleName', roleName))
//     if (where !== 'where') {
//         RolesListSql = `${RolesListSql} ${where}`
//     }
//     if (sort) {
//         const symbol = sort[0]
//         const column = sort.slice(1, sort.length)
//         const order = symbol === '+' ? 'asc' : 'desc'
//         RolesListSql = `${RolesListSql} order by ${column} ${order}`
//     }
//     RolesListSql = `${RolesListSql} limit ${page.pageSize} offset ${skipIndex}`
//     let countSql = `select count(*) as count from ${tableName}`
//     if (where !== 'where') {
//         countSql = `${countSql} ${where}`
//     }
//     const lists = await db.querySql(RolesListSql)
//     lists.map((item) => {
//         item.permissionList = JSON.parse(item.permissionList) ? JSON.parse(item.permissionList) : null
//     })
//     console.log(RolesListSql, '\n', countSql)
//     const count = await db.querySql(countSql)
//     return { lists, total: count[0].count, pageTotal: Math.ceil(count[0].count/pageSize), ...page }
// }

// 获取所有菜单角色
const getAllMenuByRoleId = async function () {
    return new Promise(async (reslove, reject) => {
        let MenuListSql = `select * from menu`
        db.querySql(MenuListSql)
            .then(results => {
                results.map((item) => {
                    item.affix = util.intToBoolean(item.affix)
                    item.cacheable = util.intToBoolean(item.cacheable)
                    item.hidden = util.intToBoolean(item.hidden)
                    item.parentIds = util.arrayLikeArray(item.parentIds)
                })
                reslove(results)
            })
            .catch(err => {
                reject(new Error('菜单列表获取失败'))
            })
    })
}

// 根据角色获取菜单列表
const getMenuListByRoleId = async function () {
    return new Promise(async (reslove, reject) => {
        let MenuListSql = `select * from menu`
        db.querySql(MenuListSql)
            .then(results => {
                results.map((item) => {
                    item.affix = util.intToBoolean(item.affix)
                    item.cacheable = util.intToBoolean(item.cacheable)
                    item.hidden = util.intToBoolean(item.hidden)
                    item.parentIds = util.arrayLikeArray(item.parentIds)
                })
                reslove(results)
            })
            .catch(err => {
                reject(new Error('菜单列表获取失败'))
            })
    })
}

// 根据用户拥有的角色，获取权限列表
const getRolesPermissionList = async function (query) {
    const _ids = query._ids.join(',')
    return new Promise((reslove, reject) => {
        const rolesPermissionSql = `select * from ${tableName} where _id in (${_ids})`
        db.querySql(rolesPermissionSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('获取权限列表失败'))
            })
    })
}

// 增加角色
const roleAdd = async function (query) {
    return new Promise(async (reslove, reject) => {
        const keys = []
        const values = []
        query.createTime = util.formateDate(new Date())
        query.updateTime = util.formateDate(new Date())
        Object.keys(query).forEach(key => {
            if (query.hasOwnProperty(key)) {
                keys.push(`\`${key}\``)
                values.push(`'${query[key]}'`)
            }
        })
        if (keys.length > 0 && values.length > 0) {
            let addRoleSql = `INSERT INTO \`${tableName}\` (`
            const keysString = keys.join(',')
            const valuesString = values.join(',')
            addRoleSql = `${addRoleSql}${keysString}) VALUES (${valuesString})`
            db.querySql(addRoleSql)
                .then(res => {
                    reslove(res)
                })
                .catch(err => {
                    reject(new Error('添加角色失败'))
                })
        }
    })
}

// 更新角色
const roleUpdate = async function (query) {
    return new Promise((reslove, reject) => {
        const entry = []
        query.updateTime = util.formateDate(new Date())
        const id = query.id
        const connectSql = `where id='${id}'`
        Object.keys(query).forEach(key => {
            if (query.hasOwnProperty(key)) {
                entry.push(`\`${key}\`='${query[key]}'`)
            }
        })
        let updateRoleSql = `UPDATE \`${tableName}\` SET`
        updateRoleSql = `${updateRoleSql} ${entry.join(',')} ${connectSql}`
        db.querySql(updateRoleSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('更新角色失败'))
            })
    })
}

// 删除角色
const delteRole = async function (query) {
    return new Promise((reslove, reject) => {
        const { _id } = query
        const deleteRoleSql = `delete from ${tableName} where _id='${_id}'`
        db.querySql(deleteRoleSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('删除角色失败'))
            })
    })
}

// 权限设置
const findByIdAndUpdate = async (query) => {
    return new Promise((reslove, reject) => {
        const { _id, permissionList } = query
        const updateTime = util.formateDate(new Date())
        const permissionRoleSql = `update ${tableName} set permissionList='${JSON.stringify(permissionList)}', updateTime='${updateTime}' where _id='${_id}'`
        db.querySql(permissionRoleSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('权限设置失败'))
            })
    })
}

module.exports = {
    getRolesAllList,
    getRoleList,
    getAllMenuByRoleId,
    getMenuListByRoleId,
    getRolesPermissionList,
    roleAdd,
    roleUpdate,
    delteRole,
    findByIdAndUpdate
}
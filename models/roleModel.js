const db = require('./../core/db')
const tableName = 'roles'
const util = require('./../utils/util')

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
const getRolesList = async function (query) {
    const {
        roleName,
        pageSize,
        pageNum,
        sort
    } = query
    const { page, skipIndex } = util.pager({ pageNum, pageSize })
    const params = {}
    if (roleName) params.roleName = roleName
    let RolesListSql = `select * from ${tableName}`
    let where = 'where'
    roleName && (where = db.andLike(where, 'roleName', roleName))
    if (where !== 'where') {
        RolesListSql = `${RolesListSql} ${where}`
    }
    if (sort) {
        const symbol = sort[0]
        const column = sort.slice(1, sort.length)
        const order = symbol === '+' ? 'asc' : 'desc'
        RolesListSql = `${RolesListSql} order by ${column} ${order}`
    }
    RolesListSql = `${RolesListSql} limit ${page.pageSize} offset ${skipIndex}`
    let countSql = `select count(*) as count from ${tableName}`
    if (where !== 'where') {
        countSql = `${countSql} ${where}`
    }
    const lists = await db.querySql(RolesListSql)
    console.log(RolesListSql, '\n', countSql)
    const count = await db.querySql(countSql)
    return { lists, total: count[0].count, pageTotal: Math.ceil(count[0].count/pageSize), ...page }
} 

// 增加角色
const addRole = async function (query) {
    return new Promise(async (reslove, reject) => {
        const { roleName, remark } = query
        const updateTime = util.formateDate(new Date(), "yyyy-MM-dd hh:mm:ss")
        const createTime = util.formateDate(new Date(), "yyyy-MM-dd hh:mm:ss")
        const RoleSql = `INSERT INTO ${tableName} (roleName, remark, updateTime, createTime) VALUES ('${roleName}', '${remark}', '${updateTime}', '${createTime}')`
        db.querySql(RoleSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('添加角色失败'))
            })
    })
}

// 更新角色
const updateRole = async function (query) {
    return new Promise((reslove, reject) => {
        const {_id, roleName, remark} = query
        const updateTime = util.formateDate(new Date(), "yyyy-MM-dd hh:mm:ss")
        const updateRoleSql = `update ${tableName} set roleName='${roleName}', remark='${remark}', updateTime='${updateTime}' where _id='${_id}'`
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

module.exports = {
    getRolesAllList,
    getRolesList,
    addRole,
    updateRole,
    delteRole
}
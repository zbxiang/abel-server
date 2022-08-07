const db = require('./../core/db')
const tableName = 'roles'
const util = require('./../utils/util')

// 获取角色表信息
const getRoleList = async function (query) {
    let sortSql
    let getRoleSql
    if (query && query.sort) {
        const { sort } = query
        if (sort) {
            const symbol = sort[0]
            const order = symbol === '+' ? 'asc' : 'desc'
            sortSql = ` order by id ${order}`
        }
        getRoleSql = `select * from ${tableName} ` + sortSql
    } else {
        getRoleSql = `select * from ${tableName} `
    }
    return new Promise((resolve, reject) => {
        db.querySql(getRoleSql)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(new Error('获取角色失败'))
            })
    })
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

module.exports = {
    getRoleList,
    addRole
}
const db = require('../core/db')
const tableName = 'department'
const util = require('../utils/util')

// 获取部门列表
const getDepartmentList = async function (query) {
    return new Promise((reslove, reject) => {
        const deptListSql = `select * from ${tableName}`
        db.querySql(deptListSql)
            .then(res => {
                res.map((item) => {
                    item.parentIds = util.arrayLikeArray(item.parentIds)
                })
                reslove(res)
            })
            .catch(err => {
                reject(new Error('获取部门列表失败'))
            })
    })
}

// 新增部门
const departmentAdd = async function (query) {
    return new Promise(async (reslove, reject) => {
        const { sort } = query
        const keys = []
        const values = []
        query.createTime = util.formateDate(new Date())
        query.updateTime = util.formateDate(new Date())
        query.parentIds = util.arrayToString(query.parentIds)
        sort == null ? query.sort = 0 : query.sort = sort
        Object.keys(query).forEach(key => {
            if (query.hasOwnProperty(key)) {
                keys.push(`\`${key}\``)
                values.push(`'${query[key]}'`)
            }
        })
        
        if (keys.length > 0 && values.length > 0) {
            let addDeptSql = `INSERT INTO \`${tableName}\` (`
            const keyString = keys.join(',')
            const valuesString = values.join(',')
            addDeptSql = `${addDeptSql}${keyString}) VALUES (${valuesString})`
            const selectSql = `select * from ${tableName} where name='${query.name}'`
            const addDeptFlag = query.name ? await db.querySql(selectSql) : []
            if (addDeptFlag && addDeptFlag.length > 0) {
                reject(new Error('部门名称重复'))
            } else {
                db.querySql(addDeptSql)
                    .then(results => {
                        reslove(results)
                    })
                    .catch(err => {
                        reject(new Error('部门新增项失败'))
                    })
            }
        }
    })
}

// 更新部门
const departmentUpdate = async function (query) { 
    return new Promise(async (reslove, reject) => {
        const { sort } = query
        const entry = []
        const id = query.id
        const connectSql = `where id='${id}'`
        query.parentIds = util.arrayToString(query.parentIds)
        sort == null ? query.sort = 0 : query.sort = sort
        delete query.createTime
        delete query.children
        query.updateTime = util.formateDate(new Date())
        Object.keys(query).forEach(key => {
            if (query.hasOwnProperty(key)) {
                entry.push(`\`${key}\`='${query[key]}'`)
            }
        })

        if (entry.length > 0) {
            if (isNaN(query.sort)) {
                reject(new Error('sort字段只能为数字'))
            }
            let updateDeptSql = `UPDATE \`${tableName}\` SET`
            updateDeptSql = `${updateDeptSql} ${entry.join(',')} ${connectSql}`
            db.querySql(updateDeptSql)
                .then(res => {
                    reslove(res)
                })
                .catch(err => {
                    reject(new Error('更新部门失败'))
                })
        }
    })
}

module.exports = {
    getDepartmentList,
    departmentAdd,
    departmentUpdate
}
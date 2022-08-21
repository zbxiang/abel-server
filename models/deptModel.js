const db = require('./../core/db')
const tableName = 'dept'
const util = require('./../utils/util')

// 获取部门列表
const getDeptList = async function (query) {
    return new Promise((reslove, reject) => {
        const deptListSql = `select * from ${tableName}`
        db.querySql(deptListSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('获取部门列表失败'))
            })
    })
}

// 新建
const addDept = async function (query) {
    return new Promise(async (reslove, reject) => {
        const keys = []
        const values = []
        query.createTime = util.formateDate(new Date())
        query.updateTime = util.formateDate(new Date())
        query.parentId = eval(query.parentId)
        delete query.user
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
            const selectSql = `select userId, userName, userEmail from ${tableName} where userId='${query.userId}' and userName='${query.userName}' and userEmail='${query.userEmail}'`
            const addDeptFlag = query.userEmail ? await db.querySql(selectSql) : []
            if (addDeptFlag && addDeptFlag.length > 0) {
                reject(new Error(`系统检测到有重复的用户，信息如下：${addUserFlag.userId} - ${addUserFlag.userName} - ${addUserFlag.userEmail}`))
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

module.exports = {
    getDeptList,
    addDept
}
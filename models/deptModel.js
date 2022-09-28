const db = require('./../core/db')
const tableName = 'department'
const util = require('./../utils/util')

// 获取部门列表
const getDeptList = async function (query) {
    return new Promise((reslove, reject) => {
        const deptListSql = `select * from ${tableName}`
        db.querySql(deptListSql)
            .then(res => {
                res.map((item) => {
                    item.parentId = eval(item.parentId.slice())
                })
                reslove(res)
            })
            .catch(err => {
                reject(new Error('获取部门列表失败'))
            })
    })
}

// 新建
const deptAdd = async function (query) {
    return new Promise(async (reslove, reject) => {
        const keys = []
        const values = []
        query.createTime = util.formateDate(new Date())
        query.updateTime = util.formateDate(new Date())
        query.parentIds = util.arrayToString(query.parentIds)
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

module.exports = {
    getDeptList,
    deptAdd
}
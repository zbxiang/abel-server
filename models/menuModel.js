const db = require('./../core/db')
const { queryOne } = require('./../core/db')

const getMenuList = function (obj, next) {
    let query = ''
    let length = 0
    for (let key in obj) {
        let separator = length > 0 ? ' and ' : ''
        query += `${separator}${key}=${obj[key]}`
        length++
    }
    const sql = `select * from user where ${query}`
    console.log(sql)
    // return queryOne(sql, next)
}

// 添加菜单
const addMenu = function (query) {
    return new Promise(async (reslove, reject) => {
        const keys = []
        const values = []
        const tableName = 'menus'
        Object.keys(query).forEach(key => {
            if (query.hasOwnProperty(key)) {
                keys.push(`\`${key}\``)
                values.push(`'${query[key]}'`)
            }
        })
        if (keys.length > 0 && values.length > 0) {
            let addMenuSql = `INSERT INTO \`${tableName}\` (`
            const keysString = keys.join(',')
            const valuesString = values.join(',')
            addMenuSql = `${addMenuSql}${keysString}) VALUES (${valuesString})`
            const selectSql = `select path from ${tableName} where path=${query.path}`
            const addMenuFlag = await db.querySql(selectSql)
            if (addMenuFlag && addMenuFlag.length > 0) {
                reject(new Error('path已存在, 无法添加'))
            } else {
                db.querySql(addMenuSql)
                    .then(results => {
                        reslove(results)
                    })
                    .catch(err => {
                        reject(new Error('添加菜单项失败'))
                    })
            }
            console.log('addMenu:' + addMenuSql)
        }
    })
}

module.exports = {
    getMenuList,
    addMenu
}
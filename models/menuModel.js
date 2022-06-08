const { queryOne } = require('./../core/db')

const menuList = function (obj, next) {
    let query = ''
    let length = 0
    for (let key in obj) {
        let separator = length > 0 ? ' and ' : ''
        query += `${separator}${key}=${obj[key]}`
        length ++
    }
    const sql = `select * from user where ${query}`
    console.log(sql)
    // return queryOne(sql, next)
}

module.exports = {
    menuList
}
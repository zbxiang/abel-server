const { queryOne } = require('./../core/db')

const login = function ({userName, userPwd}, next) {
    const sql = `select * from user where userName='${userName}' and userPwd='${userPwd}'`
    return queryOne(sql, next)
}

module.exports = {
    login
}
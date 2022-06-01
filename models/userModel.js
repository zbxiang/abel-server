const db = require('../config/db')
class UserModel {
    //获取用户
    async getUser(name) {
        return await db(`SELECT * FROM user WHERE name = '${name}'`)
    }
    //获取用户手机号
    async getTel(tel) {
        return await db(`SELECT * FROM user WHERE tel = '${tel}'`)
    }
    //用户注册
    async insert(name, tel, password) {
        return await db(`INSERT INTO user(name, tel, password) VALUES('${name}', '${tel}', '${password}')`)
    }
}
module.exports = new UserModel()
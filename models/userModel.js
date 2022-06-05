const sequelize = require('../core/db')

const { Sequelize, Model } = require('sequelize')

// define
class User extends Model {
    static async userLogin(userName, userPwd) {
        const user = await User.findOne({
            where: {
                userName,
                userPwd
            }
        })
        return user
    }
}

module.exports = {
    User
}
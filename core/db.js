/**
 * 数据库连接
 */
const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')
const { host, user, password, port, dbName } = require('../config/index').database
const log4js = require('./../utils/log4j')

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false,
    timezone: '+08:00',
    define: {
        //create_time  update_time delete_time
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        freezeTableName: true,
        scopes: {
            bh: {
                attributes: {
                    exclude: ['updated_at', 'deleted_at', 'created_at']
                }
            }
        }
    }
})

sequelize.sync({
    force: false
})

Model.prototype.toJSON = function () {
    // let data = this.dataValues
    let data = clone(this.dataValues)
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')

    for (key in data) {
        if (key === 'image') {
            if (!data[key].startsWith('http'))
                data[key] = global.config.host + data[key]
        }
    }

    if (isArray(this.exclude)) {
        this.exclude.forEach(
            (value) => {
                unset(data, value)
            }
        )
    }
    // this.exclude
    // exclude
    // a,b,c,d,e
    return data
}

sequelize
    .authenticate()
    .then(() => {
        log4js.info('***数据库连接成功***')
    })
    .catch(err => {
        log4js.error('***数据库连接失败***')
    });

module.exports = {
    sequelize
}
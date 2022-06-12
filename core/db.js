/**
 * 数据库连接
 */
const mysql = require('mysql')
const { host, user, password, port, dbName } = require('../config/index').database
const debug = require('../config/index').debug
const log4js = require('./../utils/log4j')

const connect = function (){
    return mysql.createConnection({
        host,
        user,
        password,
        port,
        database: dbName,
        multipleStatements: true
    })
}

const querySql = function (sql) {
    const conn = connect()
    debug && log4js.debug(sql)
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
                if (err) {
                    debug && log4js.error('查询失败，原因:' + JSON.stringify(err))
                    reject(err)
                } else {
                    debug && log4js.info('查询成功', JSON.stringify(results))
                    resolve(results)
                }
            })
        } catch (e) {
            reject(e)
        } finally {
            conn.end()
        }
    })
}

const queryOne = function (sql) {
    return new Promise((resolve, reject) => {
        querySql(sql)
            .then(results => {
                if (results && results.length > 0) {
                    resolve(results[0])
                } else {
                    resolve(null)
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

const andLike = function (where, k, v) {
    if (where === 'where') {
        return where + ` ${k} like '%${v}%'`
    } else {
        return where + ` and ${k} like '%${v}%'`
    }
}

module.exports = {
    connect,
    querySql,
    queryOne,
    andLike
}


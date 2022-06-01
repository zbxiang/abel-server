/**
 * 数据库连接
 */
const mysql = require('mysql')
const config = require('./index')
const log4js = require('./../utils/log4j')
// let { host, user, password, port, database } = config
// const connection = mysql.createConnection({
//     host,
//     user,
//     password,
//     port,
//     database
// });

// connection.connect((err) => {
//     // 若连接建立失败
//     if (err) {
//         log4js.error('***数据库连接失败***')
//     } else {
//         log4js.info('***数据库连接成功***')
//     }
// })

//创建连接池
const pool = mysql.createPool(config);
const db = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                log4js.error('***数据库连接失败***')
                reject(err);
            } else {
                connection.query(sql, val, (err, fields) => {
                    if (err) {
                        log4js.error('***数据库连接失败***')
                        reject(err);
                    } else {
                        log4js.info('***数据库连接成功***')
                        resolve(fields);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports = { db };
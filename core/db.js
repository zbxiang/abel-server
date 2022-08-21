/**
 * 数据库连接
 */
const mysql = require('mysql')
const { host, user, password, port, dbName, timezone } = require('../config/index').database
const debug = require('../config/index').debug
const log4js = require('./../utils/log4j')

const orLike = function(where, k, v) {
    if (where === 'where') {
        return where + ` ${k} like '%${v}%'`
    } else {
        return where + ` or ${k} like '%${v}%'`
    }
}

const andLike = function (where, k, v) {
    if (where === 'where') {
        return where + ` ${k} like '%${v}%'`
    } else {
        return where + ` and ${k} like '%${v}%'`
    }
}

const or = function (where, k, v) {
    if (where === 'where') {
        return where + ` ${k}='${v}'`
    } else {
        return where + ` or ${k}='${v}'`
    }
}

const and = function(where, k, v) {
    if (where === 'where') {
        return where + ` ${k}='${v}'`
    } else {
        return where + ` and ${k}='${v}'`
    }
  }

const connect = function (){
    return mysql.createConnection({
        host,
        user,
        password,
        port,
        database: dbName,
        timezone,
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

const querySqlList = function(sql, onSuccess, onFail) {
    const conn = connect()
    debug && console.log(sql)
    const resultList = []
    let index = 0
  
    function next() {
      index++
      if (index < sql.length) {
        query()
      } else {
        conn.end()
        onSuccess && onSuccess(resultList)
      }
    }
  
    function query() {
      conn.query(sql[index], (err, results) => {
        if (err) {
          console.log('操作失败，原因:' + JSON.stringify(err))
          onFail && onFail()
        } else {
          // debug && console.log('操作成功', JSON.stringify(results))
          resultList.push(results)
          next()
        }
      })
    }
  
    query()
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

const update = function(model, tableName, where) {
    return new Promise(((resolve, reject) => {
      if (!isObject(model)) {
        reject(new Error('插入数据库失败，插入数据非对象'))
      } else {
        const entry = []
        Object.keys(model).forEach(key => {
          if (model.hasOwnProperty(key)) {
            entry.push(`\`${key}\`='${model[key]}'`)
          }
        })
        if (entry.length > 0) {
          let sql = `UPDATE \`${tableName}\` SET`
          sql = `${sql} ${entry.join(',')} ${where}`
          const conn = connect()
          try {
            conn.query(sql, (err, result) => {
              if (err) {
                reject(err)
              } else {
                resolve(result)
              }
            })
          } catch (e) {
            reject(e)
          } finally {
            conn.end()
          }
        } else {
          reject(new Error('SQL解析失败'))
        }
      }
    }))
}

const insert = function(model, tableName) {
    return new Promise((resolve, reject) => {
      if (!isObject(model)) {
        reject(new Error('插入数据库失败，插入数据非对象'))
      } else {
        const keys = []
        const values = []
        Object.keys(model).forEach(key => {
          if (model.hasOwnProperty(key)) {
            keys.push(`\`${key}\``)
            values.push(`'${model[key]}'`)
          }
        })
        if (keys.length > 0 && values.length > 0) {
          let sql = `INSERT INTO \`${tableName}\`(`
          const keysString = keys.join(',')
          const valuesString = values.join(',')
          sql = `${sql}${keysString}) VALUES (${valuesString})`
          const conn = connect()
          try {
            conn.query(sql, (err, result) => {
              if (err) {
                reject(err)
              } else {
                resolve(result)
              }
            })
          } catch (e) {
            reject(e)
          } finally {
            conn.end()
          }
        } else {
          reject(new Error('SQL解析失败'))
        }
      }
    })
}

module.exports = {
    connect,
    querySql,
    querySqlList,
    orLike,
    or,
    insert,
    queryOne,
    andLike,
    and,
    update
}


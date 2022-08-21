const db = require('./../core/db')
const tableName = 'user'
const util = require('./../utils/util')

const login = ({userName, userPwd}, next) => {
    const sql = `select * from ${tableName} where userName='${userName}' and userPwd='${userPwd}'`
    return db.queryOne(sql, next)
}

// 用户列表
const getUserList = async (query) => {
    const { userId, userName, state, sort, pageNum, pageSize } = query
    const { page, skipIndex } = util.pager({ pageNum, pageSize })
    let sortSql = ''
    let userSql = `select * from ${tableName}`
    let where = 'where'
    userId && (where = db.andLike(where, 'userId', userId))
    userName && (where = db.andLike(where, 'userName', userName))
    state && (where = db.and(where, 'state', state))
    if (sort) {
        const symbol = sort[0]
        const column = sort.slice(1, sort.length)
        const order = symbol === '+' ? 'asc' : 'desc'
        sortSql = ` order by \'${column}\' ${order}`
    }
    const pageSql = ` limit ${page.pageSize} offset ${skipIndex}`
    let newCountSql = `select count(*) as count from ${tableName} ${sortSql}`
    if (where !== 'where') {
        userSql = `${userSql} ${where}`
        newCountSql = `select count(*) as count from ${tableName} ${where} ${sortSql}`
    }
    const newUserSql = `${userSql} ${sortSql} ${pageSql}`
    const count = await db.querySql(newCountSql)
    const lists = await db.querySql(newUserSql)
    return {lists, total: count[0].count, pageTotal: Math.ceil(count[0].count/pageSize), ...page}
}

// 获取全量用户列表
const getUserAllList = async () => {
    return new Promise((reslove, reject) => {
        const userAllList = `select userId, userName, userEmail from ${tableName}`
        db.querySql(userAllList)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('获取用户列表失败'))
            })
    })
}

// 用户新增
const addUser = async (query) => {
    return new Promise(async (reslove, reject) => {
        const keys = []
        const values = []
        query.createTime = util.formateDate(new Date())
        query.lastLoginTime = util.formateDate(new Date())
        Object.keys(query).forEach(key => {
            if (query.hasOwnProperty(key)) {
                keys.push(`\`${key}\``)
                values.push(`'${query[key]}'`)
            }
        })
        if (keys.length > 0 && values.length > 0) {
            let addUserSql = `INSERT INTO \`${tableName}\` (`
            const keyString = keys.join(',')
            const valuesString = values.join(',')
            addUserSql = `${addUserSql}${keyString}) VALUES (${valuesString})`
            const selectSql = `select userName, userEmail from ${tableName} where userName='${query.userName}' and userEmail='${query.userEmail}'`
            const addUserFlag = query.userEmail ? await db.querySql(selectSql) : []
            if (addUserFlag && addUserFlag.length > 0) {
                reject(new Error(`系统检测到有重复的用户，信息如下：${addUserFlag.userName} - ${addUserFlag.userEmail}`))
            } else {
                db.querySql(addUserSql)
                    .then(results => {
                        reslove(results)
                    })
                    .catch(err => {
                        reject(new Error('用户新增项失败'))
                    })
            }
        }
    })
}

module.exports = {
    login,
    getUserList,
    getUserAllList,
    addUser
}
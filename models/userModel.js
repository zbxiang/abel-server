const db = require('./../core/db')
const tableName = 'user'
const util = require('./../utils/util')

const login = ({userName, userPwd}, next) => {
    return new Promise((reslove, reject) => {
        const sql = `select userId, userName, userEmail, state, role, deptId, roleList from ${tableName} where userName='${userName}' and userPwd='${userPwd}'`
        db.queryOne(sql, next)
            .then(res => {
                res.deptId = [].slice.call(eval(res.deptId))
                res.roleList= [].slice.call(eval(res.roleList))
                reslove(res)
            })
            .catch(err => {
                reject(new Error('获取用户失败'))
            })
    })
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
    lists.map((item) => {
        item.deptId = eval(item.deptId)
        item.roleList = eval(item.roleList)
    })
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

// 查找用户
const findOneUser = async (query) => {
    return new Promise((reslove, reject) => {
        const {userName, userEmail} = query
        const userOneSql = `select userId, userName, userEmail from ${tableName} where userName='${userName}' and userEmail='${userEmail}'`
        db.queryOne(userOneSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('查找用户失败'))
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
        query.deptId = util.arrayToString(eval(query.deptId))
        query.roleList = util.arrayToString(eval(query.roleList))
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
            db.querySql(addUserSql)
                .then(results => {
                    reslove(results)
                })
                .catch(err => {
                    reject(new Error('用户新增项失败'))
                })
        }
    })
}

// 用户编辑
const updateUser = async (query) => {
    return new Promise((reslove, reject) => {
        const { userId, userName, userEmail, mobile, job, state, roleList, deptId, sex, remark } = query
        const updateUserSql = `update ${tableName} set userName='${userName}', userEmail='${userEmail}', mobile='${mobile}', job='${job}', state='${state}', roleList='${util.arrayToString(eval(roleList))}', deptId='${util.arrayToString(eval(deptId))}', sex='${sex}', remark='${remark}' where userId='${userId}'`
        db.querySql(updateUserSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('更新用户失败'))
            })
    })
}

// 用户删除/批量删除
const deleteUser = async (query) => {
    return new Promise((reslove, reject) => {
        const userIds = query.userIds.join(',')
        const deleteUserSql = `delete from ${tableName} where userId IN (${userIds})`
        db.querySql(deleteUserSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('删除失败'))
            })
    })
}

module.exports = {
    login,
    getUserList,
    getUserAllList,
    addUser,
    findOneUser,
    updateUser,
    deleteUser
}
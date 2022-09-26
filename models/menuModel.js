const db = require('./../core/db')
const { getTreeMenu, arrayToString, arrayLikeArray } = require('./../utils/util')
const tableName = 'menu'
const util = require('./../utils/util')

// 获取菜单列表
const getMenuList = (query) => {
    return new Promise(async (reslove, reject) => {
        const { name, status } = query
        const params = {}
        name && (params.name  = name)
        status && (params.status = status)
        let MenuListSql = `select * from ${tableName}`
        let where = 'where'
        status && (where = db.and(where, 'status', status))
        name && (where = db.andLike(where, 'name', name))
        if (where !== 'where') {
            MenuListSql = `${MenuListSql} ${where}`
        }
        db.querySql(MenuListSql)
            .then(results => {
                results.map((item) => {
                    item.affix = util.intToBoolean(item.affix)
                    item.cacheable = util.intToBoolean(item.cacheable)
                    item.hidden = util.intToBoolean(item.hidden)
                    item.parentIds = util.arrayLikeArray(item.parentIds)
                })
                reslove(results)
            })
            .catch(err => {
                reject(new Error('菜单列表获取失败'))
            })
    })
}

// 获取菜单列表
// const getMenuList = async function (query) {
//     const {
//         menuName, 
//         menuState, 
//         pageSize, 
//         pageNum,
//         sort
//     } = query
//     const { page, skipIndex } = util.pager({pageNum, pageSize})
//     const params = {}
//     if (menuName) params.menuName = menuName
//     if (menuState) params.menuState = menuState
//     let MenuListSql = `select * from ${tableName}`
//     let where = 'where'
//     menuName && (where = db.andLike(where, 'menuName', menuName))
//     if (where !== 'where') {
//         MenuListSql = `${MenuListSql} ${where}`
//     }
//     if (sort) {
//         const symbol = sort[0]
//         const column = sort.slice(1, sort.length)
//         const order = symbol === '+' ? 'asc' : 'desc'
//         MenuListSql = `${MenuListSql} order by ${column} ${order}`
//     }
//     MenuListSql = `${MenuListSql} limit ${page.pageSize} offset ${skipIndex}`
//     let countSql = `select count(*) as count from ${tableName}`
//     if (where !== 'where') {
//         countSql = `${countSql} ${where}`
//     }
//     const lists = await db.querySql(MenuListSql)
//     console.log(MenuListSql, '\n', countSql)
//     const count = await db.querySql(countSql)
//     return { lists, total: count[0].count, pageTotal: Math.ceil(count[0].count/pageSize), ...page }
// }

// 添加菜单
const menuAdd = function (query) {
    return new Promise(async (reslove, reject) => {
        const { sort } = query
        const keys = []
        const values = []
        query.createTime = util.formateDate(new Date())
        query.updateTime = util.formateDate(new Date())
        query.affix = util.booleanToInt(query.affix)
        query.cacheable = util.booleanToInt(query.cacheable)
        query.hidden = util.booleanToInt(query.hidden)
        query.parentIds = util.arrayToString(query.parentIds)
        sort == null ? query.sort = 0 : query.sort = sort
        delete query.id
        Object.keys(query).forEach(key => {
            if (query.hasOwnProperty(key)) {
                keys.push(`\`${key}\``)
                values.push(`'${query[key]}'`)
            }
        })
        if (keys.length > 0 && values.length > 0) {
            let addMenuSql = `INSERT INTO \`${tableName}\` (`
            const keysString = keys.join(',')
            const valuesString = values.join(',')
            addMenuSql = `${addMenuSql}${keysString}) VALUES (${valuesString})`
            const selectSql = `select name, path from ${tableName} where name='${query.name}' and path='${query.path}'`
            const addMenuFlag = query.path ? await db.querySql(selectSql) : []
            if ( addMenuFlag && addMenuFlag.length > 0) {
                reject(new Error('菜单名称已存在'))
            } else {
                db.querySql(addMenuSql)
                    .then(results => {
                        reslove(results)
                    })
                    .catch(err => {
                        reject(new Error('添加菜单项失败'))
                    })
            }
        }
    })
}

// 更新菜单
const updateMenu = function (query) {
    return new Promise(async (reslove, reject) => {
        const { sort } = query
        const entry = []
        const _id = query._id
        const connectSql = `where _id='${_id}'`
        delete query._id
        delete query.createTime
        delete query.children
        query.parentId = arrayToString(arrayLikeArray(query.parentId))
        sort == null ? query.sort = 0 : query.sort = sort
        query.updateTime = util.formateDate(new Date())
        Object.keys(query).forEach(key => {
            if (query.hasOwnProperty(key)) {
                entry.push(`\`${key}\`='${query[key]}'`)
            }
        })
        if (entry.length > 0) {
            const selectUrl = `select _id from ${tableName} where url='${query.url}'`
            const addMenuFlag = await db.querySql(selectUrl)
            if (addMenuFlag.length > 0 && addMenuFlag[0]._id !== _id * 1) {
                reject(new Error('URL已存在，无法添加'))
            } else {
                if (isNaN(query.sort)) {
                    reject(new Error('sort字段只能为数字'))
                }
                let addMenuSql = `UPDATE \`${tableName}\` SET`
                addMenuSql = `${addMenuSql} ${entry.join(',')} ${connectSql}`
                db.querySql(addMenuSql)
                    .then(res => {
                        reslove(res)
                    })
                    .catch(err => {
                        reject(new Error('更新菜单失败'))
                    })
            }
        }
    })
}

// 获取菜单权限列表
const getMenuPermissionList = (query) => {
    const _ids = query._ids.join(',')
    return new Promise((reslove, reject) => {
        const menuPermissionSql = `select * from ${tableName} where _id in (${_ids})`
        db.querySql(menuPermissionSql)
            .then(res => {
                res.map((item) => {
                    item.parentId = [].slice.call(eval(item.parentId))
                })
                reslove(res)
            })
            .catch(err => {
                reject(new Error('获取菜单权限列表失败'))
            })
    })
}

// 删除菜单
const deleteMenu = function (query) {
    return new Promise(async (reslove, reject) => {
        const { _id } = query
        const deleteMenuSql = `delete from ${tableName} where _id='${_id}'`
        db.querySql(deleteMenuSql)
            .then(res => {
                reslove(res)
            })
            .catch(err => {
                reject(new Error('删除失败'))
            })
    })
}

module.exports = {
    getMenuList,
    getMenuPermissionList,
    menuAdd,
    updateMenu,
    deleteMenu
}
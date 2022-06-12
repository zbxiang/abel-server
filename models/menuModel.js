const db = require('./../core/db')
const tableName = 'menus'
const util = require('./../utils/util')

// 获取菜单列表
const getMenuList = async function (query) {
    const {
        menuName, 
        menuState, 
        pageSize, 
        pageNum,
        sort
    } = query
    const { page, skipIndex } = util.pager({pageNum, pageSize})
    const params = {}
    if (menuName) params.menuName = menuName
    if (menuState) params.menuState = menuState
    let MenuListSql = `select * from ${tableName}`
    let where = 'where'
    menuName && (where = db.andLike(where, 'menuName', menuName))
    if (where !== 'where') {
        MenuListSql = `${MenuListSql} ${where}`
    }
    if (sort) {
        const symbol = sort[0]
        const column = sort.slice(1, sort.length)
        const order = symbol === '+' ? 'asc' : 'desc'
        MenuListSql = `${MenuListSql} order by ${column} ${order}`
    }
    MenuListSql = `${MenuListSql} limit ${page.pageSize} offset ${skipIndex}`
    let countSql = `select count(*) as count from ${tableName}`
    if (where !== 'where') {
        countSql = `${countSql} ${where}`
    }
    const lists = await db.querySql(MenuListSql)
    console.log(MenuListSql, '\n', countSql)
    const count = await db.querySql(countSql)
    return { lists, total: count[0].count, pageTotal: Math.ceil(count[0].count/pageSize), ...page }
}

// 添加菜单
const addMenu = function (query) {
    return new Promise(async (reslove, reject) => {
        const keys = []
        const values = []
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
            const selectSql = `select menuName, path from ${tableName} where menuName='${query.menuName}' and path='${query.path}'`
            const addMenuFlag = query.path ? await db.querySql(selectSql) : []
            if ( addMenuFlag && addMenuFlag.length > 0) {
                reject(new Error('path已存在, 无法添加'))
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

module.exports = {
    getMenuList,
    addMenu
}
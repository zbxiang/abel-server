/**
 * 通用工具函数
 */
const log4js = require('./log4j')
const jwt = require('jsonwebtoken')
const CODE = {
    SUCCESS: 200,
    PARAM_ERROR: 10001, // 参数错误
    USER_ACCOUNT_ERROR: 20001, // 账户或密码错误
    USER_LOGIN_ERROR: 30001, // 用户为登录
    BUSINESS_ERROR: 40001, // 业务请求失败
    AUTH_ERROR: 500001, // 认证失败或TOKEN过期
}
const { PRIVATE_KEY } = require('../config/index')

module.exports = {
    /**
     * 分页结构封装
     * @param {number} pageNum
     * @param {number} pageSize 
     * @returns 
     */
    pager({ pageNum = 1, pageSize = 10 }) {
        pageNum *= 1;
        pageSize *= 1;
        const skipIndex = (pageNum - 1) * pageSize;
        return {
            page: {
                pageNum,
                pageSize,
            },
            skipIndex
        }
    },
    success(data = '', msg = '', code = CODE.SUCCESS) {
        log4js.debug(data)
        return {
            code, data, msg
        }
    },
    fail(msg = '', code = CODE.BUSINESS_ERROR, data = '') {
        log4js.debug(msg)
        return {
            code, data, msg
        }
    },
    CODE,
    decoded(authorization) {
        if (authorization) {
            let token = authorization.split(' ')[1]
            return jwt.verify(token, PRIVATE_KEY);
        }
        return ''
    },
    // 递归拼接树形列表
    getTreeMenuList(rootList, id, list) {
        for (let i = 0; i < rootList.length; i++) {
            let item = rootList[i]
            if (String(item.parentIds.slice().pop()) == String(id)) {
                list.push(item)
            }
        }
        list.map(item => {
            item.children = []
            this.getTreeMenuList(rootList, item.id, item.children)
            if (item.children.length == 0) {
                delete item.children;
            } else if (item.children.length > 0 && item.children[0].menuType == 2) {
                // 快速区分按钮和菜单，用于后期做菜单按钮权限控制
                item.action = item.children;
            }
        })
        return list;
    },
    // 递归拼接树形列表
    getTreeMenu(rootList, id, list) {
        for (let i = 0; i < rootList.length; i++) {
            let item = rootList[i]
            if (String(item.parentId.slice().pop()) == String(id)) {
                list.push(item)
            }
        }
        list.map(item => {
            item.children = []
            this.getTreeMenu(rootList, item._id, item.children)
            if (item.children.length == 0) {
                delete item.children;
            } else if (item.children.length > 0 && item.children[0].menuType == 2) {
                // 快速区分按钮和菜单，用于后期做菜单按钮权限控制
                item.action = item.children;
            }
        })
        return list;
    },
    formateDate(date, rule) {
        let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, date.getFullYear())
        }
        const o = {
            // 'y+': date.getFullYear(),
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                const val = o[k] + '';
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
            }
        }
        return fmt;
    },
    // 数组转字符串数组
    arrayToString(array) {
        let str = ''
        if (Array.isArray(array)) {
            str += '['
            array.forEach((item, index) => {
                index < array.length - 1 ? str += `${item}, ` : str += `${item}`
            })
            str += ']'
        }
        return str
    },
    // 字符串伪数组转数组
    arrayLikeArray(value) {
        return [].slice.call(eval(value))
    },
    // 布尔转int类型
    booleanToInt(value) {
        return value ? 1 : 0
    },
    // int类型转布尔型
    intToBoolean(value) {
        return value === 1 ? true : false
    }
}
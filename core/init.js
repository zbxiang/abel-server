const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(router) {
        // 入口方法
        InitManager.router = router
        InitManager.initLoadRouters()
        InitManager.loadConfig()
    }

    // 加载配置
    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/index.js'
        const config = require(configPath)
        global.config = config
    }

    // 动态加载路由
    static initLoadRouters() {
        //path config
        const apiDirectory = `${process.cwd()}/app/router`
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.router.use(obj.routes(), obj.allowedMethods())
            }
        }
    }
}

module.exports = InitManager
/**
 * 配置文件
 */
module.exports = {
    database: {
        host: 'localhost',
        user: 'root',
        password: 'root123',
        port: '3306',
        dbName: 'abel-manager'
    },
    debug: true,
    PWD_SALT: 'admin_abel_node',
    PRIVATE_KEY: 'admin_abel_node_test_zbxiang_xyz',
    JWT_EXPIRED: 60 * 60
}
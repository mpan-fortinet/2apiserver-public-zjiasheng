const Sequelize = require('sequelize');
const debugLogger = require('../utils/logger.js');
const ini = require('../utils/ini.js')
// const dbConfig = {
//   dialect: 'postgres',     
//   username: 'platform',   // username
//   host: '127.0.0.1',      // db ip
//   password: 'fortinet',     // db password
//   database: 'platformdb',      // db name
//   port: 5432
// }
//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Postgres 示例
//const sqlurl = `postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
const sequelize = new Sequelize(
    ini.dbname,
    ini.dbuser,
    ini.dbpasswd,
    {
      host: ini.dbhost,
      port: ini.dbport,
      dialect: "postgres", //(postgres)
      dialectOptions:{
        dateStrings: true
      },
     logging: msg => debugLogger.debug(msg),     // 使用自定义记录器(例如Winston 或 Bunyan),显示第一个参数

      timezone: '-08:00',
      define: {
        timestamps: false //为模型添加 createdAt 和 updatedAt 两个时间戳字段（true or false）
      },
      pool: { //使用连接池连接，默认为true
        max: 50,
        min: 0,
        idle: 30000
      },
    }
)
module.exports = sequelize;

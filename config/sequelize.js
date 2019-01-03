const config = require('./config');

const Sequelize = require('sequelize')
  , sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
	host: config.mysql.host,
	dialect: "mysql",
    log: console.log
});

module.exports = sequelize;


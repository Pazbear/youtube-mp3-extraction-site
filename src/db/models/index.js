const Sequelize = require('sequelize');

const User = require('./User')
const ExtractionInfo = require('./ExtractionInfo')
const LoginHistory = require('./LoginHistory')

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.ExtractionInfo = ExtractionInfo;
db.LoginHistory = LoginHistory;

User.init(sequelize);
ExtractionInfo.init(sequelize);
LoginHistory.init(sequelize);

User.associate(db);
ExtractionInfo.associate(db);
LoginHistory.associate(db);

module.exports = db;
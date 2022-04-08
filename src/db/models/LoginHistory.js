const Sequelize = require('sequelize');

module.exports = class LoginHistory extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            ip:{
                type: Sequelize.STRING(20),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'LoginHistory',
            tableName:'login_history',
            paranoid : false,
            charset:'utf8mb4',
            collate : 'utf8mb4_general_ci'
        })
    }

    static associate(db) {
        db.LoginHistory.belongsTo(db.User, { targetKey : 'id' });
    }
    
}
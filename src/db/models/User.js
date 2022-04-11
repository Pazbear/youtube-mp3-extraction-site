const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            email: {
                type : Sequelize.STRING(50),
                allowNull:false,
                unique:true,
            },
            password:{
                type : Sequelize.STRING(100),
                allowNull:false,
                unique : false
            },
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'User',
            tableName:'user',
            paranoid : false,
            charset:'utf8mb4',
            collate : 'utf8mb4_general_ci'
        })
    }
    static associate(db){
        db.User.hasMany(db.ExtractionInfo, {sourceKey : 'id'});
        db.User.hasMany(db.LoginHistory, {sourceKey : 'id'});
    }
}
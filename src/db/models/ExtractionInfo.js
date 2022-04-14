const Sequelize = require('sequelize');

module.exports = class ExtractionInfo extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            youtube_url:{
                type : Sequelize.STRING(100),
                allowNull: false
            },
            extract_time:{//0 ~ 23
                type : Sequelize.INTEGER,
                allowNull:false
            },
            extraction_log:{
                type : Sequelize.TEXT,
                allowNull:true,
                defaultValue:null
            },
            is_active : {
                type : Sequelize.BOOLEAN,
                defaultValue:false
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'ExtractionInfo',
            tableName:'extraction_info',
            paranoid : false,
            charset:'utf8mb4',
            collate : 'utf8mb4_general_ci'
        })
    }

    static associate(db) {
        db.ExtractionInfo.belongsTo(db.User, { targetKey : 'id' });
    }
    
}
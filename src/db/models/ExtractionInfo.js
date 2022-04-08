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
            one_or_new : { // 0: 새롭게 업로드된 것들 전부(없을 수도 있음), 1: 최근 한 개만
                type : Sequelize.INTEGER,
                allowNull : false,
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
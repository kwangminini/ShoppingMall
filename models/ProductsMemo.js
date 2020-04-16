const moment = require('moment');

module.exports = function(sequelize, DataTypes){
    const ProductsMemo = sequelize.define('ProductsMemo',
        {
            id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
            content :  { 
                type: DataTypes.TEXT,
                validate : {
                    len : [0, 500], //메모 500글자 안넘기게 하려고 지정
                } 
            }
        },{
            tableName: 'ProductsMemo'  //테이블 이름 지정
        }
    );


    // 년-월-일
    ProductsMemo.prototype.dateFormat = (date) => (
        moment(date).format('YYYY-MM-DD // h:mm')
    );

    return ProductsMemo;
}
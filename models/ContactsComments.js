const moment = require('moment');

module.exports = function(sequelize, DataTypes){
    const ContactsComment = sequelize.define('ContactsComment',{
        id:{type: DataTypes.BIGINT.UNSIGNED, primaryKey : true, autoIncrement: true},
        content:{
            type : DataTypes.TEXT,
            validate : {
                len : [0,500]
            }
        }},{
            tableName:'ContactsComment'
        }
    );
    ContactsComment.prototype.dateFormat = (date) =>(
        moment(date).format('YYYY-MM-DD // h:mm')
    );
    return ContactsComment;

}
const moment = require('moment');

module.exports = function(sequelize, DataTypes){
    var Contacts = sequelize.define('Contacts',{
        id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name : {type:DataTypes.STRING},
        price : {type : DataTypes.INTEGER},
        description : {type : DataTypes.TEXT}
    });

    Contacts.associate =(models)=>{
        Contacts.hasMany(models.ContactsComment,{as:'Comment',foreignKey:'contact_id',sourceKey:'id', onDelete:'CASCADE'});

    }
    Contacts.prototype.dateFormat = (date) =>(
        moment(date).format('YYYY-MM-DD')
    );
    return Contacts;
}
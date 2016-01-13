var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var name = 'users';

exports.up = function(db, callback) {
  db.createTable(name,{
    id: {type:'int',primaryKey:true},
    name: {type:'char',length:50},
    password: {type:'char',length:32},
    joinedAt: {type:'timestamp',defaultValue:"NOW()",autoIncrement:true}
  },callback);
};

exports.down = function(db, callback) {
  db.dropTable(name,callback);
};

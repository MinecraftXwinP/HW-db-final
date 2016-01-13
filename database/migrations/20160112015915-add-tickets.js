var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var name = 'tickets';

exports.up = function(db, callback) {
  db.createTable(name,
  {
    id:{type:'int',primaryKey:true,autoIncrement:true},
    submitter:{
      type:'int',
      notNull:true,
      foreignKey:{
        name:'ticket_user_id_fk',
        table: 'ticket',
        mapping: 'id',
        rules:{
          onDelete:'SET_NULL'
        }
      }
    },
    message:{type: 'string'},
    done:{type:'boolean',defaultValue:'false'},
    done_at:{type:'timestamp'},
    created_at:{type:'timestamp',notNull:true,defaultValue:'NOW()'}
  },callback);
};

exports.down = function(db, callback) {
  db.dropTable(name,callback);
};

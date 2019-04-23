
exports.up = function(knex, Promise) {
  return knex.schema.createTable("wineries",tbl =>{
   tbl.increments();
    tbl.string("winery_name",128).notNullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("wineries")
};

const knex = require("knex");
const dbConfig = require("../knexfile.js");
const db = knex(dbConfig.development);

module.exports = {
  find,
  findBy,
  insert,
  remove,
  update,
  truncate
};

function find() {
  return db("wineries");
}

function findBy(id) {
  return db("wineries").where({ id });
}

async function insert(project) {
  //return db("wineries").insert(project);
  const [id] = await db("wineries").insert(project);
  return db("wineries")
    .where({ id })
    .first();
}
function update(id, changes) {
  return db("wineries")
    .where({ id })
    .update(changes);
}
function remove(id) {
  return db("wineries")
    .where("id", id)
    .del();
}

function truncate() {
  return db("wineries").truncate();
}
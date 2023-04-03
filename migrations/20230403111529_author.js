exports.up = function (knex) {
  return knex.schema.createTable('author', (table) => {
    table.increments();
    table.string('username');
    table.timestamps();
  });
};

exports.down = function (knex) {};

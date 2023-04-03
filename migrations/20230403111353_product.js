exports.up = function (knex) {
  return knex.schema.createTable('product', (table) => {
    table.increments();
    table.string('title');
    table.timestamps();
  });
};

exports.down = function (knex) {};

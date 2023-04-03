exports.up = function (knex) {
  return knex.schema.table('comment', function (table) {
    table.integer('review');
  });
};
exports.down = function (knex) {};

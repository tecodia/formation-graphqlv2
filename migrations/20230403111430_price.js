exports.up = function (knex) {
  return knex.schema.createTable('price', (table) => {
    table.increments();
    table.float('amount');
    table.integer('product_id').unsigned();
    table.foreign('product_id').references('product.id');
    table.timestamps();
  });
};

exports.down = function (knex) {};

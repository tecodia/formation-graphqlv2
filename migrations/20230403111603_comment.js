exports.up = function (knex) {
  return knex.schema.createTable('comment', (table) => {
    table.increments();
    table.string('comment');
    table.integer('product_id').unsigned();
    table.foreign('product_id').references('product.id');
    table.integer('author_id').unsigned();
    table.foreign('author_id').references('author.id');
    table.timestamps();
  });
};

exports.down = function (knex) {};

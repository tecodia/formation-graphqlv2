/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('author').del();
  await knex('comment').del();
  await knex('price').del();
  await knex('product').del();

  await knex('product').insert([
    { id: 1, title: 'product_1' },
    { id: 2, title: 'product_2' },
    { id: 3, title: 'product_3' },
  ]);
};

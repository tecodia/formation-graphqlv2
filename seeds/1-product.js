/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comment').del();
  await knex('author').del();

  await knex('price').del();
  await knex('product').del();

  for (let i = 1; i <= 500; i++) {
    await knex('product').insert([{ id: i, title: `product_${i}` }]);
  }
};

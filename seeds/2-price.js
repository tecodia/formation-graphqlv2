/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('price').del();
  await knex('price').insert([
    { id: 1, product_id: 1, amount: 12.23 },
    { id: 2, product_id: 2, amount: 34.45 },
    { id: 3, product_id: 3, amount: 56.12 },
  ]);
};

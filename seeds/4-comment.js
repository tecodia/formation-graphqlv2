/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comment').del();
  await knex('comment').insert([
    { id: 1, product_id: 1, author_id: 1, comment: 'comment 1', review: 5 },
    { id: 2, product_id: 2, author_id: 2, comment: 'comment 2', review: 1 },
    { id: 3, product_id: 3, author_id: 3, comment: 'comment 3', review: 2 },
  ]);
};

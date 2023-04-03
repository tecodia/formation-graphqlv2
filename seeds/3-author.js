/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('author').del();
  await knex('author').insert([
    { id: 1, username: 'author 1' },
    { id: 2, username: 'author 2' },
    { id: 3, username: 'author 3' },
  ]);
};

import DataLoader from 'dataloader';

export class AuthorDataSource {
  constructor(knexConnection) {
    this.knexConnection = knexConnection;
  }

  batchGetAuthorById = new DataLoader(async (authorIds) => {
    const authors = await this.knexConnection('author').select().whereIn('id', authorIds);

    return authorIds.map((authorId) => authors.find((author) => parseInt(author.id, 10) === parseInt(authorId, 10)));
  });

  async getAuthorById(authorId) {
    return this.batchGetAuthorById.load(authorId);
  }
}

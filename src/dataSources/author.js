import DataLoader from 'dataloader';

export class AuthorDataSource {
  constructor(knexConnection, cache) {
    this.knexConnection = knexConnection;
    this.cache = cache;
  }

  batchGetAuthorById = new DataLoader(async (authorIds) => {
    const authors = await this.knexConnection('author').select().whereIn('id', authorIds);

    return authorIds.map((authorId) => authors.find((author) => parseInt(author.id, 10) === parseInt(authorId, 10)));
  });

  async getAuthorById(authorId) {
    const author = await this.cache.get(`getAuthorById-${authorId}-v2`);
    if (author) {
      return author;
    }
    const authorDataloader = await this.batchGetAuthorById.load(authorId);

    await this.cache.set(`getAuthorById-${authorId}-v2`, authorDataloader, { ttl: 10 });

    return authorDataloader;
  }
}

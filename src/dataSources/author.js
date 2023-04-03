export class AuthorDataSource {
  constructor(knexConnection) {
    this.knexConnection = knexConnection;
  }

  async getAuthorById(authorId) {
    return this.knexConnection('author').select().where({ id: authorId }).limit(1);
  }
}

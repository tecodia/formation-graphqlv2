export class CommentDataSource {
  constructor(knexConnection) {
    this.knexConnection = knexConnection;
  }

  async getCommentsByProductId(productId) {
    return this.knexConnection('comment').select().where({ product_id: productId });
  }
}

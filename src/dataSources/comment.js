import DataLoader from 'dataloader';

export class CommentDataSource {
  constructor(knexConnection) {
    this.knexConnection = knexConnection;
  }

  batchGetCommentsByProductId = new DataLoader(async (productIds) => {
    const comments = await this.knexConnection('comment').select().whereIn('product_id', productIds);

    return productIds.map((productId) =>
      comments.filter((comment) => parseInt(comment.product_id, 10) === parseInt(productId, 10))
    );
  });

  async getCommentsByProductId(productId) {
    return this.batchGetCommentsByProductId.load(productId);
  }

  async addComment(comment) {
    const [id] = await this.knexConnection('comment')
      .insert({
        author_id: comment.authorId,
        product_id: comment.productId,
        review: comment.review,
        comment: comment.comment,
      })
      .returning('id');

    return {
      ...comment,
      id,
    };
  }
}

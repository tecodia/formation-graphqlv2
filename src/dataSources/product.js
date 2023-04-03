export class ProductDataSource {
  constructor(knexConnection) {
    this.knexConnection = knexConnection;
  }

  async getProducts(first, after) {
    return this.knexConnection('product').select().limit(first).offset(after);
  }

  async getProductById(productId) {
    return this.knexConnection('product').select().where('id', productId).first();
  }
}

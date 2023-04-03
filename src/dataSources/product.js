export class ProductDataSource {
  constructor(knexConnection) {
    this.knexConnection = knexConnection;
  }

  async getProducts() {
    return this.knexConnection('product').select();
  }

  async getProductById(productId) {
    return this.knexConnection('product').select().where('id', productId).first();
  }
}

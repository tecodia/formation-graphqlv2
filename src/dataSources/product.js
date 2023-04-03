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

  async addProduct(product) {
    const id = await this.knexConnection('product')
      .insert({
        title: product.title,
      })
      .returning('id');

    return {
      ...product,
      id,
    };
  }
}

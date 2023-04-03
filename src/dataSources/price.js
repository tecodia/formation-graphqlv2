export class PriceDataSource {
  constructor(knexConnection) {
    this.knexConnection = knexConnection;
  }

  async getPriceByProductId(productId) {
    return this.knexConnection('price').select().where({ product_id: productId }).limit(1);
  }
}

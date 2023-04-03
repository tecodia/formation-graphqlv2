export class ProductDataSource {
  constructor(knexConnection) {
    this.knexConnection = knexConnection;
  }

  async getProducts() {
    return this.knexConnection('product').select();
  }
}

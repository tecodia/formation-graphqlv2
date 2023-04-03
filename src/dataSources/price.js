import DataLoader from 'dataloader';

export class PriceDataSource {
  constructor(knexConnection) {
    this.knexConnection = knexConnection;
  }

  batchGetPriceByProductId = new DataLoader(async (productIds) => {
    const prices = await this.knexConnection('price').select().whereIn('product_id', productIds);

    return productIds.map((productId) =>
      prices.find((price) => parseInt(price.product_id, 10) === parseInt(productId, 10))
    );
  });

  async getPriceByProductId(productId) {
    return this.batchGetPriceByProductId.load(productId);
  }
}

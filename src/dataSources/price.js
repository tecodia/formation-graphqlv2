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

  async addPrice(price) {
    const [id] = await this.knexConnection('price')
      .insert({
        amount: price.amount,
        product_id: price.productId[0].id,
      })
      .returning('id');
    return {
      ...price,
      id,
    };
  }
}
